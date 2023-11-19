import { supabase } from './lib/helper.js';

export function listProjects(fastify, opts, done) {
	fastify.get('/list_projects', async (req, res) => {
		const { data } = await supabase.from('projects').select();

		res.code(200).send(data);
	});

	done();
}
