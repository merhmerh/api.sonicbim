import Fastify from 'fastify';
import { routes } from './routes/fastify.js';

const app = Fastify();

app.get('/', (req, res) => {
	res.send({ SONICBIM: 'Ready' });
});

app.register(routes);

app.listen({ port: 3000 }, (err, address) => {
	if (err) throw err;
	console.log(address);
});
