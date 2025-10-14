import { BehaviorSubject } from "rxjs";


export const Validationenvironment = {
    nameExists$:new  BehaviorSubject<boolean>(false),
    MobileNoExist$:new  BehaviorSubject<boolean>(false),
    ReturnName$ :new BehaviorSubject<any>(null)
};

 //     show$: new BehaviorSubject<boolean>(false),
//     showEdit$: new BehaviorSubject<boolean>(false),
//     display$: new BehaviorSubject<string>('display:none;'),
//     modal$: new BehaviorSubject<string>(''),
//     args$: new BehaviorSubject<string | null>(null),
//     valueid$ :new BehaviorSubject<any>(null),
// tablename$ :new BehaviorSubject<string>(''),
// popdata2$ :new BehaviorSubject<any>(null)