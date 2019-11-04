import firebase from "firebase/app";
import { db } from "../firebase";

export class Doc<F> {
  private collection: string;
  protected Data: F;

  private id?: string;
  public get Id(): string {
    return this.id;
  }

  private loaded: boolean = false;
  public get Loaded(): boolean {
    return this.loaded;
  }

  constructor(collection: string, id?: string, props?: F) {

    this.collection = collection;
    if (id) this.id = id;
    if (props) this.Data = props;
    this.loaded = !!props;
  }

  async load() {
    if (this.id == null) return this.loaded = false;

    try {
      let snap = await db.collection(this.collection).doc(this.id).get();

      if (!snap.exists) throw new Error(`Document '${this.collection}[${this.id}]' doesn't exists.`);

      let data = snap.data();
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          this.Data[k] = data[k];
        }
      }

      return data;
    } catch (e) {
      console.log("Error getting Filme: ", e);
      return this.loaded = false;
    }

    return this.loaded = true;
  }
}

interface CollectionFilters {
  startAt: number;
  limit: number;
  orderBy?: [string, firebase.firestore.OrderByDirection],
  where?: [
    [string, firebase.firestore.WhereFilterOp, any]
  ]
}

export class Collection<I> {
  private collection: string;
  private lastDocs: I[] = [];
  private creator: (id: string, data: firebase.firestore.DocumentData) => I;

  public get LastDocs(): I[] {
    return this.lastDocs;
  }

  constructor(collection: string, creator: (id: string, data: firebase.firestore.DocumentData) => I) {
    this.collection = collection;
    this.creator = creator;
  }

  async load(filters: CollectionFilters = {
    startAt: 0,
    limit: 10
  }) {
    let promise = db.collection(this.collection)
      .orderBy(filters.orderBy[0], filters.orderBy[1])
      .startAt(filters.startAt)
      .limit(filters.limit);

    if (filters.where !== null)
      for (const [field, cond, value] of filters.where) {
        promise = promise.where(field, cond, value);
      }

    try {
      let snap = await promise.get();

      return this.lastDocs = snap.docs.map(doc => this.creator(doc.id, doc.data()));
    } catch (e) {
      console.log("Error getting Filmes: ", e);
      return false;
    }
  }
}
