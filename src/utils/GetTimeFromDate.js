function GetTimeFromDate(date, { timeZone = 'UTC', use24Hour = false } = {}) {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      throw new Error('Invalid date provided');
    }
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !use24Hour,
      timeZone,
    });
    return formatter.format(dateObj);
  } catch (error) {
    console.error('Error in getTimeFromDate:', error.message);
    return 'Invalid time';
  }
}

export default GetTimeFromDate;
