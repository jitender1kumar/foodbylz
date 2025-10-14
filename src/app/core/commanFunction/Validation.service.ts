import { Injectable } from '@angular/core';
import { Validationenvironment } from '../../environment/validtionEnvironment';

@Injectable({
  providedIn: 'root',

})
export class ValidationService {
  NameExistOrNot = false;
  Validationenvironments: any
  MobileNoExist:any;
  checkNameExistforAddForm(checkName: string, Data$: any) {
    try {
      this.Validationenvironments = Validationenvironment;
      console.log(checkName);
      console.log(Data$);
      Data$.subscribe((data: any) => {
        console.log(data.length);

        // console.log(Data$.state.length);
        if (data.length == 0) {
          this.Validationenvironments.nameExists$.next(false);
          return this.Validationenvironments.nameExists$;
        }
        else {
          // console.log(Data$.value.length);

          this.Validationenvironments.nameExists$.next(false);
          Data$?.subscribe((getName: any[]) => {
            const NameExist = getName.find((item: { name: string; }) => item.name === checkName);
            console.log(getName);
            if (NameExist) {
              //console.log("if"+NameExist);
              console.log(NameExist);
              this.Validationenvironments.nameExists$.next(true);
              return this.Validationenvironments.nameExists$;
              // return this.NameExistOrNot = true;
            }
            else {
              //  alert("else"+NameExist);
              console.log(NameExist);
              this.Validationenvironments.nameExists$.next(false);
              return this.Validationenvironments.nameExists$;
              // return this.NameExistOrNot = false;
            }
          });
        }
      }
      );
    }

    catch (error) {
      console.log(error);
    }
    return this.Validationenvironments.nameExists$;
  }
  subjectBehaviorCheckName(checkName: string, Data$: any) {
    try {
      this.Validationenvironments = Validationenvironment;
      this.Validationenvironments.nameExists$.next(false);
      console.log(Data$.length);
      console.log(Data$);
      if (Data$) {
        if (Data$.length == 0) { return this.Validationenvironments.nameExists$.next(false); }
        else
          if (Data$.length > 0) {
            const NameExists = Data$.find((item: { name: string; }) => item.name === checkName);
            if (NameExists) {
              console.log(NameExists);
              this.Validationenvironments.nameExists$.next(true);
              return this.Validationenvironments.nameExists$;
            }
            else {
              console.log(NameExists);
              this.Validationenvironments.nameExists$.next(false);
              return this.Validationenvironments.nameExists$;
            }
          }
      }
      else { return this.Validationenvironments.nameExists$.next(false); }

    }
    catch (error) {
      console.log(error);
    }
    return this.Validationenvironments.nameExists$;
  }

  subjectBehaviorCheckNameEdit(name: string, _id: string, Data$: any) {
    //const
    this.Validationenvironments = Validationenvironment;
    this.Validationenvironments.nameExists$.next(false);
    const NameExist = Data$.find((item: { name: string; _id: string }) => item.name === name && item._id != _id);
    if (NameExist) {
      //console.log("if"+NameExist);
      console.log(NameExist);
      this.Validationenvironments.nameExists$.next(true);
      return this.Validationenvironments.nameExists$
    }
    else {
      //  alert("else"+NameExist);
      console.log(NameExist);
      this.Validationenvironments.nameExists$.next(false);
      return this.Validationenvironments.nameExists$
    }
  }

