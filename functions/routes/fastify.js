import { registerProject } from './register.js';
import { syncProject } from './syncProject.js';
import { listProjects } from './listProjects.js';
import allRoutes from '@fastify/routes';

export function routes(fastify, opts, done) {
	fastify.register(allRoutes);

	fastify.get('/', (req, res) => {
		const listRoutes = [];
		for (const [key, value] of fastify.routes) {
			for (const item of value) {
				if (item.method == 'HEAD') continue;

				listRoutes.push(`${[item.method]}: ${item.url}`);
			}
		}

		res.send({ SONICBIM: 'Ready', version: '0.0.2', routes: listRoutes });
	});

	fastify.register(registerProject);
	fastify.register(syncProject);
	fastify.register(listProjects);

	done();
}
