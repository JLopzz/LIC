import firebase from "firebase/app";
import { db } from "../firebase";
import Document from "./document";

type CollectionProps = {
  collection: string,
  ensambler: (id: string, data: firebase.firestore.DocumentData) => T
}

type CollectionFilters = {
  startAt: number;
  limit: number;
  orderBy: [string, firebase.firestore.OrderByDirection],
  where?: [
    [string, firebase.firestore.WhereFilterOp, any]
  ]
}

export default class Collection<T> {
  private Collection: string;
  private lastDocs: T[] = [];
  private Ensambler: (id: string, data: firebase.firestore.DocumentData) => T;

  public get LastDocs(): T[] {
    return this.lastDocs;
  }

  constructor({
    collection,
    ensambler
  }: CollectionProps) {
    this.Collection = collection;
    this.Ensambler = ensambler;
  }

  async get({
    where,
    orderBy,
    startAt = 0,
    limit = 10
  }: CollectionFilters) {

    let promise = db.collection(this.Collection)
      .orderBy(orderBy[0], orderBy[1])
      .startAt(startAt)
      .limit(limit);

    if (Array.isArray(where))
      for (const [field, cond, value] of where) {
        promise = promise.where(field, cond, value);
      }

    try {
      let query = await promise.get();
      return this.lastDocs = query.docs.map(doc => this.Ensambler(doc.id, doc.data()));
    } catch (e) {
      console.log("Error getting documents: ", e);
      return false;
    }
  }
}
