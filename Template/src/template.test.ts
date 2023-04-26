

/*
*  DUDAS:
*  - Si la variable en el diccionario es nulo o vacio -> reemplazar por "" o lanzar error
*    - LANZAR ERROR
*
* 1. Input no tiene texto
* 2. Input tiene variable y diccionario también
* 3. Input tiene variable y no está en diccionario
* 4. Variable en el diccionario vacio, variable texto se cambia por "" (posible warning)
* 5. Variable en el diccionario nulo cuando se reemplaza se lanza error
* 6. Variable en el diccionar es un tipo que no se puede convertir en string. Lanzar error
* 7.
* */

function obtainVariablesFromInput(input){
// Obtener variables del texto
    const regex = /\${([^}]*)}/g;
    let match;
    const variablesFromInput: string[] = [];

    while ((match = regex.exec(input))) {
        // const variable = match[0]
        // const valor = match[1]
        // console.log(variable)
        // console.log(valor)
        variablesFromInput.push( match);
    }

    return variablesFromInput
}

function obtainVariablesFromDictionary(dictionary: {}) {
    return Object.keys(dictionary);
}

function checkVariablesFromInputInDictionary(variablesFromInput: string[], dictionaryVariables: string[]) {
    variablesFromInput.forEach((variable) => {
        const variableToFind = variable[1]
        const result = dictionaryVariables.find((value) => value === variableToFind)
        if(!result){
            throw new Error("Variable '" + variableToFind + "' is not in dictionary")
        }
    })
}

function templateReplace(input: string, dictionary: {}): string {
    if(input === ""){
        throw new Error("Input missing")
    }

    const variablesFromInput = obtainVariablesFromInput(input)

    if(variablesFromInput.length == 0){
        return input
    }

    const dictionaryVariables: string[] = obtainVariablesFromDictionary(dictionary);

    checkVariablesFromInputInDictionary(variablesFromInput, dictionaryVariables)

    variablesFromInput.forEach((variableToChange) => {
        const variableInText = variableToChange[0]
        const valueToReplace = dictionary[variableToChange[1]]
        if (valueToReplace === null) {
            throw new Error(`Variable '${variableToChange[1]}' is null.`)
        }

        if(valueToReplace === ""){
            console.warn(variableToChange[1] + " is empty")
        }
        input = input.replace(variableInText, valueToReplace)
    })

    return input
}

describe("template should", () => {
    it('throw error when input doesnt have text', function () {
        const input = ""
        const dictionary = {
            variable: ""
        }

        expect(() => templateReplace(input, dictionary)).toThrow("Input missing")
    });

    it('return same input when input doesnt contain variables', function () {
        const input = "hola"
        const dictionary = {}

        const result = templateReplace(input, dictionary)

        expect(result).toEqual(input)
    });

    it('throw error when input contain variable and doesnt exists in dictionary', function () {
        const input = "hola ${variable} adios algo ${variable2}"
        const dictionary = {}

        expect(() => templateReplace(input, dictionary)).toThrow("Variable 'variable' is not in dictionary")
    });

    it('return input with variable changed', function () {
        const input = "hola ${nombre}"
        const dictionary = {nombre : "Juan"}
        const result = templateReplace(input, dictionary)
        expect(result).toEqual("hola Juan")
    });

    it('return input with variables changed', function () {
        const input = "hola ${nombre} ${apellido} ${apellido2}"
        const dictionary = {nombre : "Juan", apellido: "Gomez", apellido2: ""}
        const result = templateReplace(input, dictionary)
        expect(result).toEqual("hola Juan Gomez ")
    });

    it('throw error when try to change a null dictionary value', function () {
        const input = "hola ${variable}"
        const dictionary = {variable: null}
        expect(() => templateReplace(input, dictionary)).toThrow("Variable 'variable' is null.")
    });
})