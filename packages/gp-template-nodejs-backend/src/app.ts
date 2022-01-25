// src/app.ts
import bodyParser from 'body-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { RegisterRoutes } from '../build/routes';

type ExRequest = typeof express.Request;
type ExResponse = typeof express.Response;
type NextFunction = typeof express.NextFunction;
export const app = express();

app.use(function notFoundHandler(_req: ExRequest, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  });
});

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  // if (err instanceof ValidateError) {
  //   console.warn(`Caught Validation Error for ${req.path}:`, err?.fields);
  //   return res.status(422).json({
  //     message: 'Validation Failed',
  //     details: err?.fields,
  //   });
  // }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});
// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

RegisterRoutes(app);
console.log({ routes: app._router.stack });
