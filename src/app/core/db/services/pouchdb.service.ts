// import { Injectable } from '@angular/core';

// import PouchDB from 'pouchdb-core';
// import PouchIdbAdapter from 'pouchdb-adapter-idb';
// import PouchHttpAdapter from 'pouchdb-adapter-http';
// import PouchFind from 'pouchdb-find'
// import { HttpClient } from '@angular/common/http';
// import { RunningItems } from '../../Model/RunningItemsHomeModel/RunningItem.model';
// // import find from 'pouchdb-find';
// PouchDB
//   .plugin(PouchIdbAdapter)
//   .plugin(PouchHttpAdapter)
//   .plugin(PouchFind);
// // PouchDB.plugin(find);

// // This is a workaround for "TypeError: Class extends value [object Object] is not a constructor or null"
// // Sometimes PouchDB adapters/plugins cause this if required before global is set.
// // Polyfill global for Angular/browser if needed.
// // See polyfills.ts: (window as any).global = window;
// // If the error persists and you are using pouchdb-find or an adapter, ensure it's required after the polyfill.
// // No additional code needed here; make sure polyfill is loaded before this file is imported.


// // export interface InvoiceTableData {
// //   tableId: string;
// //   tableName: string;
// //   customerId: string;
// //   customerName: string;
// //   orderMode: string;
// // }

// // export interface RunningItemsDoc {
// //   _id: string; // invoice_123
// //   type: 'running_items';
// //   invoiceId: string;
// //   items: RunningItems[];
// //   updatedAt: number;
// // }

// @Injectable({
//   providedIn: 'root'
// })
// export class PouchdbService {
//   private db: PouchDB.Database;
//   private remote: PouchDB.Database;

//   /**
//    * Fix for "TypeError: Class extends value [object Object] is not a constructor or null"
//    * 
//    * Ensure the "global" polyfill is set before PouchDB is required.
//    * This is typically handled in polyfills.ts:
//    *   (window as any).global = window;
//    * 
//    * If this error persists, double-check polyfills.ts is loaded BEFORE this file,
//    * and that no plugin is imported before the polyfill runs.
//    */
//   constructor(private http: HttpClient) {
//     // Defensive: Ensure the polyfill ran; if not, warn
   
//     this.db = new PouchDB('items', {
//       adapter: 'idb'
//     });
//     if (typeof (window as any).global === 'undefined') {
//       (window as any).global = window;
//       console.warn(
//         '[PouchdbService] Setting window.global at runtime. This should be set in polyfills.ts!'
//       );
//     }
//     this.remote = new PouchDB('http://localhost:5001/items', {
//       adapter: 'http'
//     });
//     this.db.sync(this.remote, {
//       live: true,
//       retry: true
//     });
//     // Ensure PouchDB is properly constructed
//     // try {
//     //   this.db = new PouchDB('items');
//     // } catch (e) {
//     //   console.error('Error initializing PouchDB. Check polyfills/global workaround.', e);
//     //   throw e;
//     // }

//     // const remoteDBUrl = environment.api + "items" || 'http://localhost:5001/items';
//     // let remoteDB;
//     // try {
//     //   remoteDB = new PouchDB(remoteDBUrl);
//     // } catch (e) {
//     //   console.error('Error initializing remote PouchDB. Check polyfills/global workaround.', e);
//     //   throw e;
//     // }

//     // .sync will throw if base class was misloaded, so catch this too
//     // try {
//     //   this.db
//     //     .sync(remoteDB, {
//     //       live: true,
//     //       retry: true,
//     //     })
//     //     .on('change', (info: any) => {
//     //       console.log('Sync change detected:', info);
//     //     })
//     //     .on('error', (err: any) => {
//     //       console.error('Sync error:', err);
//     //     });
//     // } catch (e) {
//     //   console.error('Error starting sync. This could be a sign of the class inheritance problem.', e);
//     //   throw e;
//     // }
//   }

//   add(doc: any) {
//     return this.db.put(doc);
//   }

//   getAll() {
//     return this.db.allDocs({ include_docs: true });
//   }

//   update(doc: any) {
//     return this.db.put(doc);
//   }

//   delete(doc: any) {
//     return this.db.remove(doc);
//   }

