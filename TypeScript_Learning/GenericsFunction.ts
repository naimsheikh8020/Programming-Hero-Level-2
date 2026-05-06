const naim = (a: string) : string =>{
    return a;
}

console.log(naim("Naim"));

const pair = <T>(a: T, b: T): [T, T] => {
    return [a, b];
};

console.log(pair("Naim", "Islam"));