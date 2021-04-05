import { Component, OnInit } from "@angular/core";
import { LottoService } from "../core/lotto.service";
import { StorageService } from "../core/storage.service";
import { CurrentRound } from "../models/currentRound.dto";
import { TipAddReply } from "../models/tipAddReply.dto";
import { User } from "../models/user.dto";

@Component({
  selector: "app-tip",
  templateUrl: "./tip.page.html",
  styleUrls: ["./tip.page.scss"],
})
export class TipPage implements OnInit {
  numbers: number[] = [0, 0, 0, 0, 0, 0];
  user: User;
  tipAddReply: TipAddReply;
  currentRound: CurrentRound;

  constructor(
    private storage: StorageService,
    private lottoService: LottoService
  ) {}

  ngOnInit() {
    this.lottoService
      .getCurrentRound()
      .subscribe((x) => (this.currentRound = x));
    this.lottoService
      .subToTipAddReplySubject()
      .subscribe((x) => (this.tipAddReply = x));
    this.storage.getUser().then((x) => (this.user = x));
  }

  onSendTip(): void {
    this.lottoService
      .sendTip(
        this.user.userId,
        this.user.password,
        this.numbers[0],
        this.numbers[1],
        this.numbers[2],
        this.numbers[3],
        this.numbers[4],
        this.numbers[5]
      )
      .subscribe((x) => this.lottoService.nextToTipAddReplySubject(x));
  }

  genRandomTip(): void {
    for (let i = 0; i < this.numbers.length; i++) {
      //also check for duplicates
      this.numbers[i] = Math.floor(Math.random() * 45) + 1;
    }
    if (this.getDuplicateArrayElements(this.numbers).length > 0) {
      console.log("Found duplicates!");
      this.genRandomTip();
    }
  }

  getDuplicateArrayElements(arr) {
    const sorted_arr = arr.slice().sort();
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }
}
