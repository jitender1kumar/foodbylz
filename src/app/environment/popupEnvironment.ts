import { BehaviorSubject } from "rxjs";


export const popupenvironment = {
    show$: new BehaviorSubject<boolean>(false),
    showEdit$: new BehaviorSubject<boolean>(false),
    display$: new BehaviorSubject<string>('display:none;'),
    modal$: new BehaviorSubject<string>(''),
    args$: new BehaviorSubject<string | null>(null),
    valueid$ :new BehaviorSubject<any>(null),
tablename$ :new BehaviorSubject<string>(''),
popdata2$ :new BehaviorSubject<any>(null)
};

 