//   RunningItems_: any;
//   gitems2: any;
//   allppdata: any;

//   /**
//    * Updates (increments/decrements) quantity for a running item in PouchDB by invoiceId.
//    * The document stored in PouchDB will have:
//    *   - _id: 'invoice_' + invoiceid
//    *   - type: 'running_items'
//    *   - invoiceId: invoiceid
//    *   - items: RunningItems_ array (updated)
//    *   - updatedAt: timestamp
//    *
//    * If doc does not exist, it will be created.
//    */
//   async loadqunityvalue(
//     id: string,
//     action: 'inc' | 'dcre',
//     SubQuantityTypeName: string,
//     quntity: any,
//     price: any,
//     RunningItemData: any,
//     invoiceid: string,
//     allppdata: any
//   ): Promise<void> {
//     // Ensure existing state reset
//     if (Array.isArray(this.gitems2)) {
//       this.gitems2.length = 0;
//     }
//     const taxpercent = 0;

//     // Prepare keys and get docId for invoice
//     const docId = `invoice_${invoiceid}`;
//     let doc: any;

//     // Try to fetch existing doc, or create a new one if not found
//     try {
//       doc = await this.db.get(docId);
//     } catch (e: any) {
//       if (e.status === 404) {
//         doc = {
//           _id: docId,
//           type: 'running_items',
//           invoiceid,
//           items: [],
//           updatedAt: Date.now(),
//         };
//       } else {
//         throw e;
//       }
//     }

//     // Sync state for processing
//     this.RunningItems_ = Array.isArray(doc.items) ? [...doc.items] : [];
//     this.allppdata = allppdata;

//     // Helpers for lookup
//     const itemIdxInAllPP = this.allppdata.findIndex(
//       (item: any) =>
//         (item.SelectProductId ? item.SelectProductId === id : item.id === id) &&
//         item.SubQuantityTypeName === SubQuantityTypeName
//     );
//     const allPPItem = this.allppdata[itemIdxInAllPP];

//     const runningItemIdx = this.RunningItems_.findIndex(
//       (item: any) => item.SelectProductId === id && item.SubQuantityTypeName === SubQuantityTypeName
//     );

//     let val: number;
//     const getGItem = (obj: any, quantity: number) => ({
//       RecieptNumber: invoiceid,
//       Items: [
//         {
//           Productid: obj.SelectProductId,
//           Productname: obj.ProductName,
//           SubQuantityTypeID: obj.selectSubQuantityTypeID,
//           SubQuantityTypeName: obj.SubQuantityTypeName,
//           Qauntityid: obj.selectQtypeID,
//           Qauntityname: obj.QtypeName,
//           Quantity: quantity,
//           itemamount: price,
//           totalquantityamount: +price * quantity,
//           employee_id: "this.employeeId"
//         }
//       ]
//     });

//     if (allPPItem && allPPItem.SelectProductId && action === 'inc') {
//       val = Number(quntity) + 1;

