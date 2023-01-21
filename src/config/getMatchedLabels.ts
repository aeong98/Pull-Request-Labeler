import { LabelConfig } from '../types';
import { isRefBranchMatchPatterns } from './utils/isRefBranchMatchPatterns';

export function getMatchedLabels(
  config: LabelConfig[],
  headRef: string,
  baseRef: string,
) {
  return config.reduce((labels: string[], entry) => {
    if (entry.head && entry.base) {
      if (
        isRefBranchMatchPatterns(headRef, entry.head) &&
        isRefBranchMatchPatterns(baseRef, entry.base)
      ) {
        labels.push(entry.label);
      }
    } else if (entry.head && isRefBranchMatchPatterns(headRef, entry.head)) {
      labels.push(entry.label);
    } else if (entry.base && isRefBranchMatchPatterns(baseRef, entry.base)) {
      labels.push(entry.label);
    }

    return labels;
  }, []);
}
