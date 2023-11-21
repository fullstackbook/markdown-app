import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = {
  POSTGRES_URL: process.env.POSTGRES_URL,
};

export default config;
