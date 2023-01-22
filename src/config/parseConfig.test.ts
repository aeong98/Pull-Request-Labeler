import * as fs from 'fs';
import { parseConfig } from './parseConfig';

describe('praseConfig test', () => {
  test('yaml파일의 base64 string을 LabelConfig[]형태로 변환해서 반환한다.', () => {
    //given
    const doc = fs.readFileSync('src/config/test-config.yml', 'base64');

    //when
    const result = parseConfig(doc as string);

    //then
    expect(result).toEqual([
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
    ]);
  });
});
