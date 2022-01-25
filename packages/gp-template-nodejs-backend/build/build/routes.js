'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const dist_1 = require('@tsoa/runtime/dist');
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const customersController_1 = require('./../src/customers/customersController');
const models = {
  Customer: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      name: { dataType: 'string', required: true },
      lastname: { dataType: 'string', required: true },
      age: { dataType: 'double', required: true },
      email: { dataType: 'string', required: true },
      phone: { dataType: 'string', required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Customer.age-or-name-or-lastname-or-email-or-phone_': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        age: { dataType: 'double', required: true },
        name: { dataType: 'string', required: true },
        lastname: { dataType: 'string', required: true },
        email: { dataType: 'string', required: true },
        phone: { dataType: 'string', required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CustomerCreationParams: {
    dataType: 'refAlias',
    type: { ref: 'Pick_Customer.age-or-name-or-lastname-or-email-or-phone_', validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new dist_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get('/Customers/:CustomerId', function CustomersController_getCustomer(request, response, next) {
    const args = {
      CustomerId: { in: 'path', name: 'CustomerId', required: true, dataType: 'double' },
      name: { in: 'query', name: 'name', dataType: 'string' },
    };
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    let validatedArgs = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
      const controller = new customersController_1.CustomersController();
      const promise = controller.getCustomer.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    } catch (err) {
      return next(err);
    }
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post('/Customers', function CustomersController_createCustomer(request, response, next) {
    const args = {
      requestBody: { in: 'body', name: 'requestBody', required: true, ref: 'CustomerCreationParams' },
    };
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    let validatedArgs = [];
    try {
      validatedArgs = getValidatedArgs(args, request, response);
      const controller = new customersController_1.CustomersController();
      const promise = controller.createCustomer.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    } catch (err) {
      return next(err);
    }
  });
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function isController(object) {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }
  function promiseHandler(controllerObj, promise, response, successStatus, next) {
    return Promise.resolve(promise)
      .then((data) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        returnHandler(response, statusCode, data, headers);
      })
      .catch((error) => next(error));
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function returnHandler(response, statusCode, data, headers = {}) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name) => {
      response.set(name, headers[name]);
    });
    if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function responder(response) {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function getValidatedArgs(args, request, response) {
    const fieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'path':
          return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'header':
          return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'body':
          return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'body-prop':
          return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {
            noImplicitAdditionalProperties: 'throw-on-extras',
          });
        case 'formData':
          if (args[key].dataType === 'file') {
            return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
            return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          } else {
            return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {
              noImplicitAdditionalProperties: 'throw-on-extras',
            });
          }
        case 'res':
          return responder(response);
      }
    });
    if (Object.keys(fieldErrors).length > 0) {
      throw new dist_1.ValidateError(fieldErrors, '');
    }
    return values;
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
