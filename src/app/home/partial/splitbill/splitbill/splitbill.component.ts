import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as SplitBillActions from '../splitbillStore/splitbill.action';
import { Store } from '@ngrx/store';

export interface ItemWiseSplit
{
 
  SelectProductId:string;
  selectSubQuantityTypeID:string;
  isItemSelected:boolean;
  KOTIndex:number;
}
export interface ItemWisePerson
{
  personId:number;
  ItemWiseSplits:ItemWiseSplit;
}
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
makeMeUniqueItem=0;
splitBill$: any;
  selectedPersonIndex: number = 0;
  KotDataManage: any;
 
constructor(private store: Store<{ splitBillReducer_: any }>)
{
  this.splitBill$ = store.select(state => state.splitBillReducer_.splitBills.data);
}
ngOnInit() {  
  
  this.initializeItemWise();
}

initializeItemWise()
{
  if (!this.KotData) return;
  this.KotDataManage=this.KotData;
}
// INSERT_YOUR_CODE
getKotItemsLength(): number {
  if (!this.KotData || !Array.isArray(this.KotData)) {
    return 0;
  }
  let count = 0;
  for (let kot of this.KotData) {
    if (kot?.KOTrunningorders && Array.isArray(kot.KOTrunningorders)) {
      count += kot.KOTrunningorders.length;
    }
  }
  return count;
}
// INSERT_YOUR_CODE
/**
 * Returns the total number of KOT items, each multiplied by its qvalue (quantity value).
 * If qvalue is missing or falsy, counts as 1 for that item.
 */
getKotItemsLengthWithQValue(): number {
  if (!this.KotData || !Array.isArray(this.KotData)) {
    return 0;
  }
  let count = 0;
  for (let kot of this.KotData) {
    if (kot?.KOTrunningorders && Array.isArray(kot.KOTrunningorders)) {
      for (let item of kot.KOTrunningorders) {
        count += Number(item.qvalue) || 1;
      }
    }
  }
  return count;
}

close() {
  this.ItemWisePersonList=[];
  this.selectedItemList=[];
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
 
  if (this.percentSplits.length >= this.getKotItemsLengthWithQValue()) return;
  this.percentSplits.push(100 - this.percentSplits.reduce((acc, curr) => acc + curr, 0));
}
// INSERT_YOUR_CODE

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
// Item-wise split variables
itemSelections: any[] = [];
assignedItemsList: { items: any[] }[] = [{ items: [] }];

// Helper: Check if item is already assigned to a different person
isItemAssignedToOtherPerson(KOTIndex: number, itemIdx: number, excludePersonIdx?: number): boolean {
  // Handles check for whether the item at [KOTIndex][itemIdx] is already assigned to another person
  if (
    !this.KotDataManage ||
    !Array.isArray(this.KotDataManage) ||
    !this.KotDataManage[KOTIndex] ||
    !Array.isArray(this.KotDataManage[KOTIndex]?.KOTrunningorders) ||
    !this.KotDataManage[KOTIndex].KOTrunningorders[itemIdx]
  ) {
    return false;
  }
  const targetItem = this.KotDataManage[KOTIndex].KOTrunningorders[itemIdx];

  for (let i = 0; i < this.ItemWisePersonList.length; i++) {
    // Optional: allow current/selected person index to be excluded from the check (for edit scenarios)
    if (excludePersonIdx !== undefined && i === excludePersonIdx) continue;

    const person = this.ItemWisePersonList[i];
    const splits = Array.isArray(person?.ItemWiseSplits) ? person.ItemWiseSplits : [];
    const items = Array.isArray(person?.items) ? person.items : [];

    // Check ItemWiseSplits for this person
    for (let split of splits) {
      if (
        split.SelectProductId === targetItem.SelectProductId &&
        split.selectSubQuantityTypeID === targetItem.selectSubQuantityTypeID &&
        split.KOTIndex === KOTIndex
      ) {
        return true;
      }
    }
    // Legacy fallback: check person's "items" array (pre-upgrade code, if present)
    for (let itm of items) {
      if (
        itm.SelectProductId === targetItem.SelectProductId &&
        itm.selectSubQuantityTypeID === targetItem.selectSubQuantityTypeID &&
        itm.KOTIndex === KOTIndex
      ) {
        return true;
      }
      // If legacy object doesn't have KOTIndex, fallback to deep equality as last resort
      if (
        !('KOTIndex' in itm) &&
        itm === targetItem
      ) {
        return true;
      }
    }
  }
  return false;
}
isItemAssignedToOther(KOTIndex: number, SelectProductId: any, selectSubQuantityTypeID: any, excludePersonIdx?: number): boolean {
  // Check if the item has been assigned to any person (optionally excluding one person by index)
  if (!this.KotDataManage || !Array.isArray(this.KotDataManage)) {
    return false;
  }

  for (let i = 0; i < this.ItemWisePersonList.length; i++) {
    if (excludePersonIdx !== undefined && i === excludePersonIdx) continue;
    const person = this.ItemWisePersonList[i];
    const splits = Array.isArray(person?.ItemWiseSplits) ? person.ItemWiseSplits : [];
    const items = Array.isArray(person?.items) ? person.items : [];

    // Check in main ItemWiseSplits array
    for (let split of splits) {
      if (
        split.KOTIndex === KOTIndex &&
        split.SelectProductId === SelectProductId &&
        split.selectSubQuantityTypeID === selectSubQuantityTypeID
      ) {
        return true;
      }
    }
    // Check in legacy items array (for compatibility)
    for (let itm of items) {
      if (
        itm.KOTIndex === KOTIndex &&
        itm.SelectProductId === SelectProductId &&
        itm.selectSubQuantityTypeID === selectSubQuantityTypeID
      ) {
        return true;
      }
      // If legacy object doesn't have KOTIndex, fallback to deep matching
      if (
        !('KOTIndex' in itm) &&
        itm.SelectProductId === SelectProductId &&
        itm.selectSubQuantityTypeID === selectSubQuantityTypeID
      ) {
        return true;
      }
    }
  }
  return false;
}

