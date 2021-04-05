import { Component, OnInit } from "@angular/core";
import { ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import { StorageService } from "../core/storage.service";
import { Observable, Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LottoService } from "../core/lotto.service";
import { CurrentRound } from "../models/currentRound.dto";
import { LastRound } from "../models/lastRound.dto";
import { User } from "../models/user.dto";
import { TipAddReply } from "../models/tipAddReply.dto";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, ViewDidEnter, ViewDidLeave {
  currentRoundSub: Subscription;
  currentRound: CurrentRound;

  lastRoundSub: Subscription;
  lastRound: LastRound;

  user:User;

  tipAddReplySub: Subscription;
  tipAddReply: TipAddReply;

  constructor(
    private storage: StorageService,
    private lottoService: LottoService
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.storage.getUser().then(x => this.user = x);

    this.tipAddReplySub = this.lottoService.subToTipAddReplySubject().subscribe(x => this.tipAddReply = x);

    this.currentRoundSub = timer(0, 5000)
      .pipe(switchMap((_) => this.lottoService.getCurrentRound()))
      .subscribe((x) => (this.currentRound = x));

    this.lastRoundSub = timer(0, 10000)
      .pipe(switchMap((_) => this.lottoService.getLastRound()))
      .subscribe((x) => (this.lastRound = x));
  }

  ionViewDidLeave(): void {
    this.tipAddReplySub.unsubscribe();
    this.currentRoundSub.unsubscribe();
    this.lastRoundSub.unsubscribe();
  }
}
