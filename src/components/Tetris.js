import React, { useState } from 'react'

import { createStage, checkCollision } from '../gameHelper'

import { useStage } from '../hooks/useStage'
import { usePlayer } from '../hooks/usePlayer'
import { useInterval } from '../hooks/useInterval'
import { useGameStatus } from '../hooks/useGameStatus'

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer()
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

    console.log('re-render');

    useInterval(()=>drop(), dropTime)

    const movePlayer = (dir) => {
        if(!checkCollision(player, stage, {x: dir, y: 0})) {
            updatePlayerPos({x: dir, y: 0})
        }
    }

    const startGame = () => {
        // Reset everything
        setStage(createStage())
        setScore(0)
        setRows(0)
        setLevel(1)
        setDropTime(1000)
        resetPlayer()
        setGameOver(false)
    }

    const hardDrop = () => {
        let count = 0
        while(!checkCollision(player, stage, {x: 0, y: count})) {
            count++
        }

        count--;
        // game over
        if (player.pos.y+count < 1) {
            console.log("GAME OVER")
            setGameOver(true)
            setDropTime(null)
        }

        updatePlayerPos({x: 0, y: count, collided: true})
        increaseLevel()
    }

    const increaseLevel = () => {
        if(rows > (level + 1)*10) {
            setLevel(prev => prev + 1)
            setDropTime(1000 / (level + 1) + 200)
        }
    }

    const drop = () => {
        if(!checkCollision(player, stage, {x: 0, y: 1})) {
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else {
            // game over
            if (player.pos.y < 1) {
                console.log("GAME OVER")
                setGameOver(true)
                setDropTime(null)
            }
            updatePlayerPos({x: 0, y: 0, collided:true})
        }
        increaseLevel()
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver) {
            if(keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200)
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null)
        drop()
    }

    const move = ({ keyCode }) => {
        if(!gameOver) {
            switch(keyCode) {
                case 27:
                    startGame()
                    break;
                case 32:
                    hardDrop()
                    break;
                // left
                case 37:
                    movePlayer(-1)
                    break;
                // up
                case 38:
                    // TODO rotate
                    rotatePlayer(stage, 1)
                    break;
                // right
                case 39:
                    movePlayer(1)
                    break;
                // down
                case 40:
                    dropPlayer()
                    break;
                // z
                case 90:
                    rotatePlayer(stage, -1)
                default:
                    console.log(keyCode)
                    break;
            }
        }
    }

    return (
        <StyledTetrisWrapper
            role="main"
            tabIndex="0"
            onKeyDown={(e) => move(e)}
            onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                {gameOver ? (
                    <Display gameOver={gameOver} text="GameOver"/>
                ) : (
                    <>
                        <Display text={`Score: ${score}`}/>
                        <Display text={`Lines: ${rows}`}/>
                        <Display text={`Level: ${level}`}/>
                        <StartButton callback={startGame}/>
                    </>
                )}


                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris