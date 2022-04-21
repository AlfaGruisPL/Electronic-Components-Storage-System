export class Miejsce {
  id:string;
  id_rodzica:string|null;
  id_zdjecia:string|null;
  nazwa:string;

  constructor(id: string, id_rodzica: string, id_zdjecia: string, nazwa: string) {
    this.id = id;
    this.id_rodzica = id_rodzica;
    this.id_zdjecia = id_zdjecia;
    this.nazwa = nazwa;
  }
}
