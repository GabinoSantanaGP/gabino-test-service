import { Controller } from 'tsoa';
import { Customer } from './customer';
import { CustomerCreationParams } from './customersService';
export declare class CustomersController extends Controller {
  getCustomer(CustomerId: number, name?: string): Promise<Customer>;
  createCustomer(requestBody: CustomerCreationParams): Promise<void>;
}
//# sourceMappingURL=customersController.d.ts.map
