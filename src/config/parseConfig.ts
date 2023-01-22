import { LabelConfig } from '../types';
import yaml from 'js-yaml';

type Option = {
  head?: string | string[];
  base?: string | string[];
};

export function parseConfig(contentBase64: string): LabelConfig[] {
  const content = decodeYamlBase64toObject(contentBase64);
  if (!content || typeof content !== 'object') {
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

const decodeYamlBase64toObject = (base64: string) => {
  return yaml.load(Buffer.from(base64, 'base64').toString());
};

const getPatternArray = (pattern: string | string[]) => {
  if (Array.isArray(pattern)) {
    return pattern;
  } else {
    return [pattern];
  }
};
