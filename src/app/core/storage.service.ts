import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { User } from "../models/user.dto";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private _storage: Storage;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    const user: User = { userName: "vhoerzi", userId: 291, password: "PC6459" };
    this._storage.set("user", user);
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  getUser(): Promise<User> {
    return this._storage?.get("user").then(x => x);
  }
}
