import { Component, OnInit } from "@angular/core";
import { LottoService } from "../core/lotto.service";
import { forkJoin, Observable } from "rxjs";
import { LastRound } from "../models/lastRound.dto";
import { map, switchMap } from "rxjs/operators";
import { Win } from "../models/win.dto";
import { RoundSummary } from "../models/roundSummary.dto";

@Component({
  selector: "app-drawings",
  templateUrl: "./drawings.page.html",
  styleUrls: ["./drawings.page.scss"],
})
export class DrawingsPage implements OnInit {

  roundSummaries: RoundSummary[] = [];

  constructor(private lottoService: LottoService) {}

  ngOnInit() {
    this.lottoService
      .getLastRound()
      .pipe(
        switchMap((x) => {
          const obsRoundData: Observable<LastRound>[] = [];
          const obsWinsForRound: Observable<Win>[] = [];

          for (let i = 6; i <= x.roundId; i++) {
            obsRoundData.push(this.lottoService.getDrawnRoundData(i));
          }
          for (let i = 6; i <= x.roundId; i++) {
            obsWinsForRound.push(this.lottoService.getWinsOfRound(i));
          }

          return forkJoin(forkJoin(obsRoundData), forkJoin(obsWinsForRound));
        }),
        map(x => {
          const summaries: RoundSummary[] = [];

          for (let index = 0; index < x[0].length; index++) {
            const round = x[0][index];
            const win = x[1][index];
            
            const roundSummary: RoundSummary = {round:round,win:win,};
            summaries.push(roundSummary);
          }

          return summaries;
        }),
        map(x => x.sort(x => x.round.roundId).reverse())
      )
      .subscribe(x => this.roundSummaries = x);
  }
}
