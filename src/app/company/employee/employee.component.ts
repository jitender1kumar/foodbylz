import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
//import { basetyperowData } from './basetype.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PopupmodelComponent } from '../../popupmodel/popupmodel.component';
import { EmployeeService } from '../../core/Services/employee.service';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.css',
    standalone: false
})
@Injectable({ providedIn: 'root' })
export class EmployeeComponent implements OnInit, ICellRendererAngularComp {
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
  content: any;
  classname: any;
  style: any;
  modal: any;
  display: any;
  id01: any;
  valueid: any;
  tablename: any;
  myAddForm: FormGroup;
  employeedata2_core:any ;
  employeedata_core:any;
 
  agInit(params: ICellRendererParams): void {
    this.id = params.data._id;
    //this.rowData= params.api.refreshClientSideRowModel;
    // console.log(params);

  }
  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.
  //lodbastype: basetyperowData[] = [];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [200, 500, 1000];

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "desc", flex: 2 },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  employee: Employee = {
    name: "undefined",
    role: "undefined",
    type: "undefined",
    status: false,
    managepermission: false,
    title: "undefined",
    desc: "undefined",
    userId: "undefined",
    password: "undefined",
    employee_id: "undefined"
  }
 
  employeenamedata: any;
  employeenamedata2: any
  employeedata2: any;
  employeedata: any;
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  constructor(private service:EmployeeService, private router: Router, private formedit: FormBuilder) {
this.display="display:none;"
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name: ['',],
      role: ['',],
      type: ['',],
      status: [false,],
      managepermission: [false,],
      title: ['',],
      desc: ['',]
    });
    this.myAddForm = this.formedit.group({
      name: ['',],
      role: ['',],
      type: ['',],
      status: [false,],
      managepermission: [false,],
      title: ['',],
      desc: ['',]
    });
    this.loademployee();

  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = event.data._id;
      this.tablename = "base";
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
      this.popdata2 = event.data;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name],
      role: [event.data.role],
      type: [event.data.type],
      status: [event.data.status],
      managepermission: [event.data.managepermission],
      title: [event.data.title],
      desc: [event.data.desc]
      });

    }
    this.loademployee();
  }

  ngOnInit(): void {
    //this.loademployeefromcore();
    this.loademployee();
    this.classname = "";
  }
 
  add(employee: Employee): void {

    this.service.add(employee).subscribe(res => {
      if (res) {
        // console.log(data);
        //this.search(id);
        this.args = "Record Added succefully..." + employee.name;
        // alert("Basetype inserted succefully.");
        this.loademployee()
      }
    })

  }
 
  // loademployeefromcore() {
  //   this.service.getfromcore().subscribe(data => {
  //     if (data) {
  //       this.employeedata2_core = data;
  //       this.employeedata_core = this.employeedata2_core.allTasks;
  //       console.log(this.employeedata_core);
  //       console.log(data);
  //     }
  //   })
  // }

  loademployee() {
    this.service.get().subscribe(data => {
      if (data) {
        this.employeedata2 = data;
        this.employeedata = this.employeedata2.allTasks;
      //  console.log();
      }
    })

  }

  Update(employee: Employee) {
    //alert(basetype._id);
    this.service.update(employee).subscribe(res => {
      if (res) {
        //this.search(id);

        // this.args=null;
        this.args = "Successfully Updated..." + employee.name;
        //  alert("Successfully Updated BaseType..."+basetype.Basetypename);
        this.loademployee();

      }
    })
  }
  cDelete(_id: any) {
    this.loademployee();
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


        this.service.delete(id).subscribe(res => {
          if (res) {
            this.display = "display:none;";
            this.loademployee();
            this.args = " Record Deleted Successfully ";
          }
        })
    

      }
}




