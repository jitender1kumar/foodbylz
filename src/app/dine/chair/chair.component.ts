import { Component, Injectable, OnInit } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { IChair, IChairMergeDineName } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ChairService } from '../../core/Services/chair.service';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';
import {  ValidationService } from '../../core/commanFunction/Validation.service';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrl: './chair.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class ChairComponent implements OnInit, ICellRendererAngularComp {
  args: string | null = null;
  myEditForm: FormGroup;
  myAddForm: FormGroup;
  display: string = "display:none;";
  show: boolean = false;
  showEdit: boolean = false;
  classname: string = "";
  modal: string = "";
  valueid: string | null = null;
  tablename: string = "";
  dinedata: any[] = [];
  Floordata: any[] = [];
  IChairdata: any[] = [];
  dinename: IChairMergeDineName[] = [];
  popdata2: any = null;

  // AG Grid
  colDefs: ColumnDef[] = [
    { field: "FloorName" ,sortable:true},
    { field: "DineTable",sortable:true },
    { field: "name",sortable:true },
    { field: "description",sortable:true },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }
  ];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10,50, 500, 1000];

  chair: IChair = {
    _id: "",
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  };
  dinedata2: any;
Floordata2: any;
  constructor(
    private chairService: ChairService,
    private ValidationService_: ValidationService,
    private floorService: FloorService,
    private quantityTypeService: QuantitytypeService,
    private router: Router,
    private fb: FormBuilder,
    private dineService: DineService
  ) {
    this.myEditForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      status: [true, Validators.required],
      table_id: ['', Validators.required],
      chairorderstatus: ['1', Validators.required]
    });
    this.myAddForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [true, Validators.required],
      table_id: ['', Validators.required],
      chairorderstatus: ['1', Validators.required]
    });
  }

  ngOnInit(): void {
    this.classname = "";
    this.loadFloors();
    this.loadChairs();
  }

  agInit(params: ICellRendererParams): void {
    // Not used in this context, but required by interface
  }

  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  private loadFloors(): void {
    this.floorService.get().subscribe(data => {
      this.Floordata2 = data || [];
       this.Floordata = this.Floordata2.data || [];
    });
  }

  private loadDines(): void {
    this.dineService.get().subscribe(data => {
      this.dinedata2 = data;
      this.dinedata = this.dinedata2.data || [];
    });
  }

  private loadChairs(): void {
    this.loadDines();
    this.chairService.get().subscribe((data: IChair[] | { data: IChair[] }) => {
      // If the response is an array, use it directly; if it's an object with a 'data' property, use that.
      if (Array.isArray(data)) {
        this.IChairdata = data;
        console.log(this.IChairdata);
      } else if (data && Array.isArray((data as any).data)) {
        this.IChairdata = (data as any).data;
        console.log(this.IChairdata);
      } else {
        this.IChairdata = [];
      }
      this.populateChairDisplayData();
    });
  }

  private populateChairDisplayData(): void {
    this.dinename = this.IChairdata.map((chair: IChair) => ({
      _id: chair._id,
      DineTable: this.getDineName(chair.table_id),
      name: chair.name,
      description: chair.description,
      table_id: chair.table_id,
      status: chair.status,
      FloorName: this.getFloorName(chair.table_id)
    }));
  }

  private getFloorName(tableId: string): string {
    const dine = this.dinedata.find((item: { _id: string }) => item._id === tableId);
    if (dine) {
      const floor = this.Floordata.find((item: { _id: string }) => item._id === dine.floor_id);
      return floor ? floor.name : '';
    }
    return '';
  }

  private getDineName(id: string) {
    if(id){
    const dine = this.dinedata.find((item: { _id: string }) => item._id === id);
    if(dine){
    return dine ? dine.name : '';
    }
  }
  }
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;";
      this.valueid = r[0].row._id;
      this.tablename = "dine";
    }
    if (r[0].field == 'Edit') {
    //  this.loadDines();
      this.popdata2 = r[0].row;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.fb.group({
        _id: [r[0].row._id],
        name: [r[0].row.name, Validators.required],
        description: [r[0].row.description],
        status: [r[0].row.status, Validators.required],
        table_id: [r[0].row.table_id, Validators.required],
        chairorderstatus: [r[0].row.chairorderstatus, Validators.required]
      });
    }
   // this.loadChairs();
   }
  

  add(chair: IChair): void {
    if (this.ValidationService_.checkChairNameExist(
      this.myAddForm.value.name,
      this.IChairdata,
      this.dinedata,
      this.Floordata
    )) {
      this.args = "Chair Exists.";
    } else {
      this.chairService.add(chair).subscribe(res => {
        if (res) {
          this.args = "Record Added successfully..." + chair.name;
        }
        this.loadChairs();
      });
    }
  }

  update(chair: IChair): void {
    if (this.ValidationService_.checkChairNameExist(
      this.myEditForm.value.name,
      this.IChairdata,
      this.dinedata,
      this.Floordata
    )) {
      this.args = "Chair Exists.";
    } else {
      this.chairService.update(chair).subscribe(res => {
        if (res) {
          this.args = "Successfully Updated..." + chair.name;
          this.loadChairs();
        }
      });
    }
  }

  cDelete(_id: string): void {
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
    this.loadDines();
    this.classname = "";
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }

  close(): void {
    if (this.showEdit) {
      this.showEdit = false;
    }
    if (this.show) {
      this.show = false;
    }
  }

  handleChildClick(): void {
    this.display = "display:none;";
  }

  deletedConfirmed(id: string): void {
    if (this.canDeleteChair(id)) {
      this.chairService.delete(id).subscribe(res => {
        if (res) {
          this.display = "display:none;";
          this.args = "Record Deleted Successfully";
          alert("deleted");
        }
        this.loadChairs();
      });
    } else {
      this.display = "display:none;";
      alert("can't delete");
      this.loadChairs();
    }
  }

  private canDeleteChair(id: string): boolean {
    const itemChair = this.dinename.find((item: { _id: string }) => item._id === id);
    if (itemChair?._id) {
      const count = this.IChairdata.filter((c: IChair) => c.table_id === itemChair.table_id).length;
      return count > 1;
    }
    return false;
  }
}