ItemWisePersonList:any=[];
// Assign selected items to the selected person
assignSelectedItemsToPerson(personIdx: number): void {
  // Check if this person already has ItemWiseSplits assigned (cannot assign to more than one person)
  const existingPersonIndex = this.ItemWisePersonList.findIndex(
    (person: any) => person.personId === personIdx
  );
  if (this.selectedItemList && this.selectedItemList.length > 0) {
    if (existingPersonIndex !== -1) {
      // If target person exists, update their ItemWiseSplits
      // Concatenate with existing data instead of replacing it
      const currentSplits = Array.isArray(this.ItemWisePersonList[existingPersonIndex].ItemWiseSplits) 
        ? this.ItemWisePersonList[existingPersonIndex].ItemWiseSplits 
        : [];
      this.ItemWisePersonList[existingPersonIndex].ItemWiseSplits = [
        ...currentSplits,
        ...this.selectedItemList
      ];
    } else {
      // Before adding new entry for personIdx, ensure this selectedItemList is not already assigned to any other person
      let alreadyAssigned = false;
      for (let i = 0; i < this.ItemWisePersonList.length; i++) {
        const splits = this.ItemWisePersonList[i].ItemWiseSplits || [];
        if (
          splits.length > 0 
         
        ) {
          splits.filter((split: any) =>
           
              (sel: any) =>
                sel.SelectProductId != split.SelectProductId &&
                sel.selectSubQuantityTypeID != split.selectSubQuantityTypeID &&
                sel.KOTIndex != split.KOTIndex
            
          )
          console.log(splits);
          // alreadyAssigned = false;
          // break;
        }
        // else
        // {
        //   this.ItemWisePersonList.push({
        //     personId: personIdx,
        //     ItemWiseSplits: [...this.selectedItemList],
        //   });
        // }
      }
      // if (!alreadyAssigned) {
      //   // Only add if none of these items are already assigned in another person's ItemWiseSplits
       
      // }
      // else do nothing if item(s) are already assigned
    }
  }
  //  else if (this.selectedItemList && this.selectedItemList.length === 0) {
  //   // Remove if no selection
  //   if (existingPersonIndex !== -1) {
  //     this.ItemWisePersonList.splice(existingPersonIndex, 1);
  //   }
  // }
  this.selectedItemList=[];
  console.log(this.ItemWisePersonList);
}

