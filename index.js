import Fastify from 'fastify'
import { registerProject } from './routes/register.js'
import { syncProject } from './routes/syncProject.js'
import { supabase } from './routes/lib/helper.js'

const app = Fastify()
// { logger: true }

app.get('/', (req, res) => {
	res.send({ hello: 'world' })
})

app.register(registerProject, { prefix: '/api' })
app.register(syncProject, { prefix: '/api' })

app.listen({ port: 3000 }, (err, address) => {
	if (err) throw err
	console.log(address)
})
