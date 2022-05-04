export class Transfer {
  public id: number;
  public id_elementu: number;
  public id_uzytkownika: number;
  public kiedy: Date;
  public lokalizacja_po_przeniesieniu: number;
  public lokalizacja_przed_przeniesieniem: number;
  public id_miejsca_przed: string;
  public id_miejsca_po: string;
  public nazawa_miejsca_przed: string;
  public nazawa_miejsca_po: string;
  public nazwaElementu: string;

  constructor(id: number, id_elementu: number, id_uzytkownika: number, kiedy: Date, lokalizacja_po_przeniesieniu: number, lokalizacja_przed_przeniesieniem: number, id_miejsca_przed: string, id_miejsca_po: string, nazawa_miejsca_przed: string, nazawa_miejsca_po: string, nazwaElementu: string) {
    this.id = id;
    this.id_elementu = id_elementu;
    this.id_uzytkownika = id_uzytkownika;
    this.kiedy = kiedy;
    this.lokalizacja_po_przeniesieniu = lokalizacja_po_przeniesieniu;
    this.lokalizacja_przed_przeniesieniem = lokalizacja_przed_przeniesieniem;
    this.id_miejsca_przed = id_miejsca_przed;
    this.id_miejsca_po = id_miejsca_po;
    this.nazawa_miejsca_przed = nazawa_miejsca_przed;
    this.nazawa_miejsca_po = nazawa_miejsca_po;
    this.nazwaElementu = nazwaElementu;
  }


}
