import * as i0 from '@angular/core';
import { Injectable, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

class PopupCrudService {
    constructor() { }
    editpopup(data) {
        this.returndata = data;
        alert("library work" + data);
    }
    getdata() {
        return this.returndata;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PopupCrudService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PopupCrudService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PopupCrudService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

//import { QuantitytypeService } from '../../../../Services/quantitytype.service';
//import { environment } from '../../../../../foodbilling/src/environment/environment';
class PopupCrudComponent {
    //data:any;
    constructor(popupedit) {
        this.popupedit = popupedit;
        //  alert("working library");
        // this.data = this.popupedit.getdata();
    }
    // @Input()args:any=null;
    ngOnInit() {
    }
    alertfun(args) {
        //this.args=args;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PopupCrudComponent, deps: [{ token: PopupCrudService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.3.12", type: PopupCrudComponent, isStandalone: true, selector: "lib-popup-cruds", ngImport: i0, template: `
		<div class="content">
      <!-- <h6>{{args}}</h6>  -->
		</div>

  `, isInline: true, styles: ["body{font-family:Arial,sans-serif;background:url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat;background-size:cover;height:100vh}\n"], dependencies: [{ kind: "ngmodule", type: BrowserModule }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PopupCrudComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-popup-cruds', standalone: true, imports: [BrowserModule], template: `
		<div class="content">
      <!-- <h6>{{args}}</h6>  -->
		</div>

  `, styles: ["body{font-family:Arial,sans-serif;background:url(http://www.shukatsu-note.com/wp-content/uploads/2014/12/computer-564136_1280.jpg) no-repeat;background-size:cover;height:100vh}\n"] }]
        }], ctorParameters: () => [{ type: PopupCrudService }] });

/*
 * Public API Surface of popup-crud
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PopupCrudComponent, PopupCrudService };
//# sourceMappingURL=popup-crud.mjs.map
