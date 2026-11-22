import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as RoleActions from './role.actions';
import { RoleService } from '../../../core/Services/role.service';

@Injectable()
export class RoleEffects {
  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadAllRoles),
      mergeMap(() =>
        this.roleService.getRoles().pipe(
          map((roles) => RoleActions.loadAllRolesSuccess({ roles })),
          catchError((error) => of(RoleActions.loadAllRolesFailure({ error })))
        )
      )
    )
  );

  getRoleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.getRoleById),
      mergeMap(({ id }) =>
        this.roleService.getRole(id).pipe(
          map((role) => RoleActions.getRoleByIdSuccess({ role })),
          catchError((error) => of(RoleActions.getRoleByIdFailure({ error })))
        )
      )
    )
  );

  createRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.addRole),
      mergeMap(({ role }) =>
        this.roleService.createRole(role).pipe(
          map((createdRole) => RoleActions.addRoleSuccess({ role: createdRole })),
          catchError((error) => of(RoleActions.addRoleFailure({ error })))
        )
      )
    )
  );

  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.updateRoleById),
      mergeMap(({ _id, role }) =>
        this.roleService.updateRole(_id, role).pipe(
          map((updatedRole) => RoleActions.updateRoleByIdSuccess({ role: updatedRole })),
          catchError((error) => of(RoleActions.updateRoleByIdFailure({ error })))
        )
      )
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.deleteRoleById),
      mergeMap(({ _id }) =>
        this.roleService.deleteRole(_id).pipe(
          map(() => RoleActions.deleteRoleByIdSuccess({ _id })),
          catchError((error) => of(RoleActions.deleteRoleByIdFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly roleService: RoleService
  ) {}
}