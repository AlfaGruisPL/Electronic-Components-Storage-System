export class QrOut {
  public text: string;
  public format: string;
  public mode?: QrMode;
  public id?: number;
  public cancelled?: boolean;
}

export enum QrMode {
  element = 0,
  place = 1,
  other,

}
