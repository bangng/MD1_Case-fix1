function levelUp() {
    let levelDone = true;

    // if all bricks are broken
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            levelDone = levelDone && !bricks[r][c].status
        }
    }
    if (levelDone) {
        WIN.play();
        if (level >= totalLevels) {
            showYouWin();
            game_over = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.5;
        resetBall();
        level++;
    }
}