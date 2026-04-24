// ================================
//  SLA Calculator - Unit Tests
//  Ticket #15 - Write unit tests
// ================================
 
const {
  getSLALimit,
  getTimeDifferenceInMinutes,
  formatMinutesToHHMM,
  formatDateToDDMMYYYY,
  validateDateTimes,
} = require('./sla');
 
// ================================
//  getSLALimit
// ================================
 
describe('getSLALimit', () => {
 
  test('returns 60 minutes for priority', () => {
    expect(getSLALimit('priority')).toBe(60);
  });
 
  test('returns 60 minutes for uncontrolled', () => {
    expect(getSLALimit('uncontrolled')).toBe(60);
  });
 
  test('returns 120 minutes for controlled', () => {
    expect(getSLALimit('controlled')).toBe(120);
  });
 
  test('returns null for an unrecognised leak type', () => {
    expect(getSLALimit('unknown')).toBeNull();
  });
 
});
 
// ================================
//  getTimeDifferenceInMinutes
// ================================
 
describe('getTimeDifferenceInMinutes', () => {
 
  test('calculates 60 minutes difference correctly', () => {
    const start = new Date('2025-01-01T09:00');
    const end   = new Date('2025-01-01T10:00');
    expect(getTimeDifferenceInMinutes(start, end)).toBe(60);
  });
 
  test('calculates 120 minutes difference correctly', () => {
    const start = new Date('2025-01-01T09:00');
    const end   = new Date('2025-01-01T11:00');
    expect(getTimeDifferenceInMinutes(start, end)).toBe(120);
  });
 
  test('calculates 75 minutes difference correctly', () => {
    const start = new Date('2025-01-01T09:00');
    const end   = new Date('2025-01-01T10:15');
    expect(getTimeDifferenceInMinutes(start, end)).toBe(75);
  });
 
  test('calculates difference spanning midnight correctly', () => {
    const start = new Date('2025-01-01T23:00');
    const end   = new Date('2025-01-02T00:30');
    expect(getTimeDifferenceInMinutes(start, end)).toBe(90);
  });
 
});
 
// ================================
//  formatMinutesToHHMM
// ================================
 
describe('formatMinutesToHHMM', () => {
 
  test('formats 60 minutes as 01:00', () => {
    expect(formatMinutesToHHMM(60)).toBe('01:00');
  });
 
  test('formats 75 minutes as 01:15', () => {
    expect(formatMinutesToHHMM(75)).toBe('01:15');
  });
 
  test('formats 120 minutes as 02:00', () => {
    expect(formatMinutesToHHMM(120)).toBe('02:00');
  });
 
  test('formats 5 minutes as 00:05', () => {
    expect(formatMinutesToHHMM(5)).toBe('00:05');
  });
 
  test('formats 0 minutes as 00:00', () => {
    expect(formatMinutesToHHMM(0)).toBe('00:00');
  });
 
});
 
// ================================
//  formatDateToDDMMYYYY
// ================================
 
describe('formatDateToDDMMYYYY', () => {
 
  test('formats a date correctly to dd/mm/yyyy hh:mm', () => {
    const date = new Date('2025-04-01T14:30');
    expect(formatDateToDDMMYYYY(date)).toBe('01/04/2025 14:30');
  });
 
  test('pads single digit day and month with leading zero', () => {
    const date = new Date('2025-01-05T09:05');
    expect(formatDateToDDMMYYYY(date)).toBe('05/01/2025 09:05');
  });
 
});
 
// ================================
//  validateDateTimes
// ================================
 
