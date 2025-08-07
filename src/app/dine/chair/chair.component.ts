import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { QuantitytypeService } from '../../core/Services/quantitytype.service';
import { Router } from '@angular/router';
import { IChair, IChairMergeDineName } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ChairService } from '../../core/Services/chair.service';
import { DineService } from '../../core/Services/dine.service';
import { FloorService } from '../../core/Services/floor.service';

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrl: './chair.component.css',
  standalone: false
})
@Injectable({ providedIn: 'root' })
export class ChairComponent implements OnInit, ICellRendererAngularComp {
  args: any = null;
  myEditForm: FormGroup;
  qid: any;
  id: any; basedata: any;
  popdata2: any;
  popdataId: any;
  popdataBasetypedesc: any;
  popdataBasetypeName: any;
  popdataQuntityId: any;
  src: any;
  alt: any;
  Floordata2: any;
  Floordata: any;
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
  dinedata2: any;
  dinedata: any;
  dinenamearr: IChairMergeDineName[] = [];
  dinename: any[] = [];
  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
  }

  // Column Definitions: Defines the columns to be displayed.
  chairrow: IChair[] = [];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [50, 500, 1000];


  colDefs: ColDef[] = [
    { field: "FloorName" },
    { field: "DineTable" },
    { field: "name" },
    { field: "description", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  chair: IChair = {
    _id: "",
    name: "",
    description: '',
    status: true,
    table_id: '',
    chairorderstatus: '1'
  }

  IChairnamedata: any;
  IChairnamedata2: any
  IChairdata2: any;
  IChairdata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  constructor(private service: ChairService, private floorservice: FloorService, private QuantitytypeService_: QuantitytypeService, private router: Router, private formedit: FormBuilder, private dineservice: DineService) {
    this.display = "display:none;"
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      status: [true],
      table_id: [''],
      chairorderstatus: ['1']
    });
    this.myAddForm = this.formedit.group({

      name: ['', Validators.required],
      description: [''],
      status: [true],
      table_id: [''],
      chairorderstatus: ['1']
    });
    //  this.loadbasetype();

  }
  ngOnInit(): void {

    this.classname = "";
    this.loadfloor();
    this.loadChairs();

  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }
  loadchair() {
    //alert(selectcategoryID);
    this.service.getbyid(this.myAddForm.value._id).subscribe(data => {
      if (data) {
        this.IChairdata2 = data;
        this.IChairdata = this.IChairdata2.allTasks

      }
    })
  }
  loaddinename() {

    for (var ii = 0; ii < this.IChairdata.length; ii++) {
      this.dinenamearr.push({
        _id: this.IChairdata[ii]._id,
        DineTable: this.getdinename(this.IChairdata[ii].table_id),
        name: this.IChairdata[ii].name,
        description: this.IChairdata[ii].description,
        table_id: this.IChairdata[ii].table_id,
        status: this.IChairdata[ii].status,
        FloorName: this.getFloorName(this.IChairdata[ii].table_id)

      })
    }
    this.dinename = this.dinenamearr;

  }
  getFloorName(Tableid: string) {
    const itemDine = this.dinedata.find((item: { _id: string; }) => item._id === Tableid);
    const indexDine = this.dinedata.findIndex((item: { _id: string; }) => item._id === Tableid);

    if (itemDine?._id) {

      const itemP = this.Floordata.find((item: { _id: string; }) => item._id === this.dinedata[indexDine].floor_id);
      const indexP = this.Floordata.findIndex((item: { _id: string; }) => item._id === this.dinedata[indexDine].floor_id);
      //console.log()
      if (itemP?._id) {
        return this.Floordata[indexP].name;

      }
    }


  }
  getdinename(id: string) {
    const itemP = this.dinedata.find((item: { _id: string; }) => item._id === id);
    const indexP = this.dinedata.findIndex((item: { _id: string; }) => item._id === id);
    console.log()
    if (itemP._id) {
      return this.dinedata[indexP].name;

    }

  }
  loadDine() {
    //alert(selectcategoryID);
    this.dineservice.get().subscribe(data => {
      if (data) {
        this.dinedata2 = data;
        this.dinedata = this.dinedata2.allTasks

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
  loadChairs() {
    //alert(selectcategoryID);
    this.loadDine();
    this.service.get().subscribe(data => {
      if (data) {
        this.IChairdata2 = data;
        this.IChairdata = this.IChairdata2.allTasks
        this.loaddinename();
      }
    })
  }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;
      this.tablename = "dine";
      // alert(this.valueid);
      //    if(PopupmodelComponent.delete==true)
      //    {
      // this.service.delete(event.data._id).subscribe(res => {
      //   alert("Successfully Delete BaseType...");
      //     // this.args="Successfully Deleted "+event.data.Basetypename;
      //    })
      //    }


    }
    if (event.colDef.field == 'Edit') {
      this.loadDine();
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        description: [event.data.description],
        status: [event.data.status, [Validators.required]],
        table_id: [event.data.table_id, [Validators.required]],
        chairorderstatus: [event.data.chairorderstatus, [Validators.required]]
      });

    }
    this.loadChairs();
  }



  add(chair: IChair): void {

    this.service.add(chair).subscribe(res => {
      if (res) {
        // console.log(data);
        //this.search(id);
        this.args = "Record Added succefully..." + chair.name;
        // alert("Basetype inserted succefully.");
        // this.loadbasetype()
        
      }
    })
this.loadChairs();
  }



  Update(chair: IChair) {
    //alert(basetype._id);
    this.service.update(chair).subscribe(res => {
      if (res) {
        //this.search(id);

        // this.args=null;
        this.args = "Successfully Updated..." + chair.name;
        //  alert("Successfully Updated BaseType..."+basetype.Basetypename);
        // this.loadbasetype();
        this.loadChairs();
      }
    })
  }
  cDelete(_id: any) {
    //this.loadbasetype();
    this.loadChairs();
  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }
  }
  onFormEdit() {
    if (this.myEditForm.valid) {
      console.log(this.myEditForm.value);
      // alert(this.myEditForm.value);
      this.Update(this.myEditForm.value);
    }
  }


  //show addbasetype
  show: any = false;
  showEdit: any = false;
  shows() {
    this.loadDine();
    this.classname = "";
    this.show = true;
    this.showEdit = false;
    this.args = null;
  }
  close() {
    //alert(arg0)
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
    if (this.NotDeleteIfChairIsOne(id)) {
      this.service.delete(id).subscribe(res => {
        if (res) {
          this.display = "display:none;";
          
          this.args = " Record Deleted Successfully ";
          alert("deleted");
        }
      })
    }
    else {
      this.display = "display:none;";
      alert("can't delete");
    }
    this.loadChairs();
  }

  NotDeleteIfChairIsOne(id: string) {

    let QuantityOfChair = 0;
    const itemChair = this.dinename.find((item: { _id: string; }) => item._id === id);
    const indexChair = this.dinename.findIndex((item: { _id: string; }) => item._id === id);
    console.log(itemChair);
    if (itemChair?._id) {

      for (let i = 0; i < this.IChairdata.length; i++) {
        if (this.IChairdata[i].table_id === itemChair.table_id) {
          QuantityOfChair = QuantityOfChair + 1;
        }
      }
      if (QuantityOfChair > 1) {

        return true;
      }
      else {
        return false;
      }
    }
    else
    {
      return false;
    }
  }


}