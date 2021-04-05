import { Component, OnInit } from '@angular/core';
import { LottoService } from '../core/lotto.service';
import { Ranks } from '../models/ranks.dto';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.page.html',
  styleUrls: ['./rank.page.scss'],
})
export class RankPage implements OnInit {

  ranks: Ranks;

  constructor(private lottoService: LottoService) { }

  ngOnInit() {
    this.lottoService.getRankList().subscribe(x => this.ranks = x);
  }

}
