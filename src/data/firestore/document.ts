import firebase from "firebase/app";
import { db } from "../firebase";

interface Doc<T extends {}> {
  readonly Loaded: boolean
  Data: () => T | null
  Id?: string
}

type DocumentProps<T> = {
  collection: string,
  id?: string,
  data: T | {}
}

export default class Document<T extends {}> implements Doc<T> {
  private Collection: string;
  protected data: T | null

  Id?: string;
  Data(): T | null {
    return this.data;
  }

  private loaded: boolean = false;
  public get Loaded(): boolean {
    return this.loaded;
  }

  constructor({
    collection,
    id,
    data
  }: DocumentProps<T>) {
    this.Collection = collection;
    this.Id = id;
    this.data = (data as T);
  }

  async get() {
    if (typeof this.Id !== "string") {
      this.loaded = false;
      return;
    }

    try {
      let doc = await db.collection(this.Collection).doc(this.Id).get();

      if (!doc.exists) throw new Error(`Document '${this.Collection}[${this.Id}]' doesn't exists.`);

      this.loaded = true;
      return this.data = (doc.data() as T);
    } catch (e) {
      console.log("Error getting document: ", e);
      return this.loaded = false;
    }
  }

  async push() {
    if (typeof this.Id === "string" || !this.data) {
      this.loaded = false;
      return;
    }

    try {
      let doc = await db.collection(this.Collection).add(this.data);

      this.loaded = true;
      return this.Id = doc.id;
    } catch (e) {
      console.log("Error pushing document: ", e);
      this.loaded = false;
    }
  }

  async merge() {
    if (typeof this.Id !== "string" || !this.data || !this.loaded)
      return;

    try {
      await db.collection(this.Collection).doc(this.Id).set(this.data);
    } catch (e) {
      console.log("Error merging document: ", e);
    }
  }
}
