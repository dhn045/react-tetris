import React from 'react'

import { createStage } from '../gameHelper'

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'

const Tetris = () => {
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={createStage()}/>
                <aside>
                    <Display text="Score"/>
                    <Display text="Lines"/>
                    <Display text="Level"/>
                    <StartButton/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris