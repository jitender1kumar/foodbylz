import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CompanyProfile } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
//import { basetyperowData } from './basetype.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { PopupmodelComponent } from '../../popupmodel/popupmodel.component';
import { EmployeeService } from '../../core/Services/employee.service';
import { CompanyProfileService } from '../../core/Services/companyprofile.service';

@Component({
    selector: 'app-companyprofile',
    templateUrl: './companyprofile.component.html',
    styleUrl: './companyprofile.component.css',
    standalone: false
})
@Injectable({ providedIn: 'root' })
export class CompanyprofileComponent  implements OnInit, ICellRendererAngularComp {
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
    { field: "tilte" },
    { field: "desc" },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }

  ];
  companyprofile: CompanyProfile = {
    name: "undefined",
    tilte: "undefined",
    desc: "undefined",
    GSTNumber: "undefined",
    turnover: "undefined",
    address: "undefined",
    mobilenumber: "undefined",
    mobilenumber2: "undefined",
    customercarenumber: "undefined",
    maplocation1: "undefined",
    maplocation2: "undefined",
    telephonenumber: "undefined",
    companyId: "undefined",
    companyphoto: "undefined",
    websitelink: "undefined",
    logo: "undefined",
    employee_id: "undefined"
  }
 
  companyprofiledata2: any;
  companyprofiledata: any;
  
  static myGlobalVariable: any;
  exampleModal: any;
  qname = "";
  constructor(private service:CompanyProfileService, private router: Router, private formedit: FormBuilder) {
this.display="display:none;"
    this.args = null;
    this.myEditForm = this.formedit.group({
      _id: [''],
      name:[''],
            tilte: [''],
             desc: [''],
             GSTNumber:[''],
              turnover: [''],
              address:  [''],
              mobilenumber: [''],
              mobilenumber2: [''],
              customercarenumber:[''],
              maplocation1: [''],
              maplocation2: [''],
              telephonenumber: [''],
              companyId: [''],
              companyphoto: [''],
              websitelink:  [''],
              logo:[''],
     
    });
    this.myAddForm = this.formedit.group({
      name:[''],
            tilte: [''],
             desc: [''],
             GSTNumber:[''],
              turnover: [''],
              address:  [''],
              mobilenumber: [''],
              mobilenumber2: [''],
              customercarenumber:[''],
              maplocation1: [''],
              maplocation2: [''],
              telephonenumber: [''],
              companyId: [''],
              companyphoto: [''],
              websitelink:  [''],
              logo:[''],
     
    });
    this.loadcompanyprofile();

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
        name:[event.data.name],
        tilte: [event.data.tilte],
         desc: [event.data.desc],
         GSTNumber:[event.data.GSTNumber],
          turnover: [event.data.turnover],
          address:  [event.data.address],
          mobilenumber: [event.data.mobilenumber],
          mobilenumber2: [event.data.mobilenumber2],
          customercarenumber:[event.data.customercarenumber],
          maplocation1: [event.data.maplocation1],
          maplocation2: [event.data.maplocation2],
          telephonenumber: [event.data.telephonenumber],
          companyId: [event.data.companyId],
          companyphoto: [event.data.companyphoto],
          websitelink:  [event.data.websitelink],
          logo:[event.data.logo],
 
      });

    }
    this.loadcompanyprofile();
  }

  ngOnInit(): void {
    this.loadcompanyprofile();
    this.classname = "";
  }
 
  add(companyprofile: CompanyProfile): void {

    this.service.add(companyprofile).subscribe(res => {
      if (res) {
        // console.log(data);
        //this.search(id);
        this.args = "Record Added succefully..." + companyprofile.name;
        // alert("Basetype inserted succefully.");
        this.loadcompanyprofile()
      }
    })

  }

  loadcompanyprofile() {
    this.service.get().subscribe(data => {
      if (data) {
        this.companyprofiledata2 = data;
        this.companyprofiledata = this.companyprofiledata2.allTasks;
        
      }
    })

  }

  Update(companyprofile: CompanyProfile) {
    //alert(basetype._id);
    this.service.update(companyprofile).subscribe(res => {
      if (res) {
        //this.search(id);

        // this.args=null;
        this.args = "Successfully Updated..." + companyprofile.name;
        //  alert("Successfully Updated BaseType..."+basetype.Basetypename);
        this.loadcompanyprofile();

      }
    })
  }
  cDelete(_id: any) {
    this.loadcompanyprofile();
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
            this.loadcompanyprofile();
            this.args = " Record Deleted Successfully ";
          }
        })
    

      }
}

