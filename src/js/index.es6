class Person {
  constructor(name) {
    this.name = name;
  }
  showName() {
    console.log(this.name);
  }
}

class ZhangSan extends Person {
  constructor(name) {
    super(name);
  }
}