import { createAction, props } from '@ngrx/store';
import { Role } from '../../../core/Model/crud.model';


export type _id = string | number;

export const loadAllRoles = createAction('[Role] Load All');

export const getRoleById = createAction(
	'[Role] Get By ID',
	props<{ id: _id }>(),
);

export const addRole = createAction(
	'[Role] Add',
	props<{ role: Role }>(),
);

export const updateRoleById = createAction(
	'[Role] Update By ID',
	props<{ _id: _id; role: Partial<Role> }>(),
);

export const deleteRoleById = createAction(
	'[Role] Delete By ID',
	props<{ _id: _id }>(),
);  

export const loadAllRolesSuccess = createAction(
	'[Role] Load All Success',
	props<{ roles: Role[] }>(),
);

export const loadAllRolesFailure = createAction(
	'[Role] Load All Failure',
	props<{ error: unknown }>(),
);

export const getRoleByIdSuccess = createAction(
	'[Role] Get By ID Success',
	props<{ role: Role }>(),
);

export const getRoleByIdFailure = createAction(
	'[Role] Get By ID Failure',
	props<{ error: unknown }>(),
);

export const addRoleSuccess = createAction(
	'[Role] Add Success',
	props<{ role: Role }>(),
);

export const addRoleFailure = createAction(
	'[Role] Add Failure',
	props<{ error: unknown }>(),
);

export const updateRoleByIdSuccess = createAction(
	'[Role] Update By ID Success',
	props<{ role: any }>(),
);

export const updateRoleByIdFailure = createAction(
	'[Role] Update By ID Failure',
	props<{ error: unknown }>(),
);

export const deleteRoleByIdSuccess = createAction(
	'[Role] Delete By ID Success',
	props<{ _id: _id }>(),
);

export const deleteRoleByIdFailure = createAction(
	'[Role] Delete By ID Failure',
	props<{ error: unknown }>(),
);
  
