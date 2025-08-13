import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  
})
export class NameExistOrNotService {
    InventoryNameExist=false;
    checkNameExistforAddForm(checkName:string,Data$:any)
{
   
 Data$?.subscribe((getName: any[])=>{
const NameExist = getName.find((item: { name: string;}) =>item.name===checkName );
if(NameExist)
{
//console.log("if"+NameExist);
console.log(NameExist);
  return this.InventoryNameExist= true;
}
else
{
//  alert("else"+NameExist);
console.log(NameExist);
  return this.InventoryNameExist= false;
}
});
return this.InventoryNameExist;
}
checkNameExist(checkName:string,_id:string,Data$:any)
{
   
 Data$?.subscribe((getName: any[])=>{
const NameExist = getName.find((item: { name: string; _id:string}) =>item.name===checkName && item._id!=_id);
if(NameExist)
{
//console.log("if"+NameExist);
console.log(NameExist);
  return this.InventoryNameExist= true;
}
else
{
//  alert("else"+NameExist);
console.log(NameExist);
  return this.InventoryNameExist= false;
}
});
return this.InventoryNameExist;
}
checkChairNameExist(checkName:string,Chair:any,Table:any,Floor:any)
{
   
// Chair?.subscribe((getName: any[])=>{
const ChairNameExist = Chair.find((chair: { name: string; }) =>chair.name===checkName );
const ChairNameExistIndex = Chair.findIndex((chair: { name: string; }) =>chair.name===checkName );

if(ChairNameExist)
{
//console.log("if"+NameExist);
console.log(ChairNameExist);
const TableExist = Table.find((table: { _id: string; }) =>table._id===ChairNameExist[ChairNameExistIndex].table_id );
const TableIndex = Table.findIndex((table: { _id: string; }) =>table._id===ChairNameExist[ChairNameExistIndex].table_id );
//  return this.InventoryNameExist= true;
if(TableExist)
{
const FloorExist = Floor.find((floor: { _id: string; }) =>floor._id===TableExist[TableIndex].floor_id );
const FloorIndex = Floor.findIndex((floor: { _id: string; }) =>floor._id===TableExist[TableIndex].floor_id );
if(FloorExist)
{
    return  this.InventoryNameExist= true;
}
else
{
return  this.InventoryNameExist= false;
}

}
else
{
    return  this.InventoryNameExist= false;
}
}
else
{
//  alert("else"+NameExist);
console.log(ChairNameExist);
  return this.InventoryNameExist= false;
}

// });
 return this.InventoryNameExist;
}
}