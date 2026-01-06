import { Injectable } from '@angular/core';
import { PouchDB } from './pouchdb';
//const db = new PouchDB('food-db');
@Injectable({
  providedIn: 'root'
})
export class RunningItemsPouchdbService {

  private db: any;

  constructor() {
    // Initialize a PouchDB instance named 'running_items'
    // if (typeof PouchDB !== 'function') {
    //   throw new Error('PouchDB import failed or is not a constructor.');
    // }
    // this.db = new PouchDB('running_items');
    

  }

  /** Add document */
  add(item: any) {
    
    const doc = {
      _id: new Date().toISOString(),
      ...item
    };
    console.log(doc);
    return this.db.put(doc);
  }

  /** Get all documents */
  getAll() {
    return this.db.allDocs({
      include_docs: true
    }).then((result: any) => result.rows.map((row: any) => row.doc));
  }
  /**
   * Get running items (documents) by receiptNumber (invoiceid)
   * @param receiptNumber Invoice or receipt number to filter running items.
   * @returns Promise<any[]> matching running items docs
   */
  get(receiptNumber: string): Promise<any[]> {
    return this.db
      .allDocs({
        include_docs: true
      })
      .then((result: any) =>
        result.rows
          .map((row: any) => row.doc)
          .filter(
            (doc: any) =>
              doc &&
              (doc.receiptNumber === receiptNumber ||
                doc.invoiceid === receiptNumber ||
                doc.invoiceId === receiptNumber)
          )
      );
  }

  /** Update document */
  /**
   * Update a document by receiptNumber (invoiceid)
   * @param receiptNumber The receipt number to find the document
   * @param updates The fields to update
   * @returns Promise<any> The result of the update operation
   */
  async updateByReceiptNumber(receiptNumber: string, updates: Partial<any>) {
    // Find the doc with matching receiptNumber/invoiceid/invoiceId
    const docs = await this.db.allDocs({ include_docs: true });
    const toUpdate = docs.rows
      .map((row: any) => row.doc)
      .find(
        (doc: any) =>
          doc &&
          (doc.receiptNumber === receiptNumber ||
            doc.invoiceid === receiptNumber ||
            doc.invoiceId === receiptNumber)
      );
    if (!toUpdate) {
      throw new Error(`Document with receiptNumber "${receiptNumber}" not found`);
    }
    const updatedDoc = {
      ...toUpdate,
      ...updates,
      _id: toUpdate._id,
      _rev: toUpdate._rev
    };
    return this.db.put(updatedDoc);
  }

  /** Delete document */
  delete(doc: any) {
    return this.db.remove(doc);
  }
}
