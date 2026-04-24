// ================================
//  SLA Calculator - Script
// ================================
 
// --- SLA Rules ---
// Priority:     60 minutes
// Uncontrolled: 60 minutes
// Controlled:   120 minutes
 
const SLA_RULES = {
  priority: 60,
  uncontrolled: 60,
  controlled: 120,
};
 
// --- DOM References ---
const leakTypeSelect   = document.getElementById('leak-type');
const callDateInput    = document.getElementById('call-date');
const callTimeInput    = document.getElementById('call-time');
const arrivalDateInput = document.getElementById('arrival-date');
const arrivalTimeInput = document.getElementById('arrival-time');
const resultsPanel     = document.getElementById('results-panel');
const resultStatus     = document.getElementById('result-status');
const timeTakenSpan    = document.getElementById('time-taken');
const gsmrTargetSpan   = document.getElementById('gsmr-target');
const clearBtn         = document.getElementById('clear-btn');
 
// --- Ticket #10: Leak Type Dropdown ---
 
/**
 * getLeakType
 * Returns the currently selected leak type value from the dropdown.
 * Returns null if no selection has been made.
 */
function getLeakType() {
  const value = leakTypeSelect.value;
  return value !== '' ? value : null;
}
 
/**
 * getSLALimit
 * Takes a leak type string and returns the SLA time limit in minutes.
 * Returns null if the leak type is not recognised.
 * @param {string} leakType - 'priority', 'uncontrolled', or 'controlled'
 */
function getSLALimit(leakType) {
  return SLA_RULES[leakType] ?? null;
}
 
// Event listener - fires whenever the dropdown selection changes
leakTypeSelect.addEventListener('change', function () {
  const selected = getLeakType();
  const limit = getSLALimit(selected);
  console.log(`Leak type selected: ${selected}, SLA limit: ${limit} minutes`);
});
 
// --- Ticket #11: Date & Time Pickers ---

/**
 * getCallDateTime
 * Reads the call received date and time inputs and returns a Date object.
 * Returns null if either field is empty.
 */
function getCallDateTime() {
  const date = callDateInput.value;
  const time = callTimeInput.value;
  if (!date || !time) return null;
  return new Date(`${date}T${time}`);
}
 
/**
 * getArrivalDateTime
 * Reads the arrival date and time inputs and returns a Date object.
 * Returns null if either field is empty.
 */
function getArrivalDateTime() {
  const date = arrivalDateInput.value;
  const time = arrivalTimeInput.value;
  if (!date || !time) return null;
  return new Date(`${date}T${time}`);
}
 
/**
 * validateDateTimes
 * Checks that all inputs are filled and that arrival is not before call received.
 * Returns an error message string if invalid, or null if valid.
 * @param {Date} callDateTime
 * @param {Date} arrivalDateTime
 */
function validateDateTimes(callDateTime, arrivalDateTime) {
  if (!callDateTime || !arrivalDateTime) {
    return 'Please fill in all date and time fields.';
  }
  if (arrivalDateTime < callDateTime) {
    return 'Arrival time cannot be earlier than the call received time.';
  }
  if (arrivalDateTime.getTime() === callDateTime.getTime()) {
    return 'Arrival time cannot be the same as the call received time.';
  }
  return null;
}
 
/**
 * showError
 * Displays an error message in the results panel.
 * @param {string} message
 */
function showError(message) {
  resultsPanel.hidden = false;
  resultStatus.className = 'result-status error';
  resultStatus.textContent = message;
  timeTakenSpan.textContent = '--:--';
  gsmrTargetSpan.textContent = '--/--/---- --:--';
}
 
/**
 * clearError
 * Hides the results panel and resets all result fields.
 */
function clearError() {
  resultsPanel.hidden = true;
  resultStatus.className = 'result-status';
  resultStatus.textContent = '';
  timeTakenSpan.textContent = '--:--';
  gsmrTargetSpan.textContent = '--/--/---- --:--';
}
 
/**
 * checkAndCalculate
 * Central function called whenever any input changes.
 * Validates inputs and triggers calculation if all inputs are valid.
 */
function checkAndCalculate() {
  const callDateTime    = getCallDateTime();
  const arrivalDateTime = getArrivalDateTime();
  const leakType        = getLeakType();
 
  // If not all fields filled yet, hide results and wait
  if (!callDateTime || !arrivalDateTime || !leakType) {
    clearError();
    return;
  }
 
  // Validate date/time logic
  const error = validateDateTimes(callDateTime, arrivalDateTime);
  if (error) {
    showError(error);
    return;
  }
 
  // All valid — trigger calculation (ticket #12)
  calculateSLA(callDateTime, arrivalDateTime, leakType);
}
 
// Add event listeners to all date and time inputs
callDateInput.addEventListener('change', checkAndCalculate);
callTimeInput.addEventListener('change', checkAndCalculate);
arrivalDateInput.addEventListener('change', checkAndCalculate);
arrivalTimeInput.addEventListener('change', checkAndCalculate);
 
// --- Ticket #12: SLA Calculation Logic ---
 
// --- Ticket #13: Display Results Dynamically ---
 
// --- Ticket #14: Clear Form ---