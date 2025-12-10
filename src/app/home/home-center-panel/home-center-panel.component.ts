import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeEnvironment } from '../../environment/homeEnvironment'
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-home-center-panel',
  standalone: false,
  templateUrl: './home-center-panel.component.html',
  styleUrl: './home-center-panel.component.css'
})
export class HomeCenterPanelComponent implements OnInit {
  @Input() productsByCategoryId: any;
 @Input() productitembackup:any;
  @Output() incrementclicked = new EventEmitter<any>();
  @Output() shorcodeEnteredbychild = new EventEmitter<any>();
  @Input() productPriceData$?: Observable<any> | null = null;
  replaceFilteredData: any[] = [];
selectedType: string = '';
constructor()
{
 
}
ngOnInit(): void {
 
  if(this.productsByCategoryId.length>0)
  { 
    this.getFilteredProductsByCategoryId();
  }
}

//filter veg nonveg start


shortcodeEnteredBySubParent(data:any)
{
  if(this.isPureInteger(data))
  {
    this.findShortcodeasNumber(data);
  }
  else
  {
this.findShortcodeasString(data);
  }
 
}
findShortcodeasNumber(ShortCodeNumber:number)
{
  this.productPriceData$?.subscribe((products: any[]) => {
    console.log(products);
    const productItem = products.find(
      (item: { ShortCodeNumber: number; }) => item.ShortCodeNumber === Number(ShortCodeNumber)
     
    );
    console.log(productItem);
    this.returnProductbyshortcode(productItem);
  });
  
}
findShortcodeasString(ShortCodeString:string)
{
  this.productPriceData$?.subscribe((products: any[]) => {
    const productItem = products.find(
      (item: { ShortCodeString: string; }) => item.ShortCodeString === ShortCodeString
     
    );
   // console.log(productItem);
    this.returnProductbyshortcode(productItem);
  });
  
}
returnProductbyshortcode(item:any)
{
  //console.log(item);
  this.shorcodeEnteredbychild.emit(item);
 // return item;
}
isPureInteger(str: string): boolean {
  return /^[0-9]+$/.test(str);
}

getFilteredProductsByCategoryId(): void {
  HomeEnvironment.VegType$.next(this.selectedType);

  const type = this.selectedType?.toLowerCase() ?? "";
  this.productsByCategoryId = this.productitembackup; 
  // If no search term, show all
  if (!type) {
    return;
  }

  // Apply filtering directly on the current productsByCategoryId without backup
  const filtered = (type === "true" || type === "false")
    ? this.productsByCategoryId.filter((i: any) => String(i.veg_nonveg) === type)
    : this.productsByCategoryId.filter((item: any) =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(type)
        )
      );
 
    this.productsByCategoryId = filtered;
}


// filter veg nonveg end

increment(_id:string)
{
this.incrementclicked.emit(_id);
}
}