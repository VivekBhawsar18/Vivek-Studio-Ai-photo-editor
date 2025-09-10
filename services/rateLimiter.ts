
const LIMIT = 3; // Reduced to be more conservative with the free API tier
const DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const COUNT_KEY = 'PHOTO_EDITOR_USAGE_COUNT';
const TIMESTAMP_KEY = 'PHOTO_EDITOR_RESET_TIMESTAMP';

interface RateLimitStatus {
  isLimited: boolean;
  count: number;
  resetsAt: Date | null;
}

/**
 * Returns the current limit.
 */
export const getLimit = (): number => LIMIT;

/**
 * Checks the user's current rate limit status from localStorage.
 * Resets the limit if the 24-hour period has passed.
 */
export const checkRateLimit = (): RateLimitStatus => {
  const countStr = localStorage.getItem(COUNT_KEY);
  const timestampStr = localStorage.getItem(TIMESTAMP_KEY);

  if (!countStr || !timestampStr) {
    return { isLimited: false, count: 0, resetsAt: null };
  }

  const count = parseInt(countStr, 10);
  const resetTimestamp = parseInt(timestampStr, 10);

  if (Date.now() > resetTimestamp) {
    // Time has expired, reset the limit
    localStorage.removeItem(COUNT_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
    return { isLimited: false, count: 0, resetsAt: null };
  }

  return {
    isLimited: count >= LIMIT,
    count: count,
    resetsAt: new Date(resetTimestamp),
  };
};

/**
 * Increments the user's usage count in localStorage.
 * Sets the initial reset timestamp if it's the first use in a cycle.
 */
export const incrementUsage = (): { isLimited: boolean; count: number } => {
  // We get the current count *before* incrementing
  const { count } = checkRateLimit();
  const newCount = count + 1;

  if (count === 0) {
    // This is the first usage in a new cycle, set the reset time
    const newResetTimestamp = Date.now() + DURATION;
    localStorage.setItem(TIMESTAMP_KEY, newResetTimestamp.toString());
  }

  localStorage.setItem(COUNT_KEY, newCount.toString());

  return {
    isLimited: newCount >= LIMIT,
    count: newCount,
  };
};
