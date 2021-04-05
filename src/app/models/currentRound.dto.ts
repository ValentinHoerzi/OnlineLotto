import { Reply } from "./reply.dto";

export class CurrentRound extends Reply {
  //{"Status":"OK","RoundId":9,"Started":"09-12-2013 11:32:31","NrTips":0}
  roundId: number;
  started: string;
  nrTips: number;
  nrUsers: number;
  nrTipsForFullRound: number;
}
