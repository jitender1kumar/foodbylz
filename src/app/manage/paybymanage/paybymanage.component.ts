
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paybymanage } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { PaybyService } from '../../core/Services/paybymanage.service';
import { Validationenvironment } from '../../environment/validtionEnvironment';
import { popupenvironment } from '../../environment/popupEnvironment';
import { ManageDataEnvironment } from '../../environment/dataEnvironment';
import { ValidationService } from '../../core/commanFunction/Validation.service';
import { ColumnDef } from '../../core/shared/dynamicTable/gird-table/gird-table.component';

@Component({
  selector: 'app-paybymanage',
  templateUrl: './paybymanage.component.html',
  styleUrl: './paybymanage.component.css',
  standalone: false
})


@Injectable({ providedIn: 'root' })
export class PaybymanageComponent implements OnInit {

  myEditForm: FormGroup;
  
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;


  pyabymanage: Paybymanage = {
    name: 'undefined',
    desc: 'undefined'
  };

  colDefs: ColumnDef[] = [
    { field: "name", sortable: true },
    { field: "desc", sortable: true },
    { field: "Delete", cellRenderer: BasetypDeleteButtun },
    { field: "Edit", cellRenderer: BasetypEditButtun }
  ];

  


  myAddForm: FormGroup;
  ManageDataEnvironments: any;
  Validationenvironments: any;
  popupenvironments: any;
  constructor(private service: PaybyService, private ValidationService_: ValidationService, private router: Router, private formedit: FormBuilder) {
    this.ManageDataEnvironments = ManageDataEnvironment;
    this.Validationenvironments = Validationenvironment;
    this.popupenvironments = popupenvironment;
    this.popupenvironments.display$.next("display:none;");
    this.myEditForm = this.formedit.group({

      name: ['', Validators.required],
      desc: ['']
    });
    this.myAddForm = this.formedit.group({
      name: ['', Validators.required],
      desc: ['']
    });
  }
  ngOnInit(): void {
    this.loadpayby();
  }

  add(paybymanage: Paybymanage): void {
    this.loadpayby();
    console.log(this.ManageDataEnvironments.Payby$);
    const valid = this.ValidationService_.subjectBehaviorCheckName(this.myAddForm.value.name, this.ManageDataEnvironments.Payby$.value);
    console.log(valid);
    if(valid==undefined){this.addPayBy(paybymanage);}
    else{
     if(valid.value){
      this.popupenvironments.args$.next("Payby Exists: " + paybymanage.name);
      console.log(valid.value);
     }
    else {console.log(valid.value);
      this.addPayBy(paybymanage);}
    }
  
  }
  addPayBy(paybymanage: Paybymanage)
  {
   this.service.add(paybymanage).subscribe(res => {
        if (res) {
          this.popupenvironments.args$.next("Successfully Added ..." + paybymanage.name);
          this.loadpayby();

        }
      })
  }
  onRowClick(r: any) { console.log('clicked row', r);
    // console.log(this.colDefs);
    if (r[0].field == 'Delete') {
      // this.deleteDisplayBlock(r[0].row);
      this.popupenvironments.modal$.next("modal");
      this.popupenvironments.display$.next("display:block;");
      this.popupenvironments.valueid$.next(r[0].row._id);
      this.popupenvironments.tablename$.next("cate");
    }
    if (r[0].field == 'Edit') {
      //this.editDisplayBlock(r[0].row);
      this.popupenvironments.popdata2$.next(r[0].row);
      this.popupenvironments.showEdit$.next(true);
      this.popupenvironments.show$.next(false);
      this.popupenvironments.args$.next(null);


      this.myEditForm = this.formedit.group({
        _id: [r[0].row._id],
        name: [r[0].row.name, Validators.required],
        desc: [r[0].row.desc]

      });
    }
   }
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
     
    }
    if (event.colDef.field == 'Edit') {
     
    }
  }
  PayByData:any;
  loadpayby() {
    this.service.get().subscribe(data => {
      if (data) {
        this.ManageDataEnvironments.Payby2$.next(data);
        this.ManageDataEnvironments.Payby$.next(this.ManageDataEnvironments.Payby2$?.value.data);
        this.PayByData=this.ManageDataEnvironments.Payby2$?.value.data;
       }
    })
  }
  Update(paybymanage: Paybymanage) {
    const valid = this.ValidationService_.subjectBehaviorCheckNameEdit(this.myEditForm.value.name, this.myEditForm.value._id, this.ManageDataEnvironments.Payby$.value);
    if (valid.value) {
      this.popupenvironments.args$.next("Payby Exists: " + paybymanage.name);
    }
    else {
      this.service.update(paybymanage).subscribe(res => {
        if (res) {
           this.popupenvironments.args$.next("Successfully Updated ..." + paybymanage.name);
          this.loadpayby();

        }
      })
    }
  }
  cDelete(_id: any) {

  }
  onFormSubmit() {
    if (this.myAddForm.valid) {
      this.add(this.myAddForm.value);
    }

  }

  shows() {

    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(true);
    this.popupenvironments.args$.next(null);

  }
  onEditForm() {
    if (this.myEditForm.valid) {
      this.Update(this.myEditForm.value);
    }
  }
  close() {
    //alert(arg0)
    this.popupenvironments.showEdit$.next(false);
    this.popupenvironments.show$.next(false);

  }
  handleChildClick() {
    this.popupenvironments.display$.next("display:none;");

  }
  deletedConfirmed(id: any) {
    this.service.delete(id).subscribe(data => {
      if (data) {
        this.loadpayby();
        this.popupenvironments.display$.next("display:none;");
        this.popupenvironments.args$.next(" Record Deleted Successfully ");
      }
    })
  }
}

