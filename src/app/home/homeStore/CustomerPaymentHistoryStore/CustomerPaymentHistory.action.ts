import { CustomerPaymentHistory } from "../../../core/Model/crud.model"

export const CUSTOMER_PAYMENT_HISTORY_ACTIONS = {
	SET: "customerPaymentHistory/set",
	ADD: "customerPaymentHistory/add",
	UPDATE: "customerPaymentHistory/update",
	REMOVE: "customerPaymentHistory/remove",
	GET_BY_CUSTOMER_ID: "customerPaymentHistory/getByCustomerId",
	CLEAR: "customerPaymentHistory/clear",
} as const

export const setCustomerPaymentHistory = (
	customerPaymentHistory: CustomerPaymentHistory[]
) => ({
	type: CUSTOMER_PAYMENT_HISTORY_ACTIONS.SET,
	payload: customerPaymentHistory,
})

export const addCustomerPaymentHistory = (
	customerPaymentHistory: CustomerPaymentHistory
) => ({
	type: CUSTOMER_PAYMENT_HISTORY_ACTIONS.ADD,
	payload: customerPaymentHistory,
})

export const updateCustomerPaymentHistory = (
	customerPaymentHistory: CustomerPaymentHistory
) => ({
	type: CUSTOMER_PAYMENT_HISTORY_ACTIONS.UPDATE,
	payload: customerPaymentHistory,
})

export const removeCustomerPaymentHistory = (invoiceId: string) => ({
	type: CUSTOMER_PAYMENT_HISTORY_ACTIONS.REMOVE,
	payload: invoiceId,
})

export const getCustomerPaymentHistoryByCustomerId = (CustomerId: string) => ({
	type: CUSTOMER_PAYMENT_HISTORY_ACTIONS.GET_BY_CUSTOMER_ID,
	payload: CustomerId,
})

export const clearCustomerPaymentHistory = () => ({
	type: CUSTOMER_PAYMENT_HISTORY_ACTIONS.CLEAR,
})

export type CustomerPaymentHistoryAction =
	| ReturnType<typeof setCustomerPaymentHistory>
	| ReturnType<typeof addCustomerPaymentHistory>
	| ReturnType<typeof updateCustomerPaymentHistory>
	| ReturnType<typeof removeCustomerPaymentHistory>
	| ReturnType<typeof getCustomerPaymentHistoryByCustomerId>
	| ReturnType<typeof clearCustomerPaymentHistory>