// Add a new person for item assignment
addAssignmentPerson() {
  // Ensure each new person gets a unique personId in ItemWisePersonList.
 
  const newPersonId = this.ItemWisePersonList.length+1;
  if (newPersonId >= this.getKotItemsLength()+1) return;
  this.ItemWisePersonList.push({
    personId: newPersonId,
    ItemWiseSplits: []
  });
}
// INSERT_YOUR_CODE
getTotalAssignedItemsLength(): number {
  if (!this.ItemWisePersonList || !Array.isArray(this.ItemWisePersonList)) {
    return 0;
  }
  let total = 0;
  for (const person of this.ItemWisePersonList) {
    if (person.ItemWiseSplits && Array.isArray(person.ItemWiseSplits)) {
      total += person.ItemWiseSplits.length;
    }
  }
  return total;
}
showSplitButton(): boolean {
  
  return this.ItemWisePersonList.length > 0 
    && this.getTotalAssignedItemsLength() === this.getKotItemsLengthWithQValue();
}
// INSERT_YOUR_CODE
allItems: any[] = [];
isItemChecked: boolean = false;
selectedItem: ItemWiseSplit={
  SelectProductId: '',
  selectSubQuantityTypeID: '',
  isItemSelected: false,
  KOTIndex: -1
}
selectedItemList:any=[]
initializeSelectd(order: any, kotindex: number, event: any): void {
  // console.log(order);
  // console.log(kotindex);
   const checked = !!event?.target?.checked;
  // console.log(checked);
if(checked===true)
{
// INSERT_YOUR_CODE
this.selectedItem = {
  SelectProductId: order?.SelectProductId || '',
  selectSubQuantityTypeID: order?.selectSubQuantityTypeID || '',
  isItemSelected: checked,
  KOTIndex: kotindex
};
// INSERT_YOUR_CODE
// INSERT_YOUR_CODE
// Check if item with same SelectProductId, selectSubQuantityTypeID, and KOTIndex already exists
const existingIndex = this.selectedItemList.findIndex(
  (item: any) =>
    item.SelectProductId === this.selectedItem.SelectProductId &&
    item.selectSubQuantityTypeID === this.selectedItem.selectSubQuantityTypeID &&
    item.KOTIndex === this.selectedItem.KOTIndex
);

if (existingIndex !== -1) {
  // If exists, update the existing entry
  this.selectedItemList[existingIndex] = { ...this.selectedItem };
} else {
  // If not exists, push the new item
  this.selectedItemList.push({ ...this.selectedItem });
}



}
else
{
// INSERT_YOUR_CODE
// Remove from selectedItem the item that matches all three fields: SelectProductId, selectSubQuantityTypeID, KOTIndex
const index = this.selectedItemList.findIndex(
  (item: any) =>
    item.SelectProductId === order?.SelectProductId &&
    item.selectSubQuantityTypeID === order?.selectSubQuantityTypeID &&
    item.KOTIndex === kotindex
);
if (index !== -1) {
  this.selectedItemList.splice(index, 1);
}

}
console.log(this.selectedItemList);
  // Initialize allItems if not already
 
  
  // // Determine the list of all items in order to figure out its index
  // if (!this.KotData?.[kotindex]?.KOTrunningorders) return;
  //  this.allItems = this.KotData[kotindex].KOTrunningorders;
  // const idx = this.allItems.indexOf(order);

  // if (idx === -1) return;
  
  // // Initialize itemSelections array length if not already done
  // if (!Array.isArray(this.itemSelections) || this.itemSelections.length !== this.allItems.length) {
  //   this.itemSelections = Array(this.allItems.length).fill(false);
  // }
  // // Do not assign itemSelections (boolean[]) to assignedItemsList
  // // This line was incorrect and is not needed. Removing it.
  // // Toggle selection status

  // this.itemSelections[idx] = !this.itemSelections[idx];
  // console.log(this.itemSelections);
}
// INSERT_YOUR_CODE
/**
 * Removes the person at the given index from the ItemWisePersonList.
 * Expects to be called as: ItemWisePersonList(personIdx, 1)
 * (Matches the onclick in template: Delete Person)
 */
ItemWisePersonListDelete(personIdx: number, actionType: number) {
  // For 'Delete Person' button, actionType is 1
  console.log(this.ItemWisePersonList.length);
  console.log(personIdx);
  if(personIdx+1!==this.ItemWisePersonList.length) return;  
  if (actionType === 1 && Array.isArray(this.ItemWisePersonList)) {
    // Remove person at personIdx
    this.ItemWisePersonList.splice(personIdx, 1);
  }
}

// INSERT_YOUR_CODE
/**
 * Determines if the given item (by SelectProductId, selectSubQuantityTypeID, KOTIndex) 
 * is currently checked for the selected person in the UI.
 * Used by the 'checked' property of the item checkbox in the template.
 * 
 * Returns true if the item is in the selectedItemList.
 */
isItemCheckedForPerson(Item: any, KOTIndex: number): boolean {
  if (!this.selectedItemList || !Array.isArray(this.selectedItemList)) {
    return false;
  }
  return this.selectedItemList.some(
    (selected: any) =>
      selected.SelectProductId === Item.SelectProductId &&
      selected.selectSubQuantityTypeID === Item.selectSubQuantityTypeID &&
      selected.KOTIndex === KOTIndex
  );
}

}
