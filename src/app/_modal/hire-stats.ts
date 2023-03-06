export class HireStats {
  sredniCzasWypozyczenia: number = 0;
  iloscWypozyczen: number = 0;
  maksymalnyCzasWypozyczenia = 0;
  maksymalnyPrzekroczonyCzasOddania = 0;

  sredniCzasWypozyczeniaWDniach() {
    return Math.round((this.sredniCzasWypozyczenia / 86400));
  }

  maksymalnyCzasWypozyczeniaWDniach() {
    return Math.round((this.maksymalnyCzasWypozyczenia / 86400));
  }

  maksymalnyPrzekroczonyCzasOddaniaWDniach() {
    if (this.maksymalnyCzasWypozyczenia > 0) {
      return Math.round((this.maksymalnyCzasWypozyczenia / 86400));
    } else {
      return 0;
    }
  }
}
