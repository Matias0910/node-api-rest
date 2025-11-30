import app from '../src/app.js';

// Vercel Node.js Serverless Functions can accept a standard (req, res) handler.
// An Express `app` is a compatible request handler function, so we can
// directly export a wrapper that forwards requests to the Express app
// without requiring `serverless-http`.

export default function handler(req, res) {
	return app(req, res);
}
