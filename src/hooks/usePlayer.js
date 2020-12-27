import { useState, useCallback } from 'react'

import { checkCollision, STAGE_WIDTH } from '../gameHelper'
import { TETROMINOS, randomTetromino } from '../tetrominos'

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos:{x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    })

    const rotate = (matrix, dir) => {
        const n = matrix.length
        const x = Math.floor(n/2)
        const y = n-1
        let newMatrix = Array(n).fill(Array(n).fill(0))
        console.log(`dir is ${dir}`)
        console.log(matrix)
        for(let i = 0; i < x; i++) {
            for(let j = i; j < y-i; j++) {
                if(dir === 1) {
                    const k = matrix[i][j];
                    matrix[i][j] = matrix[y - j][i];
                    matrix[y - j][i] = matrix[y - i][y - j];
                    matrix[y - i][y - j] = matrix[j][y - i]
                    matrix[j][y - i] = k
                } else if(dir === -1) {
                    const k = matrix[i][j]
                    matrix[i][j] = matrix[j][y - i]
                    matrix[j][y - i] = matrix[y - i][y - j]
                    matrix[y - i][y - j] = matrix[y - j][i]
                    matrix[y - j][i] = k
                }
            }
        }
        // console.log(newMatrix)
        // return newMatrix
    }

    const rotatePlayer = (stage, dir) => {
        const cloned = {...player}
        // cloned.tetromino = 
        rotate(cloned.tetromino, dir)
        
        const pos = cloned.pos.x
        let offset = 1

        while(checkCollision(cloned, stage, {x: 0, y: 0})) {
            cloned.pos.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))
            if(offset > cloned.tetromino[0].length) {
                // rotate(cloned.tetromino, -dir)
                // cloned.pos.x = pos
                return
            }
        }

        setPlayer(cloned)
    }

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer((prevState) => ({
            ...prevState,
            pos:{ x: (prevState.pos.x + x), y: (prevState.pos.y + y) },
            collided
        }))
    }

    // const resetPlayer = () => {
    //     setPlayer({
    //         pos: {x: STAGE_WIDTH/2 - 2, y: 0},
    //         tetromino: randomTetromino().shape,
    //         collided: false
    //     })
    // }


    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH/2 - 2, y: 0},
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, rotatePlayer]
}