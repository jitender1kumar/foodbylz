import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Floor } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import * as FloorActions from '../dineStore/floorStore/floor.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class FloorComponent implements OnInit, ICellRendererAngularComp {
  args: string | null = null;
  myEditForm!: FormGroup;
  myAddForm!: FormGroup;
  id: string | null = null;
  valueid: string | null = null;
  tablename = 'Floor_';
  dinedata: any[] = [];
  dinedata2: any;
  show = false;
  showEdit = false;
  display = "display:none;";
  classname = "";
  modal: any;
  popdata2: any;
  static myGlobalVariable: any;
  qname = "";

  // AG Grid
  floors: Floor[] = [];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 50, 500, 1000];
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "description", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }
  ];

  // Floor model
  Floor_: Floor = {
    _id: "",
    name: "",
    description: '',
    status: true
  };

  Floordata$?: Observable<any[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;

  constructor(
    private floorService: FloorService,
    private sweetAlert: SweetAlert2,
    private dineService: DineService,
    private router: Router,
    private formBuilder: FormBuilder,
    private validationService: ValidationService,
    private store: Store<{ LoadFloor: any }>
  ) {
    this.Floordata$ = this.store.select(state => state.LoadFloor.Floor_.data);
    this.initForms();
    this.loadDine();
    this.loadFloor();
  }

  ngOnInit(): void {
    this.classname = "";
    this.loadFloor();
  }

  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    // Not implemented as per interface
    return false;
  }

  private initForms(): void {
    this.myEditForm = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      status: [true]
    });
    this.myAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      status: [true]
    });
  }

  private loadDine(): void {
    this.dineService.get().subscribe(data => {
      if (data) {
        this.dinedata2 = data;
        this.dinedata = this.dinedata2.data || [];
      }
    });
  }

  loadFloor(): void {
    this.store.dispatch(FloorActions.loadFloors());
    this.Floordata$ = this.store.select(state => state.LoadFloor.Floor_.data);
  }

  onCellClick(event: any): void {
    if (event.colDef.field === 'Delete') {
      this.modal = "modal";
      this.display = "display:block;";
      this.valueid = event.data._id;
      this.tablename = "Floor_";
    } else if (event.colDef.field === 'Edit') {
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formBuilder.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        description: [event.data.description],
        status: [event.data.status, Validators.required]
      });
    }
    this.loadFloor();
  }

  add(floor: Floor): void {
    const valid = this.validationService.checkNameExistforAddForm(floor.name, this.Floordata$);
    if (valid.value) {
      this.args = `Floor Name: ${floor.name} Already Exists`;
    } else {
      this.store.dispatch(FloorActions.addFloor({ Floor_: floor }));
      this.args = `Record Added successfully...${floor.name}`;
      this.loadFloor();
    }
  }

  update(floor: Floor): void {
    const valid = this.validationService.checkNameExist(floor.name, floor._id, this.Floordata$);
    if (!valid.value) {
      this.store.dispatch(FloorActions.updateFloor({ Floor_: floor }));
      this.args = `Successfully Updated...${floor.name}`;
      this.loadFloor();
    } else {
      this.args = `Floor Name: ${floor.name} Already Exists`;
    }
  }

  cDelete(_id: any): void {
    this.loadFloor();
  }

  onFormSubmit(): void {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }

  onFormEdit(): void {
    if (this.myEditForm.valid) {
      this.update(this.myEditForm.value);
    }
  }

  shows(): void {
    this.classname = "";
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }

  close(): void {
    this.showEdit = false;
    this.show = false;
  }

  handleChildClick(): void {
    this.display = "display:none;";
  }

  deletedConfirmed(_id: any): void {
    if (this.validateFloorExists(_id)) {
      this.store.dispatch(FloorActions.deleteFloor({ _id }));
      this.display = "display:none;";
      this.sweetAlert.showFancyAlertSuccess("Record Deleted Successfully ");
      this.loadFloor();
    } else {
      this.sweetAlert.showFancyAlertFail("Can't Delete because of associated with table");
      this.display = "display:none;";
    }
  }

  validateFloorExists(id: string): boolean {
    const item = this.dinedata.find((item: { floor_id: string }) => item.floor_id === id);
    return !item?._id;
  }
}