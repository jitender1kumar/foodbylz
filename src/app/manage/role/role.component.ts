import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { popupenvironment } from '../../environment/popupEnvironment';
import * as RoleAction from '../ManageStore/roleStore/role.actions';
import { permission, Role } from '../../core/Model/crud.model';
import { Observable } from 'rxjs/internal/Observable';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent implements OnInit {
   rolePages = [
    { key: 'home', label: 'Home' },
    { key: 'settings', label: 'Settings' },
    { key: 'table', label: 'Table' },
    { key: 'grid', label: 'Grid' },
    { key: 'payment', label: 'Payment' },
    { key: 'companyLogin', label: 'Company Login' },
    { key: 'userLogin', label: 'User Login' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'orders', label: 'Orders' },
    { key: 'menu', label: 'Menu' },
    { key: 'blacklist', label: 'Blacklist' },
    { key: 'categories', label: 'Categories' },
    { key: 'foods', label: 'Foods' },
    { key: 'floor', label: 'Floor' },
    { key: 'inventory', label: 'Inventory' },
    { key: 'genral', label: 'Genral' },
    { key: 'discountManagement', label: 'Discount Management' },
  ];
  permissions: permission = {
    home: false,
    settings: false,
    table: false,
    grid: false,
    payment: false,
    companyLogin: false,
    userLogin: false,
    dashboard: false,
    orders: false,
    menu: false,
    blacklist: false,
    categories: false,
    foods: false,
    floor: false,
    inventory: false,
    genral: false,
    discountManagement: false
  }
  role: Role = {
    roleName: '',
    permissions: []
  }
  readonly addRoleForm: FormGroup;
  readonly editRoleForm: FormGroup;
  popupenvironments: any;
  Roll_Collections$: Observable<any[]> | undefined;
  loading$: Observable<boolean> | undefined;
  error$: Observable<string | null> | undefined;
  modal!: string;
  display: string | undefined;
  valueid: any;
  tablename!: string;
  popdata2: any;
  showEdit!: boolean;
  show!: boolean;
  args!: null;
  formedit: any;

  constructor(private readonly formBuilder: FormBuilder,
    private store: Store<{ RoleReducer_: any }>,) {
       this.display = "display:none;"
      this.Roll_Collections$ = store.select(state => state.RoleReducer_.roles);
    this.loading$ = store.select(state => state.RoleReducer_.loading);
    this.error$ = store.select(state => state.RoleReducer_.error);
    this.popupenvironments = popupenvironment;
    this.popupenvironments.display$.next("display:none;");
    this.addRoleForm = this.createRoleForm();
    this.editRoleForm = this.createRoleForm();
  }
  ngOnInit(): void {
    this.loadallRole();
  }
colDefs: ColumnDef[] = [
   // { field: "permissions",sortable:true },
    { field: "roleName",sortable:true },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block"
      this.valueid = r[0].row._id;
      this.tablename = "qtyp";
    }
    if (r[0].field == 'Edit') {
      this.popdata2 = r[0].row;
      this.popupenvironments.showEdit$.next(true);
     // this.showEdit = true;
      this.show = false;
      this.args = null;
      const permissions = this.emptyPermissions();
      const selectedPermissions: string[] = Array.isArray(r[0].row.permissions)
        ? r[0].row.permissions
        : [];
        console.log(r[0].row.permissions);
        //this.rolePages=[];

      for (const page of this.rolePages) {
        permissions[page.key] = selectedPermissions.includes(page.key);
      }
     // return Object.fromEntries(this.rolePages.map((page) => [page.key, false]));
      console.log(permissions);

      this.editRoleForm.setValue({
        roleName: r[0].row.roleName,
        permissions: r[0].row.permissions,
      });
    }
   }
     handleChildClick() {
    this.display = "display:none;";
  }
   deletedConfirmed(_id: any): void {
    this.store.dispatch(RoleAction.deleteRoleById({ _id: _id }));
    this.loadallRole();
    this.display = "display:none;";
  // this.productPriceservice.getbyidQtypid(_id).subscribe({
  //   next: (records: any) => {
  //     // Use type assertion to access data
  //     const productList = (records as { data?: any[] })?.data || [];
  //     this.productrecord2 = records;
  //     this.productrecord = productList;

  //     console.log(productList.length, records);

  //     if (productList.length === 0) {
  //      // this.deleteQuantityTypeAndReload(_id);
  //     } else {
  //      // this.showDeleteBlockedMessage();
  //     }
  //   },
  //   error: (err) => {
  //     console.error("Error fetching product records:", err);
  //     this.SweetAlert2_.showFancyAlertFail("Failed to check linked products. Please try again.");
  //   }
  //});
}
  get selectedAddCount(): number {
    return this.countSelected(this.addRoleForm);
  }

  get selectedEditCount(): number {
    return this.countSelected(this.editRoleForm);
  }

  onAddRole(): void {
    if (this.addRoleForm.invalid) {
      this.addRoleForm.markAllAsTouched();
      return;
    }
    const jskrole = {
      roleName: this.addRoleForm.value.roleName,
      permissions: this.addRoleForm.value.permissions,
    }
    //  this.role={
    //   roleName: this.addRoleForm.value.roleName,
    //   permissions: this.addRoleForm.value.permissions,

    // }
    this.store.dispatch(RoleAction.addRole({ role: jskrole }));
    console.log('Create role:', jskrole);
    this.addRoleForm.reset({ roleName: '', permissions: this.emptyPermissions() });
  }

  onEditRole(): void {
    if (this.editRoleForm.invalid) {
      this.editRoleForm.markAllAsTouched();
      return;
    }
    console.log('Update role:', this.editRoleForm.getRawValue());
  }

  loadallRole(): void {
    this.store.dispatch(RoleAction.loadAllRoles());
    this.Roll_Collections$ = this.store.select(state => state.RoleReducer_.roles);
this.Roll_Collections$.subscribe(data=>{
  console.log(data);
});
  }

  selectAllAddPermissions(): void {
    const permissions = this.addRoleForm.get('permissions') as FormGroup;
    const controls = Object.values(permissions.controls);
    const allSelected = controls.length > 0 && controls.every((control) => control.value === true);

    controls.forEach((control) => control.setValue(!allSelected));
    permissions.updateValueAndValidity();
  }


  selectAllEditPermissions(): void {
    const permissions = this.editRoleForm.get('permissions') as FormGroup;
    const controls = Object.values(permissions.controls);
    const allSelected = controls.length > 0 && controls.every((control) => control.value === true);

    controls.forEach((control) => control.setValue(!allSelected));
    permissions.updateValueAndValidity();
  }

  private createRoleForm(): FormGroup {
    return this.formBuilder.group({
      roleName: ['', Validators.required],
      permissions: this.formBuilder.group(this.emptyPermissions()),
    });
  }

  private emptyPermissions(): Record<string, boolean> {
    return Object.fromEntries(this.rolePages.map((page) => [page.key, false]));
  }

  private countSelected(form: FormGroup): number {
    const permissions = form.get('permissions')?.value as Record<string, boolean> | null;
    return Object.values(permissions ?? {}).filter(Boolean).length;
  }
  close() {
    //alert(arg0)
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(false);

  }
  shows() {

    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(true);
    this.popupenvironments.args$.next(null);

  }
}
