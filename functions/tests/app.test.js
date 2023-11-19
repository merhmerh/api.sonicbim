import Fastify from 'fastify';
import { routes } from '../routes/fastify.js';
import { describe, it, expect, beforeEach, afterEach, test } from 'vitest';
import testData from './test_data.js';

let app;
const { projectData, syncProjectData } = testData;

describe('Fastify app tests', () => {
	beforeEach(() => {
		app = Fastify();
		app.register(routes);
	});

	afterEach(async () => {
		await app.close();
	});

	testRoutes();
});

function testRoutes() {
	it('./ [App Ready]', async () => {
		const response = await app.inject({ method: 'GET', url: '/' });
		expect(response.statusCode).toBe(200);
	});

	it('./list_projects', async () => {
		const response = await app.inject({ method: 'GET', url: '/list_projects' });
		expect(response.statusCode).toBe(200);
		const result = await response.json();
		expect(result.length).toBeGreaterThan(1);
	});

	it('./register_project', async () => {
		const response = await app.inject({ method: 'POST', url: '/register_project', payload: projectData });
		console.log(response.statusCode);
		expect(response.statusCode).toBe(400);
		const result = await response.json();
		expect(result).toHaveProperty('error');
	});

	it('./sync_project POST', async () => {
		const response = await app.inject({ method: 'POST', url: '/sync_project', payload: syncProjectData });
		expect(response.statusCode).toBe(200);
	});

	it('./sync_project GET', async () => {
		const response = await app.inject({
			method: 'GET',
			url: `/sync_project?project_uuid=${syncProjectData.project_uuid}`,
		});
		expect(response.statusCode).toBe(200);
	});
}
