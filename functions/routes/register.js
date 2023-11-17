import { v4 as uuid } from 'uuid'
import { calcChecksum, sendError, supabase } from './lib/helper.js'

export function registerProject(fastify, opts, done) {
	fastify.post('/register_project', async (req, res) => {
		//check if body contain information
		const { project_name, project_address, project_number } = req.body

		if (!project_name || !project_address || !project_number) {
			return sendError(res, 'Missing Information. Requires project_name, project_address and project_number')
		}

		const project_uuid = uuid()
		const checksum = calcChecksum(`${project_name}${project_number}${project_address}`)

		//check if exists
		const { data } = await supabase.from('projects').select().eq('checksum', checksum).limit(1).single()

		if (data) {
			return sendError(res, 'Project already exist', { data })
		}

		//insert to database
		await supabase.from('projects').insert({
			project_uuid,
			project_name,
			project_number,
			project_address,
			checksum,
		})

		res.code(200).send({
			status: 'success',
			message: 'Project registered',
			project_uuid: project_uuid,
		})
	})

	done()
}
