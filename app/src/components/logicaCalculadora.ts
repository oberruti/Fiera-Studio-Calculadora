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

export function getValueToShow(lastValue: string, previousValue: string, twoPreviousValue: string, threePreviousValue: string): {valueToShow: string, newLastValue: string, newTwoPreviousValue: string, newThreePreviousValue: string} {
    let result = '0'
    switch(lastValue){
        case SYMBOLS.sum:
        case SYMBOLS.subtract:
        case SYMBOLS.division:
        case SYMBOLS.multiplication: {
            const areTwoSymbolsInRow = isSymbol(previousValue)
            if(areTwoSymbolsInRow) {
                return errorTwoSymbols
            }
            const isIndirectOperation = !isSymbol(threePreviousValue) && isSymbol(twoPreviousValue)
            if (isIndirectOperation) {
                result = getResultByValues(twoPreviousValue, previousValue, threePreviousValue)
                if (result === SYMBOLS.error) {
                    return errorTwoSymbols
                }
                return {
                    valueToShow: result,
                    newLastValue: lastValue,
                    newTwoPreviousValue: result,
                    newThreePreviousValue: SYMBOLS.nan,
                }
            }
            return {
                valueToShow: lastValue,
                newLastValue: lastValue,
                newTwoPreviousValue: previousValue,
                newThreePreviousValue: twoPreviousValue,
            }
        }
        case SYMBOLS.equal:{
            const areTwoSymbolsInRow = isSymbol(previousValue) 
            if(areTwoSymbolsInRow) {
                return errorTwoSymbols
            }
            result = getResultByValues(twoPreviousValue, previousValue, threePreviousValue)
            if (result === SYMBOLS.error) {
                return errorTwoSymbols
            }
            return {
                valueToShow: result,
                newLastValue: result,
                newTwoPreviousValue: SYMBOLS.nan,
                newThreePreviousValue: SYMBOLS.nan,
            }
        }
        case SYMBOLS.clean:
            return {
                valueToShow: '0',
                newLastValue: '0',
                newTwoPreviousValue: SYMBOLS.nan,
                newThreePreviousValue: SYMBOLS.nan
            }
        default:{
            const isNotInitialZero = !(previousValue==='0' && isSymbol(twoPreviousValue) && isSymbol(threePreviousValue))
            const isNumber = !isSymbol(previousValue)
            if(isNumber && isNotInitialZero ) {
                return {
                    valueToShow: previousValue + lastValue,
                    newLastValue: previousValue + lastValue,
                    newTwoPreviousValue: twoPreviousValue,
                    newThreePreviousValue: threePreviousValue,
                }
            }
            return {
                valueToShow: lastValue,
                newLastValue: lastValue,
                newTwoPreviousValue: previousValue,
                newThreePreviousValue: twoPreviousValue,
            }
        }
    }
}

function getResultByValues(twoPreviousValue: string, previousValue: string, threePreviousValue: string): string {
    switch(twoPreviousValue) {
        case SYMBOLS.sum:
            return getSuma(threePreviousValue, previousValue)
        case SYMBOLS.subtract:
            return getResta(threePreviousValue, previousValue)
        case SYMBOLS.multiplication:
            return getMultiplicacion(threePreviousValue, previousValue)
        case SYMBOLS.division:
            return getDivision(threePreviousValue, previousValue)
        case '0':
        case SYMBOLS.nan:
            return previousValue
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
    newLastValue: '0',
    newTwoPreviousValue: '0',
    newThreePreviousValue: '0'
}

function isSymbol(lastValue: string): boolean {
    switch(lastValue){
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