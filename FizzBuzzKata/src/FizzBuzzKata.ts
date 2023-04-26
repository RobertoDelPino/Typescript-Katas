export function checkNumber(aNumber: number) : String{
    let result = "";

    if(aNumber % 3 == 0){
        result += "Fizz";
    }

    if(aNumber.toString().indexOf("3") != -1){
        result += "Fizz";
    }

    if(aNumber % 5 == 0){
        result += "Buzz"
    }

    if(aNumber.toString().indexOf("5") != -1){
        result += "Buzz";
    }

    return result;
}


