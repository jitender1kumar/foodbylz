import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router, RouterLink } from '@angular/router';
import { IChairDefault, IDine, IFloorMergeWithDine } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';
import { ShowbuttonComponent } from '../../showbutton/showbutton.component';
import { SweetAlert2 } from '../../core/commanFunction/sweetalert';
import { ChairService } from '../../core/Services/chair.service';

@Component({
  selector: 'app-dine',
  templateUrl: './dine.component.html',
  styleUrl: './dine.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class DineComponent implements OnInit, ICellRendererAngularComp {
  args: any = null;
  myEditForm: FormGroup;
  qid: any;
  id: any; basedata: any;
  popdata2: any;
  popdataId: any; IChairdata2: any; IChairdata: any;
  popdataBasetypedesc: any;
  popdataBasetypeName: any;
  popdataQuntityId: any;
  src: any;
  alt: any;
  content: any;
  classname: any;
  style: any;
  modal: any;
  display: any;
  id01: any;
  valueid: any;
  tablename: any;
  isCheckedStatus: any = true;
  myAddForm: FormGroup;
  qrData: any;
  chair: IChairDefault = {
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  }
  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
    //this.rowData= params.api.refreshClientSideRowModel;
    // console.log(params);

  }
  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.
  dinerow: IDine[] = [];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];


  colDefs: ColDef[] = [
    { field:"FloorName" },
    { field: "name" as "TableName" },
    { field: "description", flex: 1 },
    { field: "QR code", cellRenderer: ShowbuttonComponent },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  dine: IDine = {
    _id: "",
    name: "",
    description: '',
    status: true,
    floor_id: '',
    employee_id: "undefined"
  }
  Floordata2: any;
  Floordata: any
  dinenamedata: any;
  dinenamedata2: any
  dinedata2: any;
  dinedata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  showQr = false;
  constructor(private service: DineService, private QuantitytypeService_: QuantitytypeService, private router: Router, private formedit: FormBuilder, private floorservice: FloorService, private SweetAlert2_: SweetAlert2, private chairService: ChairService) {
    this.display = "display:none;"
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      status: [true, [Validators.required]],
      floor_id: ['']
    });
    this.myAddForm = this.formedit.group({

      name: ['', Validators.required],
      description: [''],
      status: [true, [Validators.required]],
      floor_id: ['']
    });
    //  this.loadbasetype();
    this.loaddine();
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  loadChairs() {
    //alert(selectcategoryID);

    this.chairService.get().subscribe(data => {
      if (data) {
        this.IChairdata2 = data;
        this.IChairdata = this.IChairdata2.allTasks

      }
    })
  }
  loadfloor() {
    //alert(selectcategoryID);
    this.floorservice.get().subscribe(data => {
      if (data) {
        this.Floordata2 = data;
        this.Floordata = this.Floordata2.allTasks

      }
    })
  }
  MergeFloorNameWithDineList: IFloorMergeWithDine[] = [];
  FloorWithDineData: any[] = [];
  MergeFloorNameWithDine() {
    this.MergeFloorNameWithDineList = [];
    for (var ii = 0; ii < this.dinedata.length; ii++) {
      this.MergeFloorNameWithDineList.push({
        _id: this.dinedata[ii]._id,
        FloorName: this.getFloorName(this.dinedata[ii].floor_id),
        name: this.dinedata[ii].name,
        description: this.dinedata[ii].description,
        status: this.dinedata[ii].status,
        floor_id: this.dinedata[ii].floor_id
      })
    }
    this.FloorWithDineData = this.MergeFloorNameWithDineList;
  }
  getFloorName(floor_id: string) {



    const itemP = this.Floordata.find((item: { _id: string; }) => item._id === floor_id);
    const indexP = this.Floordata.findIndex((item: { _id: string; }) => item._id === floor_id);
    //console.log()
    if (itemP?._id) {
      return this.Floordata[indexP].name;

    }

  }
  loaddine() {
    //alert(selectcategoryID);
    this.service.get().subscribe(data => {
      if (data) {
        this.dinedata2 = data;
        this.dinedata = this.dinedata2.allTasks
        this.MergeFloorNameWithDine();
      }
    })
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'QR code') {
      this.showQr = true;
      this.qrData = event.data._id + " " + event.data.name;
    }
    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;
      this.tablename = "dine";

    }
    if (event.colDef.field == 'Edit') {
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        description: [event.data.description, [Validators.required]],
        status: [event.data.status, [Validators.required]],
        floor_id: [event.data.floor_id, [Validators.required]]
      });

    }
    this.loaddine();
  }

  ngOnInit(): void {
    this.loadChairs();
    this.loadfloor()
    this.classname = "";
    this.loaddine();

  }
  createdTaskTable: any;
  dineExists = "false";
  add(dine: IDine): void {
    this.dineExists = "false";
    console.log(this.dinedata);
    for (let i = 0; i < this.dinedata.length; i++) {
      if (this.dinedata[i].name == dine.name && this.dinedata[i].floor_id == dine.floor_id) {
        this.SweetAlert2_.showFancyAlertFail("Already Exists: " + this.dinedata[i].name);
        this.dineExists = "true";
        break;
      }
    }
    if (this.dineExists == "false") {
      this.service.add(dine).subscribe(res => {
        if (res) {
          this.createdTaskTable = res;
          console.log(this.createdTaskTable.createdTask);

          const chair: IChairDefault = {
            name: "Chair 1",
            description: 'Default Chair',
            status: true,
            table_id: this.createdTaskTable.createdTask._id,
            chairorderstatus: '1',

          }
          this.addChair(chair);



           this.args = "Record Added succefully..." + dine.name ;
         // this.SweetAlert2_.showFancyAlertSuccess("Record Added succefully..." + dine.name);
          this.loaddine();
        }
      })
    }
  }
  addChair(chair: IChairDefault): void {

    this.chairService.addDefaultChair(chair).subscribe(res => {
      if (res) {
        // console.log(data);
        //this.search(id);
        //this.args="Record Added succefully..."+chair.name;
        // alert("Basetype inserted succefully.");
        // this.loadbasetype()
        // this.loadchair2();
      }
    })

  }


  Update(dine: IDine) {
    //alert(basetype._id);
    this.dineExists = "false";
    console.log(this.dinedata);
    for (let i = 0; i < this.dinedata.length; i++) {
      if (this.dinedata[i].name == dine.name && this.dinedata[i].floor_id == dine.floor_id) {
        this.args="Already Exists: " + this.dinedata[i].name;
        this.dineExists = "true";
        break;
      }
    }
    if (this.dineExists == "false") {
    this.service.update(dine).subscribe(res => {
      if (res) {
        //this.search(id);

        // this.args=null;
        this.args = "Successfully Updated..." + dine.name;
        //  alert("Successfully Updated BaseType..."+basetype.Basetypename);
        // this.loadbasetype();
        this.loaddine();
      }
    })
  }
  }
  cDelete(_id: any) {
    //this.loadbasetype();
    this.loaddine();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  onFormEdit() {
    if (this.myEditForm.valid) {
      // console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
      this.Update(this.myEditForm.value);
    }
  }


  //show addbasetype
  show: any = false;
  showEdit: any = false;
  shows() {
    this.classname = "";
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  close() {
    //alert(arg0)showQr
    if (this.showQr == true) {
      this.showQr = false;
    }
    if (this.showEdit == true) {
      this.showEdit = false;
    }
    if (this.show == true) {
      this.show = false;
    }

  }
  handleChildClick() {
    this.display = "display:none;";
  }
  deletedConfirmed(id: any) {
    alert(id)
    console.log(this.IChairdata);
    console.log(id);
    alert(this.IChairdata.length);
    for (let i = 0; i < this.IChairdata.length; i++) {
      if (this.IChairdata[i].table_id == id) {
        alert(this.IChairdata[i]._id);

        this.chairService.delete(this.IChairdata[i]._id).subscribe(deleteChair => {
          alert("Chair deleted");
        })
      }
    }

    this.service.delete(id).subscribe(res => {
      if (res) {
        this.display = "display:none;";
        this.loaddine();
        this.args = " Record Deleted Successfully ";

      }
    })
  }




}