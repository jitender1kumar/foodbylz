import { createReducer, on } from '@ngrx/store';
import {
	addRole,
	addRoleFailure,
	addRoleSuccess,
	deleteRoleById,
	deleteRoleByIdFailure,
	deleteRoleByIdSuccess,
	getRoleById,
	getRoleByIdFailure,
	getRoleByIdSuccess,
	loadAllRoles,
	loadAllRolesFailure,
	loadAllRolesSuccess,
	updateRoleById,
	updateRoleByIdFailure,
	updateRoleByIdSuccess,
} from './role.actions';
import { Role } from '../../../core/Model/crud.model';
export interface RoleState {
	role: Role[];
	loading: boolean;
	error: unknown | null;
}

export const initialRoleState: RoleState = {
	role: [],
	loading: false,
	error: null,
};

export const roleReducer = createReducer(
	initialRoleState,
	on(loadAllRoles, getRoleById, addRole, updateRoleById, deleteRoleById, (state) => ({
		...state,
		loading: true,
		error: null,
	})),
	on(loadAllRolesSuccess, (state, { roles }) => ({
		...state,
		roles,
		loading: false,
		error: null,
	})),
	on(getRoleByIdSuccess, (state, { role }) => ({
		...state,
		selectedRole: role,
		loading: false,
		error: null,
	})),
	on(addRoleSuccess, (state, { role }) => ({
		...state,
		role: [...state.role, role],
		loading: false,
		error: null,
	})),
	on(updateRoleByIdSuccess, (state, { role }) => ({
		...state,
		role: state.role.map((currentRole) =>
			currentRole.roleName === role.roleName ? role : currentRole,
		),
		loading: false,
		error: null,
	})),
	on(deleteRoleByIdSuccess, (state, { _id }) => ({
		...state,
		role: state.role.filter((role) => role.roleName !== _id),
		loading: false,
		error: null,
	})),
	on(
		loadAllRolesFailure,
		getRoleByIdFailure,
		addRoleFailure,
		updateRoleByIdFailure,
		deleteRoleByIdFailure,
		(state, { error }) => ({ ...state, loading: false, error }),
	),
);
