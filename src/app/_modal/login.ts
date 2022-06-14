export interface Login {
  success: number;
  token: string;
  status: number;
  message: string;
  group: Array<LoginGroup>;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TokenLifeEndDate: TokenLifeEndDate;
}

export interface LoginGroup {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  group_id: string;
  groupName: string;
}


export interface TokenLifeEndDate {
  date: string;
  timezone: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  timezone_type: string;
}
