import { v4 as uuid } from 'uuid'
import { calcChecksum, sendError, supabase } from './lib/helper.js'

export function syncProject(fastify, opts, done) {
	fastify.post('/sync_project', async (req, res) => {
		const { project_uuid, data: model_data } = req.body

		if (!project_uuid) return sendError(res, 'Missing project_uuid')
		if (!model_data) return sendError(res, 'Missing data')

		//check if project exist
		const { data: projectExist } = await supabase
			.from('projects')
			.select()
			.eq('project_uuid', project_uuid)
			.limit(1)
			.single()

		if (!projectExist) return sendError(res, 'project_uuid does not exist')

		// upsert
		const { data, error } = await supabase.from('project_model_data').upsert({
			project_uuid,
			model_data,
		})

		if (error) return sendError(res, error)

		res.send({
			status: 'success',
			message: 'Project model_data uploaded to database',
		})
	})

	fastify.get('/sync_project', async (req, res) => {
		const { project_uuid } = req.query

		if (!project_uuid) return sendError(res, 'Require project_uuid')

		const { data, error } = await supabase
			.from('project_model_data')
			.select()
			.eq('project_uuid', project_uuid)
			.limit(1)
			.single()

		if (error) return sendError(res, error)

		res.send(data)
	})

	done()
}
