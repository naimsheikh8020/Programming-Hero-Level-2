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
getProperty(user, "name")


//problem 5

interface Book {
    title: string;
    author: string;
    publishedYear: number;
}

interface ReadBook extends Book {
    isRead: boolean;
}

function toggleReadStatus(book: Book): ReadBook {
    return {
        ...book,
        isRead: true
    };
}

const myBook: Book = {
    title: "TypeScript Guide",
    author: "Jane Doe",
    publishedYear: 2024
};

toggleReadStatus(myBook);

//problem 6

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name, age);
        this.grade = grade;
    }

    getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}

const student = new Student("Alice", 20, "A");



// problem 7
function getIntersection(arr1: number[], arr2: number[]): number[] {

    const commonItems = arr1.filter((item) => 
        arr2.includes(item)
    );

    return [...new Set(commonItems)];
}

const result = getIntersection(
    [1, 2, 3, 4, 5],
    [3, 4, 5, 6, 7]
);

// console.log(result);

