export class ElementClass {
  id: number;
  nazwa: string;
  nazwa_oryginalna: string;
  opis: string;
  czyWypozyczone: string;
  sprawnosc: string;
  mozliwosc_wypozyczania: string;
  lokalizacjaIdMiejsca: string;
  id_lokalizacji_podstawowej: string;
  id_rodzica: string;
  nazwa_kategorii: string;
  nazwa_lokalizacji: string;
  nazwa_miejsca_podstawowego: string;
  id_lokalizacji?: number;
  id_zdjecia?: number;
  aktualnieWypozyczony?: string;
  wypozyczenieOczekujeNaPotwierdzenie?: string;
}
