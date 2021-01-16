import React, { useCallback, useState } from 'react'
import { JustChildren, Style } from '../utils/tsTypes'
import { commonStyleResources } from '../utils/style'
import { getBotones, getValueToShow} from './logicaCalculadora';

function Calculadora(): JSX.Element {
    const background: Style = {
        background: commonStyleResources.colors.yellow,
        minHeight: commonStyleResources.dimensions.backgroundHeight,
        minWidth: commonStyleResources.dimensions.backgroundWidth,
        paddingTop: '100px',
        display: 'flex',
        justifyContent: 'center',
    }

    const [result, setResult] = useState('0')
    const [lastValue, setLastValue] = useState('0')
    const [onePreviousValue, setOnePreviousValue] = useState('nan')
    const [twoPreviousValue, setTwoPreviousValue] = useState('nan')

    const onClickButton = useCallback(
        (value: string) => {
            const {valueToShow, lValue, onePValue, twoPValue} = getValueToShow(value, lastValue, onePreviousValue, twoPreviousValue )
            
            setResult(valueToShow)
            setLastValue(lValue)
            setOnePreviousValue(onePValue)
            setTwoPreviousValue(twoPValue)

        }, [
            result, lastValue, onePreviousValue, twoPreviousValue,
            setResult, getValueToShow, setLastValue, setOnePreviousValue, setTwoPreviousValue
        ]
    )

    return (
        <div style={background}>
            <Container>
                <Resultado resultado={result}/>
                <Botonera onClickButton={onClickButton} />
            </Container>
        </div>
    )
}

function Container(props: JustChildren): JSX.Element {
    const style: Style = {
        background: commonStyleResources.colors.gray,
        borderRadius: '10px',
        height: '500px',
        width: '300px',
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    )
}

function Resultado(props: {resultado: string}): JSX.Element {
    const style: Style = {
        height: '75px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
        borderBottomColor: commonStyleResources.colors.yellow,
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        color: 'white',
        fontSize: '60px',
        alignItems: 'flex-end',
        cursor: 'default',
        overflowWrap: 'normal',
        overflowX: 'hidden',
    }

    return (
        <div style={style}>
            {props.resultado}
        </div>
    )
}

function Botonera(props: {onClickButton:(value: string) => void}): JSX.Element {
    const style: Style = {
        height: '380px',
        padding: '10px',
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        alignItems: 'center',
        textAlign: 'center',
    }

    const botonesAMostrar = getBotones().map((boton, key) => {
        const [opacity, setOpacity] = useState('1')
        const style: Style = {
            gridRowStart: boton.gridRowStart,
            gridRowEnd: boton.gridRowEnd,
            gridColumnStart: boton.gridColumnStart,
            gridColumnEnd: boton.gridColumnEnd,
            color: boton.color ? boton.color : 'white',
            fontSize: '30px',
            cursor: 'pointer',
            opacity,
        }
        return (
            <div
                style={style}
                key={key}
                onMouseEnter={() => setOpacity('0.6')}
                onMouseLeave={() => setOpacity('1')}
                onClick={() => props.onClickButton(boton.boton)}
                >
                {boton.boton}
            </div>
        )
    })

    return (
        <div style={style}>
            {botonesAMostrar}
        </div>
    )
}

export default Calculadora;