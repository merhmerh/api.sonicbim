import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import crypto from 'crypto';

const { DB_URL, DB_SERVICE_API } = process.env;

export const supabase = createClient(DB_URL, DB_SERVICE_API);

export function calcChecksum(data, alg = 'sha256') {
	const sha256 = crypto.createHash(alg);
	sha256.update(data);
	const checksum = sha256.digest('hex');
	return checksum;
}

export function sendError(res, error, opts) {
	const code = opts?.code || 400;

	const errorData = { error: {} };

	if (typeof error == 'string') {
		errorData.error.message = error;
	} else {
		errorData.error = error;
	}

	if (opts?.error) {
		errorData.error.errorData = opts.error;
	}

	res.code(code).send(errorData);
}
