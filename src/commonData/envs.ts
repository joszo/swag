import * as dotenv from 'dotenv-safe';

const parsedEnv: { [key: string]: string } = dotenv.config({
  example: './.env.dist',
}).required;

export const config = {
  debugLogs: parsedEnv['DEBUG_LOGS'] === 'true',
  baseUrl: parsedEnv['BASE_URL'],
};

export const users = {
  userPassword: parsedEnv['USER_PASSWORD'],
  standardUser: parsedEnv['STANDARD_USER'],
  lockedOutUser: parsedEnv['LOCKED_OUT_USER'],
  problemUser: parsedEnv['PROBLEM_USER'],
  performanceGlitchUser: parsedEnv['PERFORMANCE_GLITCH_USER'],
};
