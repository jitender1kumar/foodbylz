import { BehaviorSubject } from "rxjs";


export const ManageDataEnvironment = {
    Category$ :new BehaviorSubject<any>(null),
    Category2$ :new BehaviorSubject<any>(null),
    QuantityType$ :new BehaviorSubject<any>(null),
    QuantityType2$ :new BehaviorSubject<any>(null),
    Product$ :new BehaviorSubject<any>(null),
    Product2$ :new BehaviorSubject<any>(null),
    Payby$ :new BehaviorSubject<any>(null),
    Payby2$ :new BehaviorSubject<any>(null),
};

 //     show$: new BehaviorSubject<boolean>(false),
//     showEdit$: new BehaviorSubject<boolean>(false),
//     display$: new BehaviorSubject<string>('display:none;'),
//     modal$: new BehaviorSubject<string>(''),
//     args$: new BehaviorSubject<string | null>(null),
//     valueid$ :new BehaviorSubject<any>(null),
// tablename$ :new BehaviorSubject<string>(''),
// popdata2$ :new BehaviorSubject<any>(null)