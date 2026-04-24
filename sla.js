const SLA_RULES = {
  priority: 60,
  uncontrolled: 60,
  controlled: 120,
};

function getSLALimit(leakType) {
  return SLA_RULES[leakType] ?? null;
}

function getTimeDifferenceInMinutes(startDateTime, endDateTime) {
  const diffMs = endDateTime - startDateTime;
  return Math.round(diffMs / 1000 / 60);
}

function formatMinutesToHHMM(minutes) {
  const hrs  = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

function formatDateToDDMMYYYY(date) {
  const dd   = String(date.getDate()).padStart(2, '0');
  const mm   = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh   = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy} ${hh}:${mins}`;
}

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



module.exports = {
  getSLALimit,
  getTimeDifferenceInMinutes,
  formatMinutesToHHMM,
  formatDateToDDMMYYYY,
  validateDateTimes,
};