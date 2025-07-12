import { createAction, props } from '@ngrx/store';
import { ProductPriceDetails } from '../../../core/Model/crud.model';

export const itmeQplus = createAction('[Items] Quantity Plus',props<{productpriceallname:ProductPriceDetails}>());
export const itemQminus = createAction('[Items] Quantity Minus',props<{productpriceallname:ProductPriceDetails}>());