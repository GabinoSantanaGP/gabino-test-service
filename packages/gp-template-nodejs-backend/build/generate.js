'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tsoa_1 = require('tsoa');
(async () => {
  const specOptions = {
    // basePath: '/src',
    entryFile: './src/server.ts',
    noImplicitAdditionalProperties: false,
    // specVersion: 3,
    // outputDirectory: './build',
    controllerPathGlobs: ['./src/**/*Controller.ts'],
  };
  const routeOptions = {
    // basePath: '/src',
    noImplicitAdditionalProperties: false,
    entryFile: './api/server.ts',
    // routesDir: './src',
  };
  await (0, tsoa_1.generateSpec)(specOptions);
  await (0, tsoa_1.generateRoutes)(routeOptions);
})();
