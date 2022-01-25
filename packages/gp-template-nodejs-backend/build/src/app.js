'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.app = void 0;
// src/app.ts
const body_parser_1 = __importDefault(require('body-parser'));
const express_1 = __importDefault(require('express'));
const swagger_ui_express_1 = __importDefault(require('swagger-ui-express'));
const routes_1 = require('../build/routes');
exports.app = (0, express_1.default)();
exports.app.use(function notFoundHandler(_req, res) {
  res.status(404).send({
    message: 'Not Found',
  });
});
exports.app.use(function errorHandler(err, req, res, next) {
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
exports.app.use(
  body_parser_1.default.urlencoded({
    extended: true,
  }),
);
exports.app.use(body_parser_1.default.json());
exports.app.use('/docs', swagger_ui_express_1.default.serve, async (_req, res) => {
  return res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => __importStar(require('../build/swagger.json')))));
});
(0, routes_1.RegisterRoutes)(exports.app);
console.log({ routes: exports.app._router.stack });
