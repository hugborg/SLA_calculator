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
 
// --- Ticket #12: SLA Calculation Logic ---
 
// --- Ticket #13: Display Results Dynamically ---
 
// --- Ticket #14: Clear Form ---