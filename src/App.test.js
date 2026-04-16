import { calculateNextReview } from './utils/spacedRepetition';

describe('spaced repetition behavior', () => {
  it('sets one-day interval for hard answers', () => {
    const result = calculateNextReview({ interval: 7, easeFactor: 2.5, repetitions: 4 }, 'hard');

    expect(result.interval).toBe(1);
    expect(result.repetitions).toBe(0);
    expect(result.easeFactor).toBeLessThan(2.5);
  });

  it('advances good answers through sequence', () => {
    const result = calculateNextReview({ interval: 1, easeFactor: 2.5, repetitions: 1 }, 'good');

    expect(result.interval).toBe(3);
    expect(result.repetitions).toBe(2);
  });

  it('adds seven days for easy answers', () => {
    const result = calculateNextReview({ interval: 3, easeFactor: 2.5, repetitions: 2 }, 'easy');

    expect(result.interval).toBe(10);
    expect(result.repetitions).toBe(3);
  });
});
