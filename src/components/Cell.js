import React, { useState, useEffect } from 'react'
import { StyledCell } from './styles/StyledCell'
import { TETROMINOS, randomTetromino } from '../tetrominos'

const Cell = ({ type }) => {
    // const [type, setType] = useState(randomTetromino())

    // useEffect(() => {
    //     const interval = setInterval(()=>setType(randomTetromino), 1000)

    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])

    return (
        <StyledCell type={type} color={TETROMINOS[type].color}/>
    )
}

export default React.memo(Cell)