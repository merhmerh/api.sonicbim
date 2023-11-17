import { v4 as uuid } from 'uuid'
import { calcChecksum, sendError, supabase } from './lib/helper.js'

export function listProjects(fastify, opts, done) {
	fastify.get('/list_projects', async (req, res) => {
		console.log('hello?')
		//check if body contain information
		const { data } = await supabase.from('projects').select()

		res.code(200).send(data)
	})

	done()
}
