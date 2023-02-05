const countDuration = (start, end) => {
  const interval = new Date(end - start);

  return {
    days: interval.getUTCDate() - 1,
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes()
  };
};

const constructionDuration = (interval) => {

  if (interval.hours === 0 && interval.days === 0) {
    return (`
    ${String(interval.minutes).padStart(2, '0')}M
  `);
  }

  if (interval.days === 0) {
    return (`
    ${String(interval.hours).padStart(2, '0')}H
    ${String(interval.minutes).padStart(2, '0')}M
  `);
  }

  if (interval.days !== 0) {
    return (`
    ${String(interval.days).padStart(2, '0')}D
    ${String(interval.hours).padStart(2, '0')}H
    ${String(interval.minutes).padStart(2, '0')}M
  `);
  }
};

export {
  countDuration,
  constructionDuration,
};


