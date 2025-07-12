import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoryAction from './category.actions';
import { CategoryService } from '../../../core/Services/category.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductCategoryEffects {
  constructor(private actions$: Actions, private categoryService: CategoryService) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryAction.loadCategories),
      mergeMap(() =>
        this.categoryService.get().pipe(
          map((ProductCategory_) => CategoryAction.loadCategoriesSuccess({ ProductCategory_})),
          catchError((error) => of(CategoryAction.loadCategoriesFailure({ error: error.message })))
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryAction.addCategory),
      mergeMap((action) =>
        this.categoryService.add(action.ProductCategory_).pipe(
          map((ProductCategory_) => CategoryAction.addCategorySuccess({ ProductCategory_ })),
          catchError((error) => of(CategoryAction.addCategoryFailure({ error: error.message })))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryAction.updateCategory),
      mergeMap((action) =>
        this.categoryService.update(action.ProductCategory_).pipe(
          map((ProductCategory_) => CategoryAction.updateCategorySuccess({ ProductCategory_ })),
          catchError((error) => of(CategoryAction.updateCategoryFailure({ error: error.message })))
        )
      )
    )
  );

  deletCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryAction.deleteCategory),
      mergeMap((action) =>
        this.categoryService.delete(action._id).pipe(
          map(() => CategoryAction.deleteCategory({ _id: action._id })),
          catchError((error) => of(CategoryAction.deleteCategoryFailure({ error: error.message })))
        )
      )
    )
  );
}
