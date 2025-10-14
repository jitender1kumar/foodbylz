import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeEnvironment } from '../../environment/homeEnvironment'

@Component({
  selector: 'app-home-center-panel',
  standalone: false,
  templateUrl: './home-center-panel.component.html',
  styleUrl: './home-center-panel.component.css'
})
export class HomeCenterPanelComponent implements OnInit {
  @Input() productsByCategoryId:any;
@Output() incrementclicked = new EventEmitter<any>();
replaceFilteredData: any[] = [];
selectedType: string = '';
ngOnInit(): void {
 // throw new Error('Method not implemented.');
  if(this.productsByCategoryId.length>0)
  {
    this.getFilteredProductsByCategoryId();
  }
}

//filter veg nonveg start
getFilteredProductsByCategoryId(): void {
  HomeEnvironment.VegType$.next(this.selectedType);
  if (this.replaceFilteredData && this.productsByCategoryId.length > 0) {
    if (this.replaceFilteredData[0]) {
      if (
        this.productsByCategoryId[0].categoryName !==
        this.replaceFilteredData[0].categoryName
      ) {
        this.replaceFilteredData = [];
        this.replaceFilteredData = this.productsByCategoryId;
        this.productsByCategoryId = this.processFoodFiltering();
      } else {
        this.productsByCategoryId = this.replaceFilteredData;
        this.productsByCategoryId = this.processFoodFiltering();
      }
    } else {
      this.replaceFilteredData = [];
      this.replaceFilteredData = this.productsByCategoryId;
      this.productsByCategoryId = this.processFoodFiltering();
    }
  } else if (this.replaceFilteredData) {
    this.productsByCategoryId = this.replaceFilteredData;
    this.productsByCategoryId = this.processFoodFiltering();
  } else {
    this.replaceFilteredData = this.productsByCategoryId;
    this.productsByCategoryId = this.processFoodFiltering();
  }
}

processFoodFiltering(): any[] {
  if (!this.selectedType) return this.productsByCategoryId;
  return this.productsByCategoryId.filter((items: { [s: string]: unknown; } | ArrayLike<unknown>) =>
    Object.values(items).some(val =>
      String(val).toLowerCase().includes(this.selectedType.toLowerCase())
    )
  );
}
// filter veg nonveg end

increment(_id:string)
{
this.incrementclicked.emit(_id);
}
}