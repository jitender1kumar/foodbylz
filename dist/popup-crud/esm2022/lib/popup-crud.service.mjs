import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class PopupCrudService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtY3J1ZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcG9wdXAtY3J1ZC9zcmMvbGliL3BvcHVwLWNydWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCLGdCQUFnQixDQUFDO0lBQ2pCLFNBQVMsQ0FBQyxJQUFRO1FBRWhCLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELE9BQU87UUFFTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzsrR0FaVSxnQkFBZ0I7bUhBQWhCLGdCQUFnQixjQUZmLE1BQU07OzRGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb3B1cENydWRTZXJ2aWNlIHtcclxucmV0dXJuZGF0YTphbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgZWRpdHBvcHVwKGRhdGE6YW55KVxyXG4gIHtcclxuICAgIHRoaXMucmV0dXJuZGF0YT1kYXRhO1xyXG4gICAgYWxlcnQoXCJsaWJyYXJ5IHdvcmtcIitkYXRhKTtcclxuICB9XHJcbiAgZ2V0ZGF0YSgpXHJcbiAge1xyXG4gICAgcmV0dXJuIHRoaXMucmV0dXJuZGF0YTtcclxuICB9XHJcbn1cclxuIl19