import { OnInit } from '@angular/core';
import { PopupCrudService } from './popup-crud.service';
import * as i0 from "@angular/core";
export declare class PopupCrudComponent implements OnInit {
    private popupedit;
    constructor(popupedit: PopupCrudService);
    ngOnInit(): void;
    alertfun(args: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopupCrudComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopupCrudComponent, "lib-popup-cruds", never, {}, {}, never, never, true, never>;
}
