import * as core from '@actions/core';
import { run } from './run';

try {
  run();
} catch (error: any) {
  core.error(`ERROR! ${JSON.stringify(error)}`);
  core.setFailed(error.message);
  throw error;
}
