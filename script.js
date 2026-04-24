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

/**
 * getTimeDifferenceInMinutes
 * Calculates the difference between two Date objects in minutes.
 * @param {Date} startDateTime
 * @param {Date} endDateTime
 * @returns {number} difference in whole minutes
 */
function getTimeDifferenceInMinutes(startDateTime, endDateTime) {
  const diffMs = endDateTime - startDateTime;
  return Math.floor(diffMs / 1000 / 60);
}
 
/**
 * formatMinutesToHHMM
 * Converts a number of minutes into a hh:mm string.
 * e.g. 75 minutes → "01:15"
 * @param {number} minutes
 * @returns {string}
 */
function formatMinutesToHHMM(minutes) {
  const hrs  = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
 
/**
 * formatDateToDDMMYYYY
 * Formats a Date object to dd/mm/yyyy hh:mm string.
 * e.g. 2025-04-01T14:30 → "01/04/2025 14:30"
 * @param {Date} date
 * @returns {string}
 */
function formatDateToDDMMYYYY(date) {
  const dd   = String(date.getDate()).padStart(2, '0');
  const mm   = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh   = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hh}:${mins}`;
}
 
/**
 * calculateSLA
 * Core SLA calculation function.
 * Takes call received time, arrival time and leak type,
 * calculates the GSMR deadline, time taken, and whether within SLA.
 * Passes results to displayResults.
 * @param {Date}   callDateTime
 * @param {Date}   arrivalDateTime
 * @param {string} leakType
 */
function calculateSLA(callDateTime, arrivalDateTime, leakType) {
  const slaLimitMinutes  = getSLALimit(leakType);
  const timeTakenMinutes = getTimeDifferenceInMinutes(callDateTime, arrivalDateTime);
  const withinSLA        = timeTakenMinutes <= slaLimitMinutes;
 
  // Calculate the GSMR target deadline
  const gsmrDeadline = new Date(callDateTime.getTime() + slaLimitMinutes * 60 * 1000);
 
  const results = {
    withinSLA,
    timeTaken:    formatMinutesToHHMM(timeTakenMinutes),
    gsmrDeadline: formatDateToDDMMYYYY(gsmrDeadline),
  };
 
  console.log('SLA Results:', results);
 
  // Pass to display function (ticket #13)
  displayResults(results);
}
 
// --- Ticket #13: Display Results Dynamically ---

/**
 * displayResults
 * Takes the results object from calculateSLA and updates the DOM
 * to show the compliance status, time taken, and GSMR deadline.
 * @param {object} results - { withinSLA, timeTaken, gsmrDeadline }
 */
function displayResults(results) {
  // Show the results panel
  resultsPanel.hidden = false;
 
  // Set compliance status
  if (results.withinSLA) {
    resultStatus.className   = 'result-status within';
    resultStatus.textContent = 'Within SLA';
  } else {
    resultStatus.className   = 'result-status outside';
    resultStatus.textContent = 'Outside SLA';
  }
 
  // Update time taken and GSMR deadline
  timeTakenSpan.textContent  = results.timeTaken;
  gsmrTargetSpan.textContent = results.gsmrDeadline;
}
 
// --- Ticket #14: Clear Form ---