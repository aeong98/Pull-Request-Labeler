import * as fs from 'fs';
import { parseConfig } from './parseConfig';
import { LabelConfig } from '../types';

describe('praseConfig test', () => {
  test('yaml파일의 base64 string을 LabelConfig[]형태로 변환해서 반환한다.', () => {
    //given
    const doc = fs.readFileSync('src/config/test-config.yml', 'base64');

    //when
    const result = parseConfig(doc as string);

    //then
    const resultLabelConfig: LabelConfig[] = [
      {
        label: 'develop',
        base: ['develop', 'develop/*'],
        head: undefined,
      },
      {
        label: 'release',
        base: ['main'],
        head: ['develop'],
      },
    ];
    expect(result).toEqual(resultLabelConfig);
  });
});
