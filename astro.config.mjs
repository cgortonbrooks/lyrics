// @ts-check
import { defineConfig } from 'astro/config';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const defaultBase = isGitHubActions && repositoryName && !repositoryName.endsWith('.github.io')
	? `/${repositoryName}`
	: '/';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	base: process.env.DEPLOY_BASE ?? defaultBase,
});
