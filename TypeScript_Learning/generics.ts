// dynamicaly generalize


type GenericArray<T> = Array<T>;


// const friends : string[] = ["Alice", "Bob", "Charlie"];
const friends : GenericArray<string> = ["Alice", "Bob", "Charlie"];

// const roleNumber : number[] = [1, 2, 3];
const roleNumber : GenericArray<number> = [1, 2, 3];

// const isElegible : boolean[] = [true, false, true];
const isElegible : GenericArray<boolean> = [true, false, true];


type Coordinate <X, Y> = [X, Y];

const point1 : Coordinate<number, number> = [10, 20];
const point2 : Coordinate<string, string> = ["10", "20"];