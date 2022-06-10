export class QrOut {
  public text: string;
  public format: string;
  public mode?: QrMode;
  public id?: number;
}

export enum QrMode {
  element = 0,
  place = 1,

}
