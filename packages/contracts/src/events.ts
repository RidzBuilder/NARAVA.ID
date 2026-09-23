export interface EventEnvelope {
  event_id:string;
  type:string;
  aggregate:{type:string;id:string;version:number};
  actor:{type:string;id:string};
  time:string;
  payload:unknown;
  metadata:Record<string,string>;
  correlation_id:string;
  causation_id?:string;
}
