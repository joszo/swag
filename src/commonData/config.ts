import * as dotenv from 'dotenv-safe';

const parsedEnv: { [key: string]: string } = dotenv.config({
  example: './.env.dist',
}).required;

export const config = {
  debugLogs: parsedEnv['DEBUG_LOGS'] === 'true',
  baseUrl: parsedEnv['BASE_URL'],
};
