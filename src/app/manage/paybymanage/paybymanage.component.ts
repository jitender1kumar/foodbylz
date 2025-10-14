
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paybymanage } from '../../core/Model/crud.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { BasetypEditButtun } from '../../commanComponent/editbutton/editbuttoncomponent';
import { BasetypDeleteButtun } from '../../commanComponent/deletebutton/deletbasetypebutton';
import { PaybyService } from '../../core/Services/paybymanage.service';
import { Validationenvironment } from '../../environment/validtionEnvironment';
import { popupenvironment } from '../../environment/popupEnvironment';
import { ManageDataEnvironment } from '../../environment/dataEnvironment';
import { ValidationService } from '../../core/commanFunction/Validation.service';

@Component({
  selector: 'app-paybymanage',
  templateUrl: './paybymanage.component.html',
  styleUrl: './paybymanage.component.css',
  standalone: false
})


@Injectable({ providedIn: 'root' })
export class PaybymanageComponent implements OnInit {

  myEditForm: FormGroup;
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 200, 500, 1000];
  @ViewChild('f')
  categoryViewchild!: NgForm;
  @ViewChild('formupdate')
  formupdate!: NgForm;


  pyabymanage: Paybymanage = {
    name: 'undefined',
    desc: 'undefined'
  };
  colDefs: ColDef[] = [
    { field: "name" },
    { field: "desc", flex: 2 },
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
    // if (valid.value) {
    //   this.popupenvironments.args$.next("Payby Exists: " + paybymanage.name);
    // }
    // else {

    //   this.service.add(paybymanage).subscribe(res => {
    //     if (res) {
    //       this.popupenvironments.args$.next("Successfully Added ..." + paybymanage.name);
    //       this.loadpayby();

    //     }
    //   })
    // }
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
  onCellClick(event: any) {

    if (event.colDef.field == 'Delete') {
      this.popupenvironments.modal$.next("modal");
      this.popupenvironments.display$.next("display:block;");
      this.popupenvironments.valueid$.next(event.data._id);
      this.popupenvironments.tablename$.next("cate");
    }
    if (event.colDef.field == 'Edit') {
      this.popupenvironments.popdata2$.next(event.data);
      this.popupenvironments.showEdit$.next(true);
      this.popupenvironments.show$.next(false);
      this.popupenvironments.args$.next(null);


      this.myEditForm = this.formedit.group({
        _id: [event.data._id],
        name: [event.data.name, Validators.required],
        desc: [event.data.desc]

      });
    }
  }

  loadpayby() {
    this.service.get().subscribe(data => {
      if (data) {
        this.ManageDataEnvironments.Payby2$.next(data);
        this.ManageDataEnvironments.Payby$.next(this.ManageDataEnvironments.Payby2$?.value.data);
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

