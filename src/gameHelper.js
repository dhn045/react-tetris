export const STAGE_WIDTH = 12
export const STAGE_HEIGHT = 20

export const createStage = () => {
    return Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear']))
}

export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
    for(let y = 0; y < player.tetromino.length; y++) {
        for(let x = 0; x < player.tetromino[y].length; x++) {
            // check for non empty cell
            let futureY = y + player.pos.y + moveY
            let futureX = x + player.pos.x + moveX
            if(player.tetromino[y][x] !== 0) {
                // check movement inside of game area
                // should go through bottom of player area
                if(!stage[futureY] ||
                    // check move is inside game width
                    !stage[futureY][futureX] ||
                    // check cell set to clear
                    stage[futureY][futureX][1] !== 'clear') {
                    
                    return true
                }
            }
        }
    }
}