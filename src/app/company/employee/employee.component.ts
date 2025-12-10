import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
//import { basetyperowData } from './basetype.model';
import { EmployeeService } from '../../core/Services/employee.service';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrl: './employee.component.css',
    standalone: false
})
@Injectable({ providedIn: 'root' })
export class EmployeeComponent implements OnInit {
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
 
 
  
  colDefs: ColumnDef[] = [
    { field: "name",sortable:true },
    { field: "desc",sortable:true},
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
 
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      this.modal = "modal";
      this.display = "display:block;"
      this.valueid = r[0].row._id;
      this.tablename = "base";
    }
    if (r[0].field == 'Edit') {
      this.popdata2 = r[0].row;
      this.showEdit = true;
      this.show = false;
      this.args = null;
      this.myEditForm = this.formedit.group({
        _id: [r[0].row._id],
        name: [r[0].row.name],
      role: [r[0].row.role],
      type: [r[0].row.type],
      status: [r[0].row.status],
      managepermission: [r[0].row.managepermission],
      title: [r[0].row.title],
      desc: [r[0].row.desc]
      });
    }
    // this.loademployee();
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

  loademployee() {
    this.service.get().subscribe(data => {
      if (data) {
        this.employeedata2 = data;
        this.employeedata = this.employeedata2.data;
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




