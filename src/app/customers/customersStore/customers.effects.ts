import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CustomersActions from './customers.actions';
import { CustomresService } from '../../core/Services/customers.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Customers,CustomersEdit } from '../../core/Model/crud.model';

@Injectable()
export class CustomersEffects {
  constructor(
    private actions$: Actions,
    private customersService: CustomresService
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.loadCustomers),
      mergeMap(() =>
        this.customersService.get().pipe(
          map((customers: Customers[]) =>
            CustomersActions.loadCustomersSuccess({ customers })
          ),
          catchError(error =>
            of(CustomersActions.loadCustomersFailure({ error }))
          )
        )
      )
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.addCustomer),
      mergeMap(action =>
        this.customersService.add(action.customer).pipe(
          map((customer: Customers) =>
            CustomersActions.addCustomerSuccess({ customer })
          ),
          catchError(error =>
            of(CustomersActions.addCustomerFailure({ error }))
          )
        )
      )
    )
  );

  getCustomerById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.getCustomerById),
      mergeMap(action =>
        this.customersService.getbyid(action._id).pipe(
          map((customer: any) =>
            CustomersActions.getCustomerByIdSuccess({ customer })
          ),
          catchError(error =>
            of(CustomersActions.getCustomerByIdFailure({ error }))
          )
        )
      )
    )
  );

  getCustomerByMobileNumber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.getCustomerByMobileNumber),
      mergeMap((action: ReturnType<typeof CustomersActions.getCustomerByMobileNumber>) =>
        this.customersService.getbyMobileNumber(action.MobileNo).pipe(
          map((customer: any) =>
            CustomersActions.getCustomerByMobileNumberSuccess({ customer })
          ),
          catchError(error =>
            of(CustomersActions.getCustomerByMobileNumberFailure({ error }))
          )
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.updateCustomer),
      mergeMap(action =>
        this.customersService.update(action.customerEdit).pipe(
          map((customerEdit: any) =>
            CustomersActions.updateCustomerSuccess({ customerEdit })
          ),
          catchError(error =>
            of(CustomersActions.updateCustomerFailure({ error }))
          )
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.deleteCustomer),
      mergeMap(action =>
        this.customersService.delete(action._id).pipe(
          map(() =>
            CustomersActions.deleteCustomerSuccess({ _id: action._id })
          ),
          catchError(error =>
            of(CustomersActions.deleteCustomerFailure({ error }))
          )
        )
      )
    )
  );
}