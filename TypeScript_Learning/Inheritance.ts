class Student {
  name: string;
  age: number;
  address: string;

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  sleepHours(hours: number) {
    console.log(`${this.name} sleeps ${hours} hours a day`);
  }
}

// const naimStudent = new Student("Naim", 25, "Dhaka");

// naimStudent.sleepHours(8);



class Car {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

}

class ElectricCar extends Car{
  batteryCapacity: number;

  constructor(brand: string, model: string, year: number, batteryCapacity: number) {
    super(brand, model, year);
    this.batteryCapacity = batteryCapacity;
  }
}

const tesla = new ElectricCar("Tesla", "Model S", 2022, 100);

console.log(tesla.brand);
console.log(tesla.model);
console.log(tesla.year);
console.log(tesla.batteryCapacity);