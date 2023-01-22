import { Context } from '@actions/github/lib/context';
import { GitHub } from '@actions/github/lib/utils';

type ConfigFile = {
  owner: string;
  repo: string;
  path: string;
  ref: string;
};

export async function getConfigFile(
  github: InstanceType<typeof GitHub>,
  fileName: string,
  context: Context,
) {
  try {
    const configFile: ConfigFile = {
      owner: context.repo.owner,
      repo: context.repo.repo,
      path: fileName,
      ref: context.payload.pull_request?.head.sha,
    };
    const response = await github.rest.repos.getContent(configFile);

    if (Array.isArray(response.data)) {
      throw new Error(`${fileName} is not file`);
    }
    if (!response.data) {
      throw new Error(`${fileName} is empty`);
    }

    if ('content' in response.data) {
      return response.data.content;
    }
  } catch (error: InstanceType<Error>) {
    if (error.status === 404) {
      throw new Error('404 error happened');
    }
    throw error;
  }
}
