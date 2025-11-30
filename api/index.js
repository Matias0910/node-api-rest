import app from '../src/app.js';

// Vercel Node.js Serverless Functions can accept a standard (req, res) handler.
// An Express app can be used directly as a request handler.
// This wrapper ensures compatibility with Vercel's serverless environment.

export default app;
