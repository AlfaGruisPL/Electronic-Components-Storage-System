export class Hire {
  public id?: number;
  public id_elementu?: number;
  public id_uzytkownika?: number;
  public od_kiedy?: string;
  public planowany_czas_oddania?: number;
  public kiedy_oddane?: number;
  public lokalizacja_przed_pobraniem?: number;
  public lokalizacja_po_oddaniu?: number | null;
  public nazwa_elementu?: string;
  public id_miejsca_przed?: number;
  public nazwa_miejsca_przed?: string;
  public id_miejsca_po?: number;
  public nazwa_miejsca_po?: string;


  constructor(id: number = 0, id_elementu: number = 0, id_uzytkownika: number = 0, od_kiedy: string = "",
              planowany_czas_oddania: number = 0, kiedy_oddane: number = 0, lokalizacja_przed_pobraniem: number = 0,
              lokalizacja_po_oddaniu: number | null = null, nazwa_elementu = '', id_miejsca_przed = 0,
              nazwa_miejsca_przed = '', id_miejsca_po = 0, nazwa_miejsca_po = '') {
    this.id = id;
    this.id_elementu = id_elementu;
    this.id_uzytkownika = id_uzytkownika;
    this.od_kiedy = od_kiedy;
    this.planowany_czas_oddania = planowany_czas_oddania;
    this.kiedy_oddane = kiedy_oddane;
    this.lokalizacja_przed_pobraniem = lokalizacja_przed_pobraniem;
    this.lokalizacja_po_oddaniu = lokalizacja_po_oddaniu;
    this.nazwa_elementu = nazwa_elementu;
    this.id_miejsca_przed = id_miejsca_przed;
    this.nazwa_miejsca_przed = nazwa_miejsca_przed;
    this.id_miejsca_po = id_miejsca_po;
    this.nazwa_miejsca_po = nazwa_miejsca_po;
  }

  timeToReturn(): number {
    if (this.id === 0) {
      return 0;
    }
    const hireTime = new Date(this.planowany_czas_oddania).getTime();
    var k = (new Date().getTime() - hireTime) / (1000 * 60 * 60 * 24);

    k = k * -1;
    return Math.round(k);
  }

  returnTime(): Date {
    if (this.id === 0) {
      return new Date();
    }

    const time = new Date(this.od_kiedy).getTime() + this.planowany_czas_oddania * 24 * 60 * 60;
    return new Date(time)
  }

  returnTimeExceeded(): number {
    return Math.round((new Date(this.kiedy_oddane).getTime() - new Date(this.od_kiedy).getTime()) / (1000 * 60 * 60 * 24)) - this.planowany_czas_oddania;
  }
}


