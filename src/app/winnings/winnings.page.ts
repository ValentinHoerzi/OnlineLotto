import { Component, OnInit } from "@angular/core";
import { LottoService } from "../core/lotto.service";
import { StorageService } from "../core/storage.service";
import { pipe, from } from "rxjs";
import { switchMap } from "rxjs/operators";

import { User } from "../models/user.dto";
import { Win } from "../models/win.dto";

@Component({
  selector: "app-winnings",
  templateUrl: "./winnings.page.html",
  styleUrls: ["./winnings.page.scss"],
})
export class WinningsPage implements OnInit {
  win: Win;

  constructor(
    private lottoService: LottoService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    from(this.storage.getUser())
      .pipe(
        switchMap((x) => this.lottoService.getWinsofUser(x.userId, x.password))
      )
      .subscribe((x) => (this.win = x));
  }
}
