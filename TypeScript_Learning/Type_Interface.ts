type ChaiOrder ={
  name: string;
  suger: number;
  strong: boolean;
}


function makeChai (order: ChaiOrder){
  console.log(order);
  }

// makeChai({name: "Masala Chai", suger: 2, strong: true});

function makeCoffee(order: ChaiOrder){
  console.log(order);
}

// makeCoffee({name: "Espresso", suger: 0, strong: true});


type User = {
  name: string;
  age: number;
  email: string;
}

type Role ={
  role : "admin" |  "user" | "guest";
}


// Type Intersection
type UserWithRole = User & Role;

const user1: UserWithRole = {
  name: "Alice",
  age: 30,
  email: "alice@example.com",
  role: "admin"
};


const user2: UserWithRole ={
  name: "naim",
  age: 25,
  email: "naim@gmail.com",
  role: "user"
}



// Interface Works only with Object, array, function 


interface IUser {
  name: string;
  age: number;
  email: string;
}

interface IUser{
  role : "admin" |  "user" | "guest";
}

const user3: IUser = {
  name: "Mim",
  age: 28,  
  email: "mim@gmail.com",
  role: "guest"
}

console.log(user3);