//       if (this.RunningItems_.length > 0) {
//         if (runningItemIdx !== -1) {
//           Object.assign(this.RunningItems_[runningItemIdx], {
//             SelectProductId: id,
//             quntityvalue: val,
//             qvalue: val,
//             ProductPrice: price,
//             ProductName: allPPItem.ProductName,
//             selectcategoryID: allPPItem.selectcategoryID,
//             categoryName: allPPItem.categoryName,
//             selectQtypeID: allPPItem.selectQtypeID,
//             QtypeName: allPPItem.QtypeName,
//             selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
//             SubQuantityTypeName: allPPItem.SubQuantityTypeName,
//             taxnames: '',
//             taxvalues: '',
//             totaltaxvalue: taxpercent,
//             paidStatus: false,
//             AddOnItems: (this.RunningItems_[runningItemIdx]?.AddOnItems ?? [])
//           });
//           // update in pouchdb
//           this.gitems2 = [getGItem(this.RunningItems_[runningItemIdx], val)];
//           if (doc && Array.isArray(doc.items) && runningItemIdx !== -1) {
//             doc.items[runningItemIdx] = {
//               ...this.RunningItems_[runningItemIdx]
//             };
//             try {
//               await this.db.put(doc);
//             } catch (e) {
//               console.error('Error updating running item in PouchDB', e);
//             }
//           }
//         } else {
//           const newRunningItem = {
//             SelectProductId: id,
//             ProductPrice: price,
//             ProductName: allPPItem.ProductName,
//             selectcategoryID: allPPItem.selectcategoryID,
//             categoryName: allPPItem.categoryName,
//             selectQtypeID: allPPItem.selectQtypeID,
//             QtypeName: allPPItem.QtypeName,
//             selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
//             SubQuantityTypeName: allPPItem.SubQuantityTypeName,
//             quntityvalue: val,
//             qvalue: val,
//             taxnames: '',
//             taxvalues: '',
//             totaltaxvalue: taxpercent,
//             paidStatus: false,
//             AddOnItems: []
//           };
//           this.gitems2 = [getGItem(allPPItem, val)];
//           this.RunningItems_ = [...this.RunningItems_, newRunningItem];
//           // Add the new running item to PouchDB document's items array
//           if (doc && Array.isArray(doc.items)) {
//             doc.items.push(newRunningItem);
//             try {
//               await this.db.put(doc);
//             } catch (e) {
//               console.error('Error adding new running item to PouchDB', e);
//             }
//           }
//         }
//       } else {
//          this.db.put({
//           _id: 'item_1',
//           type: 'product',
//           SelectProductId: id,
//               ProductPrice: price,
//               ProductName: allPPItem.ProductName,
//               selectcategoryID: allPPItem.selectcategoryID,
//               categoryName: allPPItem.categoryName,
//               selectQtypeID: allPPItem.selectQtypeID,
//               QtypeName: allPPItem.QtypeName,
//               selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
//               SubQuantityTypeName: SubQuantityTypeName,
//               quntityvalue: val,
//               qvalue: val,
//               taxnames: '',
//               taxvalues: '',
//               totaltaxvalue: taxpercent,
//               paidStatus: false,
//               AddOnItems: []
//         });
//         // this.gitems2 = [getGItem(allPPItem, val)];
//         // this.RunningItems_ = [newRunningItem];
//         // Add the new running item to PouchDB document's items array
//         // if (doc && Array.isArray(doc.items)) {
//         //   doc.items = [newRunningItem];
//         //   try {
//         //     await this.db.put(doc);
//         //   } catch (e) {
//         //     console.error('Error adding new running item to PouchDB', e);
//         //   }
//         // }
//       }
//     } else if (action === 'dcre') {
//       if (runningItemIdx !== -1) {
//         val = Number(quntity) - 1;
//         if (val > 0) {
//           Object.assign(this.RunningItems_[runningItemIdx], {
//             quntityvalue: val,
//             qvalue: val,
//             ProductPrice: price,
//             taxnames: '',
//             taxvalues: '',
//             totaltaxvalue: taxpercent
//           });
//           this.gitems2 = [getGItem(this.RunningItems_[runningItemIdx], val)];
//         } else {
//           this.RunningItems_ = [
//             ...this.RunningItems_.slice(0, runningItemIdx),
//             ...this.RunningItems_.slice(runningItemIdx + 1)
//           ];
//         }
//       }
//     }

//     // Save the updated items in the PouchDB doc
//     doc.items = this.RunningItems_;
//     doc.updatedAt = Date.now();

//     try {
//       // If doc is new, _rev will be undefined.
//       await this.db.put(doc);
//     } catch (e: any) {
//       // If conflict, reload and try again (simple strategy)
//       if (e.status === 409) {
//         const latest = await this.db.get(docId);
//         doc._rev = latest._rev;
//         await this.db.put(doc);
//       } else {
//         throw e;
//       }
//     }
//   }

//   /**
//    * Retrieves the running_items document from PouchDB by RecieptNumber (invoiceid).
//    * Returns a Promise resolving to the items array, or [] if not found.
//    */
//   async getItem() {
//     return this.db.get('item_1');
//   }
//   async createIndex() {
//     await this.db.createIndex({
//       index: { fields: ['type'] }
//     });
//   }
//   async getItems() {
//     return this.db.find({
//       selector: { type: 'item' }
//     });
//   }
//   async updateItem() {
//     const doc = await this.db.get('item_1');
  
