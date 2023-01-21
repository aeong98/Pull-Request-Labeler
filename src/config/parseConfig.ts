import { LabelConfig } from '../types';
import yaml from 'js-yaml';

type Option = {
  head?: string | string[];
  base?: string | string[];
};

export function parseConfig(contentBase64: string): LabelConfig[] {
  const content = yaml.load(Buffer.from(contentBase64, 'base64').toString());
  if (typeof content !== 'object' || !content) {
    return [];
  }
  return Object.entries(content).reduce(
    (entries: LabelConfig[], [label, option]: [string, Option]) => {
      if (!option.head && !option.base) {
        throw new Error('config.yml has invalid structure.');
      }
      const headPatterns = option.head
        ? getPatternArray(option.head)
        : undefined;
      const basePatterns = option.base
        ? getPatternArray(option.base)
        : undefined;

      entries.push({ label: label, head: headPatterns, base: basePatterns });
      return entries;
    },
    [],
  );
}

const getPatternArray = (pattern: string | string[]) => {
  if (Array.isArray(pattern)) {
    return pattern;
  } else {
    return [pattern];
  }
};
