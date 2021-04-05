import { Reply } from "./reply.dto";

export class LastRound extends Reply {
  roundId: number;
  started: string;
  finished: string;
  z1: number;
  z2: number;
  z3: number;
  z4: number;
  z5: number;
  z6: number;
}
