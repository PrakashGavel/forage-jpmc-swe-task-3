import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,    // (ask + bid) / 2
  price_def: number,
  ratio: number,        // price ABC / price DEF
  timestamp: Date,      // data timestamp for X axis
  upper_bound: number,  // + 0.05
  lower_bound: number,  // - 0.05
  trigger_alert: number | undefined,
}


export class DataManipulator {
     static generateRow(serverResponds: ServerRespond[]): Row {
        const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
        const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
        const ratio = priceABC / priceDEF;
        const upper_bound = 1 + 0.07;
        const lower_bound = 1 - 0.07;
        return {
          price_abc: priceABC,
          price_def: priceDEF,
          ratio,
          timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
                      serverResponds[0].timestamp : serverResponds[1].timestamp,
          upper_bound: upper_bound,
          lower_bound: lower_bound,
          trigger_alert: (ratio > upper_bound || ratio < lower_bound ) ? ratio : undefined,
        };
   }
}