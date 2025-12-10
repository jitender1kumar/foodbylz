import { Component, Injectable, OnInit } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { IChairDefault, IDine, IFloorMergeWithDine } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';
import { ShowbuttonComponent } from '../../showbutton/showbutton.component';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ChairService } from '../../core/Services/chair.service';
import { Store } from '@ngrx/store';
import * as DineActions from '../dineStore/dinetableStore/dinetable.action';
import { Observable } from 'rxjs/internal/Observable';
import * as FloorActions from '../dineStore/floorStore/floor.action';
import { Actions } from '@ngrx/effects';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';
@Component({
  selector: 'app-dine',
  templateUrl: './dine.component.html',
  styleUrl: './dine.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class DineComponent implements OnInit {
  // State
  modal = "";
  args: any = null;
  myEditForm!: FormGroup;
  myAddForm!: FormGroup;
  valueid: any = null;
  tablename: string = '';
  show: boolean = false;
  showEdit: boolean = false;
  showQr: boolean = false;
  display: string = "display:none;";
  classname: string = "";
  qrData: any;
  dinedata$?: Observable<any[]>;
  dinedata: any;
  Floordata$?: Observable<any[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  IChairdata: any[] = [];
  IChairdata2: any;
  MergeFloorNameWithDineList: IFloorMergeWithDine[] = [];
  FloorWithDineData: IFloorMergeWithDine[] = [];
  static myGlobalVariable: any;
  argsMessage: string | null = null;
  createdTaskTable: any;
  dineExists: boolean = false;
  // Table/Chair Models
  dine: IDine = {
    _id: "",
    name: "",
    description: '',
    status: true,
    floor_id: '',
    employee_id: "undefined"
  };
  chair: IChairDefault = {
    name: "Default Chair",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  };

  // AG Grid
  colDefs: ColumnDef[] = [
    { field: "FloorName" , sortable:true},
    { field: "name", header: "TableName" , sortable:true},
    { field: "description", sortable:true },
    { field: "QR code", cellRenderer: ShowbuttonComponent },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }
  ];
  
  popdata2: any;


  constructor(
    private service: DineService,
    private quantitytypeService: QuantitytypeService,
    private router: Router, public actions$: Actions,
    private fb: FormBuilder,
    private floorService: FloorService,
    private sweetAlert: SweetAlert2,
    private chairService: ChairService,
    private store: Store<{ dineTableReducer_: any, LoadFloor: any }>
  ) {
    this.Floordata$ = this.store.select(state => state.LoadFloor.Floor_.data);
    this.dinedata$ = this.store.select(state => state.dineTableReducer_.Floor_.data);
    this.initForms();
    // this.loaddine();
    // this.loadChairs();
  }

  ngOnInit(): void {
    this.loadChairs();
    this.loadfloor();
    this.classname = "";
    this.loaddine();
    this.mergeFloorNameWithDine();
  }

  
  private initForms() {
    this.myEditForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      status: [true, Validators.required],
      floor_id: ['']
    });
    this.myAddForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [true, Validators.required],
      floor_id: ['']
    });
  }

  loadChairs(): void {
    this.chairService.get().subscribe(chairdata => {
      if (chairdata) {
        this.IChairdata2 = chairdata;
        this.IChairdata = this.IChairdata2.data || [];
      }
    });
  }

  loadfloor(): void {
    // Fix: Import FloorActions and use correct state property
    this.store.dispatch(FloorActions.loadFloors());
    this.Floordata$ = this.store.select(state => state.LoadFloor.Floor_.data);
  }

  loaddine(): void {
    // Use ngrx to load dine tables and select from store
    this.store.dispatch(DineActions.loadDineTables());
    this.dinedata$ = this.store.select(state => state.dineTableReducer_.IDine_.data);
  //  this.mergeFloorNameWithDine();
  }

  mergeFloorNameWithDine(): void {
    // Subscribe to dinedata$ and update MergeFloorNameWithDineList with merged data
    this.MergeFloorNameWithDineList = [];
        this.FloorWithDineData = [];
    this.dinedata$?.subscribe((mergeDineWithFloor: any[]) => {
      if (Array.isArray(mergeDineWithFloor)) {
        this.MergeFloorNameWithDineList = mergeDineWithFloor.map((dine: { _id: any; floor_id: any; name: any; description: any; status: any; }) => ({
          _id: String(dine._id),
          FloorName: this.getFloorName(String(dine.floor_id)),
          name: String(dine.name),
          description: String(dine.description),
          status: dine.status,
          floor_id: dine.floor_id
        }));
        
        this.FloorWithDineData = this.MergeFloorNameWithDineList;
      } 
      // else {
      //   this.MergeFloorNameWithDineList = [];
      //   this.FloorWithDineData = [];
      // }
    });
  }
  //   this.FloorWithDineData = this.MergeFloorNameWithDineList;
  // }

  getFloorName(floor_id: string): string {
    this.Floordata$ = this.store.select(state => state.LoadFloor.Floor_.data);
    let floorName = '';
    let getName;
    if (this.Floordata$) {
      this.Floordata$.subscribe(getname => {
        if (getname != undefined) {
          getName = getname.find((item: { _id: string }) => item._id === floor_id);
          floorName = getName.name;
          console.log(floorName);
          // console.log(floorName.name);
          console.log(getname);
        }

      }
      )
    }

    return floorName;
  }
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    switch (r[0].field.field) {
      case 'QR code':
        this.showQr = true;
        this.qrData = `${r[0].row._id} ${r[0].row.name}`;
        break;
      case 'Delete':
        this.display = "display:block;";
        this.valueid = r[0].row._id;
        this.tablename = "dine";
        this.modal = "modal";
        // Removed invalid property assignment: this.modal = "modal";
        break;
      case 'Edit':
        this.showEdit = true;
        this.show = false;
        this.popdata2 = r[0].row;
        this.args = null;
        this.myEditForm = this.fb.group({
          _id: [r[0].row._id],
          name: [r[0].row.name, Validators.required],
          description: [r[0].row.description, Validators.required],
          status: [r[0].row.status, Validators.required],
          floor_id: [r[0].row.floor_id, Validators.required]
        });
        break;
    }
    this.loaddine();
   
   }
  

  add(dine: IDine): void {
    this.dinedata$ = this.store.select(state => state.dineTableReducer_.IDine_.data);
    this.dinedata$?.subscribe(search => {
      this.dineExists = search.some(
        d => d.name === dine.name && d.floor_id === dine.floor_id
      );
    }
    )
    if (this.dineExists) {
      this.args = "Already Exists: " + dine.name;
      return;
    }
    // Use ngrx to add dine table instead of direct service call
    // Get the current value of dinedata$ before dispatching the action

    this.service.add(dine).subscribe(data => {
      if (data) {
        this.dinedata = data;
        this.chair = {
          name: "Default Chair",
          description: 'Default Chair Description',
          status: true,
          table_id: this.dinedata.data._id,
          chairorderstatus: '1'
        };

        this.chairService.addDefaultChair(this.chair).subscribe();
      }
    });

    this.args = "Record Added succefully..." + dine.name;
    this.loaddine();
    this.loadChairs();
  }

  update(IDine_: IDine): void {
    this.dinedata$ = this.store.select(state => state.dineTableReducer_.IDine_.data);
    this.dinedata$?.subscribe(search => {
      this.dineExists = search.some(
        d => d.name === IDine_.name && d.floor_id === IDine_.floor_id
      );
    }
    )
    if (this.dineExists) {
      this.args = "Already Exists: " + IDine_.name;
      return;
    }
    // Use ngrx to update dine table instead of direct service call
    this.store.dispatch(DineActions.updateDineTable({ IDine_: IDine_ }));
    // Optionally, listen for updateDineTableSuccess in the component to show messages and reload data
    this.args = "Successfully Updated..." + IDine_.name;
    this.loaddine();
    this.loadChairs();
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
    if (this.showQr) this.showQr = false;
    if (this.showEdit) this.showEdit = false;
    if (this.show) this.show = false;
  }

  handleChildClick(): void {
    this.display = "display:none;";
  }

  deletedConfirmed(id: any): void {
    this.loadChairs();
    if (Array.isArray(this.IChairdata)) {
      this.IChairdata
        .filter(chair => chair.table_id === id)
        .forEach(chair => {
          this.chairService.delete(chair._id).subscribe();
        });
    }
    this.service.delete(id).subscribe(res => {
      if (res) {
        this.display = "display:none;";
        this.loaddine();
        this.loadChairs();
        this.args = " Record Deleted Successfully ";
      }
    });
  }
}

function data(): ((value: { IDine_: IDine; } & import("@ngrx/store").Action<"[DineTable] Add DineTable Success">) => void) | Partial<import("rxjs").Observer<{ IDine_: IDine; } & import("@ngrx/store").Action<"[DineTable] Add DineTable Success">>> | null | undefined {
  throw new Error('Function not implemented.');
}