//     return this.db.put({
//       ...doc,
//       price: 25
//     });
//   }
//   async deleteProduct() {
//     const doc = await this.db.get('item_1');
//     return this.db.remove(doc);
//   }
 
  
//   async addProduct() {
//     // return this.db.put({
//     //   _id: 'product_1',
//     //   type: 'product',
//     //   SelectProductId: id,
//     //       ProductPrice: price,
//     //       ProductName: allPPItem.ProductName,
//     //       selectcategoryID: allPPItem.selectcategoryID,
//     //       categoryName: allPPItem.categoryName,
//     //       selectQtypeID: allPPItem.selectQtypeID,
//     //       QtypeName: allPPItem.QtypeName,
//     //       selectSubQuantityTypeID: allPPItem.selectSubQuantityTypeID,
//     //       SubQuantityTypeName: SubQuantityTypeName,
//     //       quntityvalue: val,
//     //       qvalue: val,
//     //       taxnames: '',
//     //       taxvalues: '',
//     //       totaltaxvalue: taxpercent,
//     //       paidStatus: false,
//     //       AddOnItems: []
//     // });
//   }
//   async getRunningItemsByReceiptNumber(receiptNumber: string): Promise<RunningItems[] | []> {
//     const docId = `invoice_${receiptNumber}`;
//     try {
//       const doc = await this.db.get(docId);
//      // return Array.isArray(doc.items) ? doc.items : [];
//      return Array.isArray(doc) ? doc : [];
//     } catch (e: any) {
//       if (e.status === 404) {
//         return [];
//       } else {
//         throw e;
//       }
//     }
//   }


//   ReturnRunningItems_!: RunningItems;
//   loadfood(invoiceid: string): any {
//     let RunningItems = [];
//     return this.db.allDocs({ include_docs: true }).then((runningItemsTable: any) => {
//       let runningItemsData: any[] = [];
//       try {
//         if (runningItemsTable && Array.isArray(runningItemsTable.rows)) {
//           runningItemsData = runningItemsTable.rows.map((row: any) => row.doc);
//         } else {
//           runningItemsData = [];
//         }
//         this.ReturnRunningItems_ = this.intializeRunningItem(runningItemsData) as RunningItems;
//         return this.ReturnRunningItems_;
//       } catch (e) {
//         runningItemsData = [];
//         RunningItems = [];
//         return this.ReturnRunningItems_;
//       }
//     });
//   }

//   addondataarr: any;
//   itemtotalamount: any;
//   totalamount: any;

//   intializeRunningItem(Itemsdata: any): RunningItems {
//     this.addondataarr = [];
//     this.itemtotalamount = 0;
//     this.totalamount = 0;

//     this.RunningItems_ = [];
//     (Itemsdata || []).forEach((item: any) => {
//       this.RunningItems_.push({
//         SelectProductId: item.SelectProductId,
//         ProductPrice: item.ProductPrice?.toString() ?? '0',
//         ProductName: item.ProductName,
//         selectcategoryID: item.selectcategoryID,
//         categoryName: item.categoryName,
//         selectQtypeID: item.selectQtypeID,
//         QtypeName: item.QtypeName,
//         selectSubQuantityTypeID: item.selectSubQuantityTypeID,
//         SubQuantityTypeName: item.SubQuantityTypeName,
//         quntityvalue: item.quntityvalue,
//         qvalue: item.qvalue,
//         taxnames: "",
//         taxvalues: 'taxpercentValues',
//         totaltaxvalue: 0,
//         AddOnItems: item.AddOnItems || [],
//         paidStatus: false
//       });
//       this.itemtotalamount += (item.ProductPrice || 0) * (item.quntityvalue || 0);
//       this.totalamount += (parseFloat(item.ProductPrice) || 0) * (item.quntityvalue || 0);
//     });
//     return this.RunningItems_ as unknown as RunningItems;
//   }

//   deleteRunningItem(d: any): void {
//     if (!d.quntityvalue || d.quntityvalue > 1) {
//       d.quntityvalue = 1;
//     }
//   }

//   onQuantityChange(d: any): void {
//     if (!d.quntityvalue || d.quntityvalue < 1) {
//       d.quntityvalue = 1;
//     }
//   }
// }
