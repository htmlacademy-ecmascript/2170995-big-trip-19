const countDuration = (start, end) => {
  const interval = new Date(end - start);

  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes()
  };
};

const constructionDuration = (interval) => {
  const duration = [];
  if (interval.days !== 0) {
    duration[0] = String(interval.days).padStart(2, '0');
    duration[0] += 'D';
  }
  if (interval.hours !== 0) {
    duration[1] = String(interval.hours).padStart(2, '0');
    duration[1] += 'H';
  }
  if (interval.minutes !== 0) {
    duration[2] = String(interval.minutes).padStart(2, '0');
    duration[2] += 'M';
  }

  return duration.join('');
};

export {
  countDuration,
  constructionDuration,
};
