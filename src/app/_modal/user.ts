export class User {
  imie? = '';
  nazwisko = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nr_indeksu = '';
  tytul = '';
  email = '';
  haslo = '';
  haslo2 = '';

  imieGood = false;
  nazwiskoGood = false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nr_indeksuGood = false;
  tytulGood = false;
  emailGood = false;
  hasloGood = false;
  haslo2Good = false;
  status: Status = 0;

  checkPassword(): boolean {
    return this.haslo === this.haslo2;
  }

  checkData(): boolean {

    this.imieGood = true;
    this.nazwiskoGood = true;
    this.nr_indeksuGood = true;
    this.tytulGood = true;
    this.emailGood = true;
    this.hasloGood = true;
    this.haslo2Good = true;
    let good = true;

    if (this.imie.length < 2) {
      this.imieGood = false;
      good = false;
    }
    if (this.nazwisko.length < 2) {
      this.nazwiskoGood = false;
      good = false;
    }
    if (this.nr_indeksu.length < 2) {
      this.nr_indeksuGood = false;
      good = false;
    }
    if (this.tytul.length < 2) {
      this.tytulGood = false;
      good = false;
    }
    if (this.email.length < 2) {
      this.emailGood = false;
      good = false;
    }
    if (this.haslo.length < 2) {
      this.hasloGood = false;
      good = false;
    }
    if (this.haslo2.length < 2) {
      this.haslo2Good = false;
      good = false;
    }
    return good;
  }
}


export enum Status {
  student,
  pracownik,
  wykladowca,
}
