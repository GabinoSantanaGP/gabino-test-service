import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from 'tsoa';

import { Customer } from './customer';
import { CustomerCreationParams, CustomersService } from './customersService';

@Route('Customers')
export class CustomersController extends Controller {
  @Get('{CustomerId}')
  public async getCustomer(@Path() CustomerId: number, @Query() name?: string): Promise<Customer> {
    return new CustomersService().get(CustomerId, name);
  }

  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createCustomer(@Body() requestBody: CustomerCreationParams): Promise<void> {
    this.setStatus(201); // set return status 201
    new CustomersService().create(requestBody);
    return;
  }
}