  checkNameExistforProductAddForm(checkName: string, Data$: any) {
    this.Validationenvironments = Validationenvironment;
    this.Validationenvironments.nameExists$.next(false);
    Data$?.subscribe((getName: any[]) => {
      const NameExist = getName.find((item: { Productname: string; }) => item.Productname === checkName);
      if (NameExist) {
        //console.log("if"+NameExist);
        console.log(NameExist);
        return this.Validationenvironments.nameExists$.next(true);
        // return this.NameExistOrNot = true;
      }
      else {
        //  alert("else"+NameExist);
        console.log(NameExist);
        return this.Validationenvironments.nameExists$.next(false);
        // return this.NameExistOrNot = false;
      }
    });

    return this.Validationenvironments.nameExists$;
  }
  // check name for update function
  checkNameExist(name: string, _id: string, Data$: any) {
    this.Validationenvironments = Validationenvironment;
    this.Validationenvironments.nameExists$.next(false);
    console.log(name);
    Data$?.subscribe((getName: any[]) => {
      const NameExist = getName.find((item: { name: string; _id: string }) => item.name === name && item._id != _id);
      if (NameExist) {
        //console.log("if"+NameExist);
        console.log(NameExist);
        this.Validationenvironments.nameExists$.next(true);
        return this.Validationenvironments.nameExists$
      }
      else {
        //  alert("else"+NameExist);
        console.log(NameExist);
        this.Validationenvironments.nameExists$.next(false);
        return this.Validationenvironments.nameExists$
      }
    });
    return this.Validationenvironments.nameExists$;
  }
  checkAnotherMobileNumberExist(MobileNo: string, _id: string, Data$: any) {
    this.Validationenvironments = Validationenvironment;
    this.Validationenvironments.MobileNoExist$.next(false);
    console.log(MobileNo);
    Data$?.subscribe((getMobile: any[]) => {
    console.log(getMobile);
    console.log(_id);
       const mobileNoExists = getMobile.some(item => item.MobileNo === MobileNo && item._id !== _id);
       console.log('Mobile number exists:', mobileNoExists);
       this.Validationenvironments.MobileNoExist$.next(mobileNoExists);
       return this.Validationenvironments.MobileNoExist$;
    });
    return this.Validationenvironments.MobileNoExist$;
  }
  checkNameExist2(name: string, _id: string, Data: any) {
    this.Validationenvironments = Validationenvironment;
    this.Validationenvironments.nameExists$.next(false);
    //console.log(name);
    //Data$?.subscribe((getName: any[]) => {
    const NameExist = Data.find((item: { name: string; _id: string }) => item.name === name && item._id != _id);
    if (NameExist) {
      //console.log("if"+NameExist);
      console.log(NameExist);
      this.Validationenvironments.nameExists$.next(true);
      return this.Validationenvironments.nameExists$
    }
    else {
      //  alert("else"+NameExist);
      console.log(NameExist);
      this.Validationenvironments.nameExists$.next(false);
      return this.Validationenvironments.nameExists$
    }

    // return this.Validationenvironments.nameExists$;
  }
  checkChairNameExist(checkName: string, Chair: any, Table: any, Floor: any) {
    // this.Validationenvironments = Validationenvironment;
    // Chair?.subscribe((getName: any[])=>{
    const ChairNameExist = Chair.find((chair: { name: string; }) => chair.name === checkName);
    const ChairNameExistIndex = Chair.findIndex((chair: { name: string; }) => chair.name === checkName);

    if (ChairNameExist) {
      //console.log("if"+NameExist);
      console.log(ChairNameExist);
      const TableExist = Table.find((table: { _id: string; }) => table._id === ChairNameExist[ChairNameExistIndex].table_id);
      const TableIndex = Table.findIndex((table: { _id: string; }) => table._id === ChairNameExist[ChairNameExistIndex].table_id);
      //  return this.InventoryNameExist= true;
      if (TableExist) {
        const FloorExist = Floor.find((floor: { _id: string; }) => floor._id === TableExist[TableIndex].floor_id);
        const FloorIndex = Floor.findIndex((floor: { _id: string; }) => floor._id === TableExist[TableIndex].floor_id);
        if (FloorExist) {
          return this.NameExistOrNot = true;
        }
        else {
          return this.NameExistOrNot = false;
        }

      }
      else {
        return this.NameExistOrNot = false;
      }
    }
    else {
      //  alert("else"+NameExist);
      console.log(ChairNameExist);
      return this.NameExistOrNot = false;
    }

    // });
    return this.NameExistOrNot;
  }
}