describe('validateDateTimes', () => {
 
  test('returns null when both dates are valid and arrival is after call', () => {
    const call    = new Date('2025-01-01T09:00');
    const arrival = new Date('2025-01-01T10:00');
    expect(validateDateTimes(call, arrival)).toBeNull();
  });
 
  test('returns error when arrival is before call received', () => {
    const call    = new Date('2025-01-01T10:00');
    const arrival = new Date('2025-01-01T09:00');
    expect(validateDateTimes(call, arrival)).toBe(
      'Arrival time cannot be earlier than the call received time.'
    );
  });
 
  test('returns error when arrival is the same as call received', () => {
    const call    = new Date('2025-01-01T09:00');
    const arrival = new Date('2025-01-01T09:00');
    expect(validateDateTimes(call, arrival)).toBe(
      'Arrival time cannot be the same as the call received time.'
    );
  });
 
  test('returns error when call datetime is null', () => {
    expect(validateDateTimes(null, new Date())).toBe(
      'Please fill in all date and time fields.'
    );
  });
 
  test('returns error when arrival datetime is null', () => {
    expect(validateDateTimes(new Date(), null)).toBe(
      'Please fill in all date and time fields.'
    );
  });
 
});
 
// ================================
//  SLA Compliance Tests
// ================================
 
describe('SLA compliance via getSLALimit and getTimeDifferenceInMinutes', () => {
 
  test('priority leak within SLA — 45 minutes', () => {
    const start       = new Date('2025-01-01T09:00');
    const end         = new Date('2025-01-01T09:45');
    const timeTaken   = getTimeDifferenceInMinutes(start, end);
    const slaLimit    = getSLALimit('priority');
    expect(timeTaken <= slaLimit).toBe(true);
  });
 
  test('priority leak outside SLA — 90 minutes', () => {
    const start       = new Date('2025-01-01T09:00');
    const end         = new Date('2025-01-01T10:30');
    const timeTaken   = getTimeDifferenceInMinutes(start, end);
    const slaLimit    = getSLALimit('priority');
    expect(timeTaken <= slaLimit).toBe(false);
  });
 
  test('controlled leak within SLA — exactly 120 minutes', () => {
    const start       = new Date('2025-01-01T09:00');
    const end         = new Date('2025-01-01T11:00');
    const timeTaken   = getTimeDifferenceInMinutes(start, end);
    const slaLimit    = getSLALimit('controlled');
    expect(timeTaken <= slaLimit).toBe(true);
  });
 
  test('controlled leak outside SLA — 121 minutes', () => {
    const start       = new Date('2025-01-01T09:00');
    const end         = new Date('2025-01-01T11:01');
    const timeTaken   = getTimeDifferenceInMinutes(start, end);
    const slaLimit    = getSLALimit('controlled');
    expect(timeTaken <= slaLimit).toBe(false);
  });
 
});

// ================================
//  Smoke Tests
// ================================

describe('Smoke Tests — core happy path', () => {

  test('full flow: priority leak, 45 mins — within SLA', () => {
    const call    = new Date('2025-01-01T09:00');
    const arrival = new Date('2025-01-01T09:45');
    const error   = validateDateTimes(call, arrival);
    const minutes = getTimeDifferenceInMinutes(call, arrival);
    const limit   = getSLALimit('priority');
    expect(error).toBeNull();
    expect(minutes <= limit).toBe(true);
    expect(formatMinutesToHHMM(minutes)).toBe('00:45');
  });

  test('full flow: uncontrolled leak, 90 mins — outside SLA', () => {
    const call    = new Date('2025-01-01T09:00');
    const arrival = new Date('2025-01-01T10:30');
    const error   = validateDateTimes(call, arrival);
    const minutes = getTimeDifferenceInMinutes(call, arrival);
    const limit   = getSLALimit('uncontrolled');
    expect(error).toBeNull();
    expect(minutes <= limit).toBe(false);
    expect(formatMinutesToHHMM(minutes)).toBe('01:30');
  });

  test('full flow: controlled leak, exactly 120 mins — within SLA', () => {
    const call    = new Date('2025-01-01T09:00');
    const arrival = new Date('2025-01-01T11:00');
    const error   = validateDateTimes(call, arrival);
    const minutes = getTimeDifferenceInMinutes(call, arrival);
    const limit   = getSLALimit('controlled');
    expect(error).toBeNull();
    expect(minutes <= limit).toBe(true);
    expect(formatMinutesToHHMM(minutes)).toBe('02:00');
  });

});