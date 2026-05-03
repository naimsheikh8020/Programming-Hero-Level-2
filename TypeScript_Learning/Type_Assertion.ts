let something: unknown = "Hello";

let message = something as string;

console.log(message.length); // works


//Not working example
let box: unknown = 100;

let text = box as string;

console.log(text.length); // 💥 crash