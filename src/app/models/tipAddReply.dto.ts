import { Reply } from "./reply.dto";

export class TipAddReply extends Reply {
  roundId: number;
  tipId: number;
}
