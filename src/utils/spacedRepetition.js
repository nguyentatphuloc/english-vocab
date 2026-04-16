const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const QUALITY = {
  easy: 'easy',
  good: 'good',
  hard: 'hard',
};

const addDays = (date, days) => new Date(new Date(date).getTime() + days * DAY_IN_MS).toISOString();

export const createCardSchedule = () => ({
  interval: 1,
  easeFactor: 2.5,
  repetitions: 0,
  nextReviewDate: addDays(new Date(), 1),
});

export const calculateNextReview = (card, quality) => {
  let { interval = 1, easeFactor = 2.5, repetitions = 0 } = card;

  if (quality === QUALITY.hard) {
    interval = 1;
    repetitions = 0;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (quality === QUALITY.good) {
    repetitions += 1;
    const predefined = [1, 3, 7, 14];
    interval = repetitions <= predefined.length ? predefined[repetitions - 1] : Math.round(interval * easeFactor);
    easeFactor = Math.max(1.3, easeFactor + 0.05);
  } else {
    repetitions += 1;
    interval = Math.max(7, interval + 7);
    easeFactor = Math.max(1.3, easeFactor + 0.15);
  }

  return {
    interval,
    easeFactor: Number(easeFactor.toFixed(2)),
    repetitions,
    nextReviewDate: addDays(new Date(), interval),
  };
};

export const getReviewStatus = (nextReviewDate) => {
  const now = new Date();
  const reviewDate = new Date(nextReviewDate);
  const diffDays = Math.ceil((reviewDate - now) / DAY_IN_MS);

  if (diffDays <= 0) {
    return { label: 'Ôn ngay', color: 'text-red-600', bg: 'bg-red-100' };
  }

  if (diffDays <= 3) {
    return { label: 'Sắp tới hạn', color: 'text-orange-600', bg: 'bg-orange-100' };
  }

  return { label: 'Lên lịch', color: 'text-green-600', bg: 'bg-green-100' };
};

export const isDueToday = (nextReviewDate) => new Date(nextReviewDate) <= new Date();
