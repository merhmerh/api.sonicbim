import Fastify from 'fastify';
import { routes } from './routes/fastify.js';

const app = Fastify();

app.register(routes);

app.listen({ port: 3000 }, (err, address) => {
	if (err) throw err;
	console.log('dev:', address);
});

export default app;
