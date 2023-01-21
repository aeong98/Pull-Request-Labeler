import { isMatch } from 'matcher';

export function isRefBranchMatchPatterns(
  ref: string,
  patterns: string[],
): boolean {
  return patterns.some((pattern) => isMatch(ref, pattern));
}
