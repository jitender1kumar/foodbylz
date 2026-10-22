import { Injectable } from "@angular/core"
import { CustomerPaymentHistory } from "../../../core/Model/crud.model"
import { CustomerPaymentHistoryService } from "../../../core/Services/CustomerPaymentHistory.service"
import {
    CUSTOMER_PAYMENT_HISTORY_ACTIONS,
    setCustomerPaymentHistory,
} from "./CustomerPaymentHistory.action"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, of, switchMap } from "rxjs"
@Injectable()
export class CustomerPaymentHistoryEffects {
    constructor(private actions$: Actions, private CustomerPaymentHistoryService_: CustomerPaymentHistoryService) { }

    getByCustomerId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CUSTOMER_PAYMENT_HISTORY_ACTIONS.GET_BY_CUSTOMER_ID),
            switchMap(({ payload }) =>
                this.CustomerPaymentHistoryService_.getbyid(payload).pipe(
                    map((history) => setCustomerPaymentHistory(history as CustomerPaymentHistory[])),
                    catchError(() => of(setCustomerPaymentHistory([])))
                )
            )
        )
    )

    addCustomerPaymentHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CUSTOMER_PAYMENT_HISTORY_ACTIONS.ADD),
            switchMap(({ payload }) =>
                this.CustomerPaymentHistoryService_.add(payload).pipe(
                    map((history) => setCustomerPaymentHistory([history] as CustomerPaymentHistory[])),
                    catchError(() => of(setCustomerPaymentHistory([])))
                )
            )
        )
    )
    updateCustomerPaymentHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CUSTOMER_PAYMENT_HISTORY_ACTIONS.UPDATE),
            switchMap(({ payload }) =>
                this.CustomerPaymentHistoryService_.update(payload).pipe(
                    map((history) => setCustomerPaymentHistory([history] as CustomerPaymentHistory[])),
                    catchError(() => of(setCustomerPaymentHistory([])))
                )
            )
        )
    )

}