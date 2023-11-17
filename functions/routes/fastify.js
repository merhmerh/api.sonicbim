import { registerProject } from './register.js';
import { syncProject } from './syncProject.js';
import { listProjects } from './listProjects.js';

export function routes(fastify, opts, done) {
	fastify.register(registerProject);
	fastify.register(syncProject);
	fastify.register(listProjects);

	done();
}
