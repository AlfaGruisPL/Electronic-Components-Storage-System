export class User {
  id?;
  dataDolaczenia?;
  zarchiwizowany?: string;
  aktywny?: string;


  imie? = '';//'Korneliia';
  nazwisko = '';// 'Mushak';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nr_indeksu = '';//'s37269';
  tytul = '';
  email = '';//'s37219@s.pwste.edu.pl';
  haslo = ''; //'kK1!';
  haslo2 = '';// 'kK1!';

  imieGood = true;
  nazwiskoGood = true;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nr_indeksuGood = true;
  tytulGood = true;
  emailGood = true;
  hasloGood = true;
  haslo2Good = true;
  status: Status = 0;
  passwordRegCheckVal = false;
  checkPasswordVal = true;
  rok_zakonczenia = '';
  rok_rozpoczecia = '';
  numberReg = '#a8a8a8';
  bigReg = '#a8a8a8';
  smallReg = '#a8a8a8';
  specialReg = '#a8a8a8';


  checkEmail(): boolean {
    // eslint-disable-next-line eqeqeq
    if (this.email.length == 0) {
      return false;
    }
    const splited = this.email.split('pwste.edu.pl');
    if (splited == null) {
      return false;
    }
    if (splited[1] === undefined || splited[1].length > 0) {
      return false;

    }
    return true;
  }

  checkPassword(): boolean {
    this.checkPasswordVal = this.haslo === this.haslo2;
    return this.checkPasswordVal;
  }

  passwordRegCheck(): boolean {

    this.numberReg = 'green';
    this.bigReg = 'green';
    this.smallReg = 'green';
    this.specialReg = 'green';
    var allGood = true;
    if (this.haslo.match(/[A-Z]{1,}/) == null) {
      this.bigReg = 'red';
      allGood = false;
    }
    if (this.haslo.match(/[a-z]{1,}/) == null) {
      this.smallReg = 'red';
      allGood = false;
    }
    if (this.haslo.match(/[0-9]{1,}/) == null) {
      this.numberReg = 'red';
      allGood = false;
    }
    if (this.haslo.match(/[\!\@\#\$\%\^\&\*\(\)\_\+\=]{1,}/) == null) {
      this.specialReg = 'red';
      allGood = false;
    }
    return allGood
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
