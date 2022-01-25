// /// <reference path="../../../node_modules/@tsoa/cli/dist/cli.d.ts" />
import { ExtendedRoutesConfig, ExtendedSpecConfig } from '@tsoa/cli/dist';
import { generateRoutes, generateSpec } from 'tsoa';

(async () => {
  const specOptions: ExtendedSpecConfig = {
    // basePath: '/src',
    entryFile: './src/server.ts',
    noImplicitAdditionalProperties: false,
    // specVersion: 3,
    // outputDirectory: './build',
    controllerPathGlobs: ['./src/**/*Controller.ts'],
  };

  const routeOptions: ExtendedRoutesConfig = {
    // basePath: '/src',
    noImplicitAdditionalProperties: false,
    entryFile: './api/server.ts',
    // routesDir: './src',
  };

  await generateSpec(specOptions);

  await generateRoutes(routeOptions);
})();
export {};
