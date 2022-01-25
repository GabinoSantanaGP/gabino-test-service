import { Customer } from './customer';
export declare type CustomerCreationParams = Pick<Customer, 'age' | 'name' | 'lastname' | 'email' | 'phone'>;
export declare class CustomersService {
  get(id: number, name?: string): Customer;
  create(customerCreationParams: CustomerCreationParams): Customer;
}
//# sourceMappingURL=customersService.d.ts.map
