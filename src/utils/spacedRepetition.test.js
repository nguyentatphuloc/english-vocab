import { calculateReviewUpdate, QUALITY } from './spacedRepetition';

describe('calculateReviewUpdate', () => {
  const baseCard = {
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
  };

  it('sets hard quality to one-day reset', () => {
    const updated = calculateReviewUpdate(baseCard, QUALITY.HARD);
    expect(updated.interval).toBe(1);
    expect(updated.repetitions).toBe(0);
  });

  it('advances good quality in sequence', () => {
    const first = calculateReviewUpdate(baseCard, QUALITY.GOOD);
    const second = calculateReviewUpdate({ ...baseCard, repetitions: 1, interval: first.interval }, QUALITY.GOOD);
    expect(first.interval).toBe(1);
    expect(second.interval).toBe(3);
  });

  it('ensures easy quality has at least seven-day interval', () => {
    const updated = calculateReviewUpdate(baseCard, QUALITY.EASY);
    expect(updated.interval).toBeGreaterThanOrEqual(7);
  });
});
