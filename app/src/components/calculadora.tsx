import React, { useCallback, useState } from 'react'
import { JustChildren, Style } from '../utils/tsTypes'
import { commonStyleResources } from '../utils/style'

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

    const onClickButton = useCallback((value: string) => {
        // const valueToShow = getValueToShow(value)
        // setResult(valueToShow)
    }, [result, setResult])

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

interface Botones {
    boton: string
    gridRowStart: number
    gridRowEnd: number
    gridColumnStart: number
    gridColumnEnd: number
    color?: string
}

function getBotones(): Botones[] {
    return [
        {
            boton: 'C',
            gridRowStart: 1,
            gridRowEnd: 1,
            gridColumnStart: 1,
            gridColumnEnd: 4
        },
        {
            boton: '%',
            gridRowStart: 1,
            gridRowEnd: 1,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },
        {
            boton: 'X',
            gridRowStart: 2,
            gridRowEnd: 2,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },
        {
            boton: '+',
            gridRowStart: 3,
            gridRowEnd: 3,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },{
            boton: '-',
            gridRowStart: 4,
            gridRowEnd: 4,
            gridColumnStart: 4,
            gridColumnEnd: 4
        },{
            boton: '=',
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

export default Calculadora;