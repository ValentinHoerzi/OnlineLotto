import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CurrentRound } from "../models/currentRound.dto";
import { LastRound } from "../models/lastRound.dto";
import { Ranks } from "../models/ranks.dto";
import { TipAddReply } from "../models/tipAddReply.dto";
import { Win } from "../models/win.dto";
import { share } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LottoService {
  tipAddReplySubject: BehaviorSubject<TipAddReply> = new BehaviorSubject({
    roundId: 41,
    status: "OK",
    tipId: 248,
    msg: "This is a custom object",
  });

  constructor(private httpClient: HttpClient) {}

  getCurrentRound(): Observable<CurrentRound> {
    return this.httpClient
      .get<CurrentRound>(`${environment.API}/GetCurrentRound`)
      .pipe(share());
  }

  getLastRound(): Observable<LastRound> {
    return this.httpClient
      .get<LastRound>(`${environment.API}/GetLastDrawnRoundData`)
      .pipe(share());
  }

  getRankList(): Observable<Ranks> {
    return this.httpClient
      .get<Ranks>(`${environment.API}/Ranklist`)
      .pipe(share());
  }

  getWinsofUser(userId: number, pwd: string): Observable<Win> {
    return this.httpClient
      .get<Win>(`${environment.API}/GetWinsofUser?userId=${userId}&pwd=${pwd}`)
      .pipe(share());
  }

  sendTip(
    userId: number,
    pwd: string,
    z1: number,
    z2: number,
    z3: number,
    z4: number,
    z5: number,
    z6: number
  ): Observable<TipAddReply> {
    return this.httpClient
      .post<TipAddReply>(
        `${environment.API}/AddTip?userId=${userId}&pwd=${pwd}&z1=${z1}&z2=${z2}&z3=${z3}&z4=${z4}&z5=${z5}&z6=${z6}`,
        null
      )
      .pipe(share());
  }

  getDrawnRoundData(roundId: number): Observable<LastRound> {
    return this.httpClient
      .get<LastRound>(`${environment.API}/GetDrawnRoundData?roundId=${roundId}`)
      .pipe(share());
  }

  getWinsOfRound(roundId: number): Observable<Win> {
    return this.httpClient
      .get<Win>(`${environment.API}/GetWinsOfRound?roundId=${roundId}`)
      .pipe(share());
  }

  subToTipAddReplySubject(): Observable<TipAddReply> {
    return this.tipAddReplySubject.asObservable();
  }

  nextToTipAddReplySubject(dto: TipAddReply) {
    this.tipAddReplySubject.next(dto);
  }
}
