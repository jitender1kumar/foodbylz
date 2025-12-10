import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CompanyProfile } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
//import { basetyperowData } from './basetype.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CompanyProfileService } from '../../core/Services/companyprofile.service';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';

@Component({
    selector: 'app-companyprofile',
    templateUrl: './companyprofile.component.html',
    styleUrl: './companyprofile.component.css',
    standalone: false
})
@Injectable({ providedIn: 'root' })
export class CompanyprofileComponent  implements OnInit {
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
  
  //static rowData:any;
  // Column Definitions: Defines the columns to be displayed.
  //lodbastype: basetyperowData[] = [];
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10,200, 500, 1000];

  colDefs: ColumnDef[] = [
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
        name:[r[0].row.name],
        tilte: [r[0].row.tilte],
         desc: [r[0].row.desc],
         GSTNumber:[r[0].row.GSTNumber],
          turnover: [r[0].row.turnover],
          address:  [r[0].row.address],
          mobilenumber: [r[0].row.mobilenumber],
          mobilenumber2: [r[0].row.mobilenumber2],
          customercarenumber:[r[0].row.customercarenumber],
          maplocation1: [r[0].row.maplocation1],
          maplocation2: [r[0].row.maplocation2],
          telephonenumber: [r[0].row.telephonenumber],
          companyId: [r[0].row.companyId],
          companyphoto: [r[0].row.companyphoto],
          websitelink:  [r[0].row.websitelink],
          logo:[r[0].row.logo],
 
      });

    }
    // this.loadcompanyprofile();
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
        this.companyprofiledata = this.companyprofiledata2.data;
        
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

