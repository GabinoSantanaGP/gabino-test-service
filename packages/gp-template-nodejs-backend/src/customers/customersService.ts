import { Customer } from './customer';
export type CustomerCreationParams = Pick<Customer, 'age' | 'name' | 'lastname' | 'email' | 'phone'>;
export class CustomersService {
  public get(id: number, name?: string): Customer {
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
  public create(customerCreationParams: CustomerCreationParams): Customer {
    return {
      id: Math.floor(Math.random() * 100000),
      ...customerCreationParams,
    };
  }
}
