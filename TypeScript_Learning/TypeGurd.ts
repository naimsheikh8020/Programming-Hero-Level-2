type User = {
  name: string;
}

type Admin = {
  name: string;
  role: string;
}

function printPerson(person: User | Admin) {

  if ("role" in person) {

    console.log("Admin");
    console.log(person.role);

  } else {

    console.log("Normal User");
  }
}

printPerson({name: "Naim"});