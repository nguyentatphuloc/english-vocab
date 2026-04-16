const DAY_MS = 24 * 60 * 60 * 1000;

export const QUALITY = {
  EASY: 'easy',
  GOOD: 'good',
  HARD: 'hard',
};

const addDays = (date, days) => new Date(date.getTime() + days * DAY_MS);

const computeGoodInterval = (repetitions, previousInterval) => {
  if (repetitions <= 1) return 1;
  if (repetitions === 2) return 3;
  if (repetitions === 3) return 7;
  if (repetitions === 4) return 14;
  return Math.max(14, Math.round(previousInterval * 2));
};

export const calculateReviewUpdate = (card, quality) => {
  const now = new Date();
  let repetitions = card.repetitions || 0;
  let interval = card.interval || 0;
  let easeFactor = card.easeFactor || 2.5;

  if (quality === QUALITY.HARD) {
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else if (quality === QUALITY.GOOD) {
    repetitions += 1;
    interval = computeGoodInterval(repetitions, interval || 1);
    easeFactor = Math.max(1.3, easeFactor + 0.05);
  } else {
    repetitions += 1;
    interval = Math.max(7, interval + 7);
    easeFactor = Math.max(1.3, easeFactor + 0.15);
  }

  return {
    interval,
    repetitions,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate: addDays(now, interval).toISOString(),
    lastReviewedAt: now.toISOString(),
    reviewEntry: {
      date: now.toISOString(),
      quality,
      interval,
      easeFactor: Number(easeFactor.toFixed(2)),
    },
  };
};

export const isDueToday = (isoDate) => new Date(isoDate) <= new Date();

export const getDaysUntilReview = (isoDate) => {
  const now = new Date();
  const target = new Date(isoDate);
  const diff = target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  return Math.ceil(diff / DAY_MS);
};
