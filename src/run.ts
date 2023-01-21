import * as core from '@actions/core';
import * as github from '@actions/github';
import { getConfigFile } from './config/getConfigFile';
import { getMatchedLabels } from './config/getMatchedLabels';
import { parseConfig } from './config/parseConfig';

export const context = github.context;

const CONFIG_FILENAME = 'pr-branch-labeler.yml';
export async function run() {
  const repoToken: string = core.getInput('repo-token', { required: true });

  if (context && context.payload.pull_request) {
    const octokit = github.getOctokit(repoToken);
    const config = await getConfigFile(octokit, CONFIG_FILENAME, context);
    if (!config) {
      throw new Error('get config file failed');
    }

    const headRef = context.payload.pull_request.head.ref;
    const baseRef = context.payload.pull_request.base.ref;
    const parsedConfig = parseConfig(config);
    const labelsToAdd = getMatchedLabels(parsedConfig, headRef, baseRef);

    if (labelsToAdd.length > 0) {
      await octokit.rest.issues.addLabels({
        issue_number: context.payload.pull_request.number,
        labels: [...labelsToAdd],
        ...context.repo,
      });
    }
  }
}
