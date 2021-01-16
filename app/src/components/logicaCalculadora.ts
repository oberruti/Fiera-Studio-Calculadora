import { commonStyleResources } from "utils/style"

export enum SYMBOLS {
    sum = '+',
    subtract = '-',
    division = '/',
    multiplication = 'X',
    nan = 'nan',
    error = 'ERROR',
    equal = '=',
    clean = 'C',
}

export function getValueToShow(value: string, lastValue: string, onePValue: string, twoPValue: string): {valueToShow: string, lValue: string, onePValue: string, twoPValue: string} {
    let result = '0'
    switch(value){
        case SYMBOLS.sum:
        case SYMBOLS.subtract:
        case SYMBOLS.division:
        case SYMBOLS.multiplication: {
            const areTwoSymbolsInRow = isSymbol(lastValue)
            if(areTwoSymbolsInRow) {
                return errorTwoSymbols
            }
            const isIndirectOperation = !isSymbol(twoPValue) && isSymbol(onePValue)
            if (isIndirectOperation) {
                result = getResultByValues(onePValue, lastValue, twoPValue)
                if (result === SYMBOLS.error) {
                    return errorTwoSymbols
                }
                return {
                    valueToShow: result,
                    lValue: value,
                    onePValue: result,
                    twoPValue: SYMBOLS.nan,
                }
            }
            return {
                valueToShow: value,
                lValue: value,
                onePValue: lastValue,
                twoPValue: onePValue,
            }
        }
        case SYMBOLS.equal:{
            const areTwoSymbolsInRow = isSymbol(lastValue) 
            if(areTwoSymbolsInRow) {
                return errorTwoSymbols
            }
            result = getResultByValues(onePValue, lastValue, twoPValue)
            if (result === SYMBOLS.error) {
                return errorTwoSymbols
            }
            return {
                valueToShow: result,
                lValue: result,
                onePValue: SYMBOLS.nan,
                twoPValue: SYMBOLS.nan,
            }
        }
        case SYMBOLS.clean:
            return {
                valueToShow: '0',
                lValue: '0',
                onePValue: SYMBOLS.nan,
                twoPValue: SYMBOLS.nan
            }
        default:{
            const isNotInitialZero = !(lastValue==='0' && isSymbol(onePValue) && isSymbol(twoPValue))
            const isNumber = !isSymbol(lastValue)
            if(isNumber && isNotInitialZero ) {
                return {
                    valueToShow: lastValue + value,
                    lValue: lastValue + value,
                    onePValue: onePValue,
                    twoPValue: twoPValue,
                }
            }
            return {
                valueToShow: value,
                lValue: value,
                onePValue: lastValue,
                twoPValue: onePValue,
            }
        }
    }
}

function getResultByValues(onePValue: string, lastValue: string, twoPValue: string ): string {
    switch(onePValue) {
        case SYMBOLS.sum:
            return getSuma(lastValue, twoPValue)
        case SYMBOLS.subtract:
            return getResta(twoPValue, lastValue)
        case SYMBOLS.multiplication:
            return getMultiplicacion(lastValue, twoPValue)
        case SYMBOLS.division:
            return getDivision(twoPValue, lastValue)
        case '0':
        case SYMBOLS.nan:
            return lastValue
        default:
            return SYMBOLS.error
    }
}

function getSuma(valueOne: string, valueTwo: string): string {
    return (Number.parseFloat(valueOne) + Number.parseFloat(valueTwo)).toString()
}

function getResta(valueOne: string, valueTwo: string): string {
    return (Number.parseFloat(valueOne) - Number.parseFloat(valueTwo)).toString()
}

function getDivision(valueOne: string, valueTwo: string): string {
    return (Number.parseFloat(valueOne) / Number.parseFloat(valueTwo)).toString()
}

function getMultiplicacion(valueOne: string, valueTwo: string): string {
    return (Number.parseFloat(valueOne) * Number.parseFloat(valueTwo)).toString()
}

const errorTwoSymbols = {
    valueToShow: SYMBOLS.error,
    lValue: '0',
    onePValue: '0',
    twoPValue: '0'
}

function isSymbol(value: string): boolean {
    switch(value){
        case SYMBOLS.sum:
        case SYMBOLS.subtract:
        case SYMBOLS.division:
        case SYMBOLS.multiplication:
        case SYMBOLS.nan:
        case SYMBOLS.equal:
            return true
        default:
            return false
    }
}

interface Botones {
    boton: string
    gridRowStart: number
    gridRowEnd: number
    gridColumnStart: number
    gridColumnEnd: number
    color?: string
}

export function getBotones(): Botones[] {
    return [
        {
            boton: SYMBOLS.clean,
            gridRowStart: 1,
            gridRowEnd: 1,
            gridColumnStart: 1,
            gridColumnEnd: 4
        },
        {
            boton: SYMBOLS.division,
            gridRowStart: 1,
            gridRowEnd: 1,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },
        {
            boton: SYMBOLS.multiplication,
            gridRowStart: 2,
            gridRowEnd: 2,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },
        {
            boton: SYMBOLS.sum,
            gridRowStart: 3,
            gridRowEnd: 3,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },{
            boton: SYMBOLS.subtract,
            gridRowStart: 4,
            gridRowEnd: 4,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },{
            boton: SYMBOLS.equal,
            gridRowStart: 5,
            gridRowEnd: 5,
            gridColumnStart: 4,
            gridColumnEnd: 4,
            color: commonStyleResources.colors.yellow
        },
        {
            boton: '0',
            gridRowStart: 5,
            gridRowEnd: 5,
            gridColumnStart: 1,
            gridColumnEnd: 4
        },
        {
            boton: '1',
            gridRowStart: 4,
            gridRowEnd: 4,
            gridColumnStart: 1,
            gridColumnEnd: 1
        },
        {
            boton: '2',
            gridRowStart: 4,
            gridRowEnd: 4,
            gridColumnStart: 2,
            gridColumnEnd: 2
        },
        {
            boton: '3',
            gridRowStart: 4,
            gridRowEnd: 4,
            gridColumnStart: 3,
            gridColumnEnd: 3
        },
        {
            boton: '4',
            gridRowStart: 3,
            gridRowEnd: 3,
            gridColumnStart: 1,
            gridColumnEnd: 1
        },
        {
            boton: '5',
            gridRowStart: 3,
            gridRowEnd: 3,
            gridColumnStart: 2,
            gridColumnEnd: 2
        },
        {
            boton: '6',
            gridRowStart: 3,
            gridRowEnd: 3,
            gridColumnStart: 3,
            gridColumnEnd: 3
        },
        {
            boton: '7',
            gridRowStart: 2,
            gridRowEnd: 2,
            gridColumnStart: 1,
            gridColumnEnd: 1
        },
        {
            boton: '8',
            gridRowStart: 2,
            gridRowEnd: 2,
            gridColumnStart: 2,
            gridColumnEnd: 2
        },
        {
            boton: '9',
            gridRowStart: 2,
            gridRowEnd: 2,
            gridColumnStart: 3,
            gridColumnEnd: 3
        }]
}