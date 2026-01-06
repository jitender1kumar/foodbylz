import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-splitbill',
  standalone: false,
  templateUrl: './splitbill.component.html',
  styleUrl: './splitbill.component.css',
})
export class SplitbillComponent {
@Input() KotData:any;
@Input() totalAmount:number=0;
@Input() closePopUp!: any;
@Input() showPopUp!: any;
@Output() closePopUpByChildSplitBill = new EventEmitter<boolean>();
close() {
  this.closePopUpByChildSplitBill.emit(false);
}
selectedSplit: string | null = null;

// Portion Wise Split variables and method
portionCount: number = 2;

splitPortionResults: any[] = [];

splitPortion() {
  // We'll split the total by number of portions
  if (!this.KotData || !this.KotData.length || !this.KotData[0]?.KOTrunningorders) {
    this.splitPortionResults = [];
    return;
  }
  const kotItems = this.KotData[0].KOTrunningorders;
  const totalAmount = kotItems.reduce(
    (sum: number, item: any) => sum + (item.ProductPrice * (item.Quantity || 1)),
    0
  );
  const portions = Number(this.portionCount);
  if (portions < 2) return;

  const portionAmount = Math.round((totalAmount / portions) * 100) / 100;

  this.splitPortionResults = Array.from({ length: portions }, (_, idx) => ({
    person: idx + 1,
    amount: portionAmount,
  }));
}

// Percent Wise Split variables and methods
percentSplits: number[] = [50, 50];
percentSplitResults: any[] = [];

addPercentPerson(): void {
  // Limit to 10 persons max
  if (this.percentSplits.length >= 10) return;
  this.percentSplits.push(100 - this.percentSplits.reduce((acc, curr) => acc + curr, 0));
}
removePercentPerson()
{
 if(this.percentSplits.length===2)return;
  this.percentSplits.splice(-1, 1);
}
splitPercent() {
  if (!this.KotData || !this.KotData.length || !this.KotData[0]?.KOTrunningorders) {
    this.percentSplitResults = [];
    return;
  }
  // Ensure the total of percentSplits is exactly 100
  console.log(this.percentSplits);
 let totalpercent :number=0;
  for(let i=0;i<this.percentSplits.length;i++){
   console.log(this.percentSplits[i])
   totalpercent+=this.percentSplits[i];
  }
  if(totalpercent!==100){
    console.log('Total percent must be exactly 100');
    return;
  }
  console.log(totalpercent);
 
}

// Items Wise Split variables and methods
itemSelections: any[] = [];
assignedItems: any[] = [];

// assignItemsToPerson() {
//   if (!this.KotData || !this.KotData.length || !this.KotData[0]?.KOTrunningorders) {
//     this.assignedItems = [];
//     return;
//   }
//   const kotItems = this.KotData[0].KOTrunningorders;
//   // Fill selections array for current KOT length if needed
//   if (this.itemSelections.length < kotItems.length) {
//     this.itemSelections.length = kotItems.length;
//     this.itemSelections.fill(false, this.itemSelections.length, kotItems.length);
//   }
//   this.assignedItems = kotItems
//     .map((item: any, idx: number) => (this.itemSelections[idx] ? item : null))
//     .filter((item: any) => !!item);
// }
/**
 * Items Wise Split - Support assigning parts for split bill by items
 * The HTML expects:
 *  - this.itemSelections: boolean[] for current selection state by index in KOTrunningorders
 *  - this.assignedItems: array for currently assigned items (for preview)
 *  - if KotData/KotData[0]?.KOTrunningorders length changes, auto-adjust selection array
 */

// Ensures itemSelections matches the number of items in the order


// Assigns currently selected items to assignedItems[]
/**
 * Ensures itemSelections matches the number of items available in KOTrunningorders across all KOTs.
 * Should be called whenever KotData or the running orders change.
 */
autoAdjustItemSelections() {
  // Flatten all KOTrunningorders in all KOTs
  let totalLength = 0;
  if (this.KotData && Array.isArray(this.KotData)) {
    for (let kot of this.KotData) {
      if (kot?.KOTrunningorders && Array.isArray(kot.KOTrunningorders)) {
        totalLength += kot.KOTrunningorders.length;
      }
    }
  }
  console.log(this.itemSelections.length, totalLength);
  if (this.itemSelections.length !== totalLength) {
    // Fill false for unchecked
    this.itemSelections = Array(totalLength).fill(false);
  }
}

/**
 * Assigns the currently selected items from KOTrunningorders (from all KOTs) to assignedItems
 * Run when "Add Items" button clicked
 */
/**
 * Assigns currently selected items (across all KOTs) to the selected "person" in assignedItemsList.
 * Each person can have their own panel containing assigned items. This function takes currently checked
 * items and assigns them to the given person's array, clearing selections after.
 * 
 * @param personIdx (number) - the "person" index to assign the checked items (from UI).
 */
assignedItemsList:any;
assignItemsToPerson(personIdx: number): void {
  if (
    !Array.isArray(this.KotData) ||
    !Array.isArray(this.itemSelections) ||
    typeof personIdx !== 'number'
  ) {
    return;
  }

  // Flatten all KOTrunningorders into linear array, mapping { item, kotIndex, itemIndex }
  const allItemsWithRefs: { item: any, kotIndex: number, itemIndex: number }[] = [];
  let runningIdx = 0;

  for (let kotIndex = 0; kotIndex < this.KotData.length; kotIndex++) {
    const kot = this.KotData[kotIndex];
    if (kot?.KOTrunningorders && Array.isArray(kot.KOTrunningorders)) {
      for (let itemIndex = 0; itemIndex < kot.KOTrunningorders.length; itemIndex++) {
        allItemsWithRefs.push({
          item: kot.KOTrunningorders[itemIndex],
          kotIndex,
          itemIndex
        });
        runningIdx++;
      }
    }
  }

  // Collect all items where their flattened index in itemSelections is true
  const itemsToAssign = [];
  for (let i = 0; i < allItemsWithRefs.length; i++) {
    if (this.itemSelections[i]) {
      itemsToAssign.push(allItemsWithRefs[i].item);
    }
  }

  // Lazy-safe initialization of assignedItemsList
  if (!Array.isArray(this.assignedItemsList) || !this.assignedItemsList[personIdx]) {
    // Expand assignedItemsList up to personIdx if needed
    if (!Array.isArray(this.assignedItemsList)) this.assignedItemsList = [];
    while (this.assignedItemsList.length <= personIdx) {
      this.assignedItemsList.push({ items: [] });
    }
  }

  // Assign selected items to corresponding person
  this.assignedItemsList[personIdx].items = [
    ...this.assignedItemsList[personIdx].items,
    ...itemsToAssign
  ];

  // Optional: Remove assigned items from other persons? (not required by HTML currently)

  // After assignment, clear all checkboxes (itemSelections)
  this.itemSelections = this.itemSelections.map(() => false);
}
/**
 * Adds a new assignment "person" to the assignedItemsList for item-wise split.
 * Ensures assignedItemsList is a valid mutable array. 
 * Prevents accidental mutation errors, and optionally you may wish to enforce max people.
 */
addAssignmentPerson(): void {
  // Defensive clone in case reference issues arise (future proofing, not strictly needed now)
    if (!Array.isArray(this.assignedItemsList)) {
    this.assignedItemsList = [];
  }
  // Optionally, avoid accidental push of redundant empty persons (future-guard)
  // Enforce immutability for frameworks that expect it; else, use push.
  this.assignedItemsList = [
    ...this.assignedItemsList,
    { items: [] }
  ];
}

ngOnInit() {  
  this.autoAdjustItemSelections();
}

/**
 * Checks if the given kotItem is already assigned to any person in assignedItemsList.
 * Returns true if assigned to any, else false.
 */
isItemAssignedToAnyPerson(kotItem: any): boolean {
  if (!Array.isArray(this.assignedItemsList)) return false;
  // Compare using relevant properties; fallback to object identity if needed
  return this.assignedItemsList.some(list =>
    Array.isArray(list.items) && list.items.some(
      (      i: { ProductName: any; ProductPrice: any; quntityvalue: any; }) =>
        i.ProductName === kotItem.ProductName &&
        i.ProductPrice === kotItem.ProductPrice &&
        i.quntityvalue === kotItem.quntityvalue
    )
  );
}
/**
 * Returns the global/flat index for a specific item given its KOT index and item index.
 * This is useful for working with itemSelections, which is a flat array of all items across all KOTs.
 * 
 * @param kotIdx The index of the KOT in KotData
 * @param itmIdx The index of the item within KOTrunningorders of the specified KOT
 * @returns The global index in the flat itemSelections array
 */
getGlobalIndexForItem(kotIdx: number, itmIdx: number): number {
  let globalIdx = 0;
  for (let i = 0; i < kotIdx; i++) {
    if (this.KotData[i]?.KOTrunningorders) {
      globalIdx += this.KotData[i].KOTrunningorders.length;
    }
  }
  globalIdx += itmIdx;
  return globalIdx;
}

/**
 * Call this in the HTML when a checkbox is clicked for item selection.
 * This function toggles the value in itemSelections at the computed global index.
 */
toggleItemSelection(kotIndex: number, itemIndex: number, checked: boolean) {
  // Compute the flat/global index among all KotData KOTrunningorders
  let globalIdx = 0;
  for (let i = 0; i < this.KotData.length; i++) {
    if (i === kotIndex) {
      globalIdx += itemIndex;
      break;
    }
    if (this.KotData[i]?.KOTrunningorders) {
      globalIdx += this.KotData[i].KOTrunningorders.length;
    }
  }
  this.itemSelections[globalIdx] = checked;
}



/**
 * Optionally call autoAdjustItemSelections() from ngOnInit or ngOnChanges if components should react to such changes dynamically:
 */
// ngOnInit() {
//   this.autoAdjustItemSelections();
// }
// ngOnChanges() {
//   this.autoAdjustItemSelections();
// }

}
