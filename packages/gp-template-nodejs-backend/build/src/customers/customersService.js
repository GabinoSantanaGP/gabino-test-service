'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CustomersService = void 0;
class CustomersService {
  get(id, name) {
    // return new Customer();
    return {
      id,
      age: 0,
      name: name || 'John',
      lastname: 'Doe',
      email: '' || '',
      phone: '345-9876' || '',
    };
  }
  create(customerCreationParams) {
    return Object.assign({ id: Math.floor(Math.random() * 100000) }, customerCreationParams);
  }
}
exports.CustomersService = CustomersService;
