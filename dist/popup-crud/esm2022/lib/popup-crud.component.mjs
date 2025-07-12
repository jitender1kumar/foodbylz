import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as i0 from "@angular/core";
import * as i1 from "./popup-crud.service";
//import { QuantitytypeService } from '../../../../Services/quantitytype.service';
//import { environment } from '../../../../../foodbilling/src/environment/environment';
export class PopupCrudComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: PopupCrudComponent, deps: [{ token: i1.PopupCrudService }], target: i0.ɵɵFactoryTarget.Component }); }
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
        }], ctorParameters: () => [{ type: i1.PopupCrudService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtY3J1ZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9wb3B1cC1jcnVkL3NyYy9saWIvcG9wdXAtY3J1ZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFDMUQsa0ZBQWtGO0FBQ2xGLHVGQUF1RjtBQXVCdkYsTUFBTSxPQUFPLGtCQUFrQjtJQUM1QixXQUFXO0lBRVosWUFBb0IsU0FBMEI7UUFBMUIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDN0MsNkJBQTZCO1FBQzVCLHdDQUF3QztJQUMxQyxDQUFDO0lBRUYseUJBQXlCO0lBQ3hCLFFBQVE7SUFFUixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQVE7UUFFbkIsaUJBQWlCO0lBQ2YsQ0FBQzsrR0FmVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwyRUFsQm5COzs7OztHQUtULDJQQU5TLGFBQWE7OzRGQW1CWixrQkFBa0I7a0JBdEI5QixTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksV0FDUCxDQUFDLGFBQWEsQ0FBQyxZQUNkOzs7OztHQUtUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBvcHVwQ3J1ZFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLWNydWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuLy9pbXBvcnQgeyBRdWFudGl0eXR5cGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vU2VydmljZXMvcXVhbnRpdHl0eXBlLnNlcnZpY2UnO1xyXG4vL2ltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZm9vZGJpbGxpbmcvc3JjL2Vudmlyb25tZW50L2Vudmlyb25tZW50JztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItcG9wdXAtY3J1ZHMnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0Jyb3dzZXJNb2R1bGVdLFxyXG4gIHRlbXBsYXRlOiBgXHJcblx0XHQ8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxyXG4gICAgICA8IS0tIDxoNj57e2FyZ3N9fTwvaDY+ICAtLT5cclxuXHRcdDwvZGl2PlxyXG5cclxuICBgLFxyXG4gIHN0eWxlczogYGJvZHkge1xyXG4gICAgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgYmFja2dyb3VuZDogdXJsKGh0dHA6Ly93d3cuc2h1a2F0c3Utbm90ZS5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTQvMTIvY29tcHV0ZXItNTY0MTM2XzEyODAuanBnKSBuby1yZXBlYXQ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcblxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFBvcHVwQ3J1ZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgIC8vZGF0YTphbnk7XHJcbiAgXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwb3B1cGVkaXQ6UG9wdXBDcnVkU2VydmljZSl7XHJcbiAgIC8vICBhbGVydChcIndvcmtpbmcgbGlicmFyeVwiKTtcclxuICAgIC8vIHRoaXMuZGF0YSA9IHRoaXMucG9wdXBlZGl0LmdldGRhdGEoKTtcclxuICB9XHJcblxyXG4gLy8gQElucHV0KClhcmdzOmFueT1udWxsO1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgXHJcbiAgfVxyXG4gIGFsZXJ0ZnVuKGFyZ3M6YW55KVxyXG4gIHtcclxuLy90aGlzLmFyZ3M9YXJncztcclxuICB9XHJcbn1cclxuIl19