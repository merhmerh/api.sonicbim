import { onRequest } from 'firebase-functions/v2/https';
import http from 'http';
import Fastify from 'fastify';
import { routes } from './routes/fastify.js';

let handleRequest = null;

const serverFactory = (handler, opts) => {
	handleRequest = handler;
	return http.createServer();
};
const fastify = Fastify({ serverFactory });

fastify.addContentTypeParser('application/json', {}, (req, body, done) => {
	done(null, body.body);
});

fastify.register(routes);

const opts = {
	region: 'asia-southeast1',
};

export const main = onRequest(opts, (req, res) => {
	fastify.ready((err) => {
		if (err) throw err;
		handleRequest(req, res);
	});
});
