import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Floor } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import * as FloorActions from '../dineStore/floorStore/floor.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrl: './floor.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class FloorComponent implements OnInit {
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
 
  colDefs: ColumnDef[] = [
    { field: "name", sortable:true  },
    { field: "description", sortable:true },
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
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;";
      this.valueid = r[0].row._id;
      this.tablename = "Floor_";
    }
    if (r[0].field == 'Edit') {
      this.popdata2 = r[0].row;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formBuilder.group({
        _id: [r[0].row._id],
        name: [r[0].row.name, Validators.required],
        description: [r[0].row.description],
        status: [r[0].row.status, Validators.required]
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