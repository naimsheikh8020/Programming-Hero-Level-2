//Problem 1:
function filterEvenNumbers(numbers: number[]): number[] {
    return numbers.filter((num) => num % 2 === 0);
}

filterEvenNumbers([1, 2, 3, 4, 5, 6])

//Problem 2:
function reverseString(str: string): string {
    let reversed : string = "";

    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }

    return reversed
}

reverseString("typescript")

//Problem 3 
type StringOrNumber = string | number;

function checkType(value: StringOrNumber): string {
    return typeof value === "number" ? "Number": "String";
}

checkType(42)
checkType("Hello")

//problem 4 

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
const user = { id: 1, name: "John Doe", age: 21 };
console.log(getProperty(user, "name"));
