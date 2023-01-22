import * as core from '@actions/core';
import * as github from '@actions/github';
import { getConfigFile } from './config/getConfigFile';
import { getMatchedLabels } from './config/getMatchedLabels';
import { parseConfig } from './config/parseConfig';
import { GitHub } from '@actions/github/lib/utils';
import { LabelConfig } from './types';

export const context = github.context;

export async function run() {
  const { repoToken, configFilePathname } = getInputs();
  const octokit = getOctoKit(repoToken);

  const config = await getConfig(octokit, configFilePathname);
  const labelsToAdd = getLabelsToAdd(config);

  if (labelsToAdd.length > 0) {
    await addLabelsToPR(octokit, labelsToAdd);
  }
}

const getInputs = () => {
  const repoToken: string = core.getInput('repo-token', { required: true });
  const configFilePathName = core.getInput('config-pathname', {
    required: true,
  });
  return {
    repoToken,
    configFilePathname: configFilePathName,
  };
};

const getOctoKit = (token: string) => {
  return github.getOctokit(token);
};

const getConfig = async (
  octokit: InstanceType<typeof GitHub>,
  configFilePathname: string,
) => {
  const config = await getConfigFile(octokit, configFilePathname, context);

  if (!config) {
    throw new Error('get config file failed');
  }
  return parseConfig(config);
};

const getLabelsToAdd = (config: LabelConfig[]) => {
  const headRef = context.payload.pull_request?.head.ref;
  const baseRef = context.payload.pull_request?.base.ref;
  return getMatchedLabels(config, headRef, baseRef);
};

const addLabelsToPR = async (
  octokit: InstanceType<typeof GitHub>,
  labels: string[],
) => {
  if (!context.payload.pull_request) {
    return;
  }
  await octokit.rest.issues.addLabels({
    issue_number: context.payload.pull_request.number,
    labels: labels,
    ...context.repo,
  });
};
