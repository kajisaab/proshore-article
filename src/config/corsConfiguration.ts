import { CorsError } from '@core/middleware/errorHandler/corsError';

/**
 * DEFINE ALLOWED ORIGINS
 */
const allowedOrigins = ['http://localhost:3000', 'http://169.254.67.41:3000', 'http://192.168.18.78:3000', 'http://192.168.1.66:3000', 'http://192.168.43.90:3000'];

/**
 * DEFINE CORS OPTIONS
 */
const corsOptions = {
  origin: function (origin: string | undefined, callback: (_err: Error | null, _origin?: boolean | string | RegExp | Array<boolean | string | RegExp>) => void) {
    // Check if the origin is included in the allowed origins array.
    if (origin !== undefined || origin !== '' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new CorsError('Sorry!, you do not have access'));
    }
  },
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-XSRF-TOKEN'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

export default corsOptions;
