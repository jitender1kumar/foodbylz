import { CustomerPaymentHistory } from '../../../core/Model/crud.model';
import {
	CUSTOMER_PAYMENT_HISTORY_ACTIONS,
	CustomerPaymentHistoryAction,
} from './CustomerPaymentHistory.action';

export interface CustomerPaymentHistoryState {
	customerPaymentHistory: CustomerPaymentHistory[];
	loading: boolean;
	error: unknown;
}

export const initialState: CustomerPaymentHistoryState = {
	customerPaymentHistory: [],
	loading: false,
	error: null,
};

const updateState = (
	state: CustomerPaymentHistoryState,
	changes: Partial<CustomerPaymentHistoryState>
): CustomerPaymentHistoryState => ({ ...state, ...changes });

const emptyState = (): Partial<CustomerPaymentHistoryState> => ({
	customerPaymentHistory: [],
	loading: false,
	error: null,
});

export const customerPaymentHistoryReducer = (
	state: CustomerPaymentHistoryState = initialState,
	action: CustomerPaymentHistoryAction
): CustomerPaymentHistoryState => {
	switch (action.type) {
		case CUSTOMER_PAYMENT_HISTORY_ACTIONS.GET_BY_CUSTOMER_ID:
			return updateState(state, {
				customerPaymentHistory: [],
				loading: true,
				error: null,
			});
		case CUSTOMER_PAYMENT_HISTORY_ACTIONS.SET:
			return updateState(state, {
				customerPaymentHistory: action.payload,
				loading: false,
				error: null,
			});
		case CUSTOMER_PAYMENT_HISTORY_ACTIONS.ADD:
			return updateState(state, {
				customerPaymentHistory: [...state.customerPaymentHistory, action.payload],
			});
		case CUSTOMER_PAYMENT_HISTORY_ACTIONS.UPDATE:
			return updateState(state, {
				customerPaymentHistory: state.customerPaymentHistory.map((item) =>
					item.InvoiceId === action.payload.InvoiceId ? action.payload : item
				),
			});
		case CUSTOMER_PAYMENT_HISTORY_ACTIONS.REMOVE:
			return updateState(state, {
				customerPaymentHistory: state.customerPaymentHistory.filter(
					(item) => item.InvoiceId !== action.payload
				),
			});
		case CUSTOMER_PAYMENT_HISTORY_ACTIONS.CLEAR:
			return updateState(state, emptyState());
		default:
			return state;
	}
};
