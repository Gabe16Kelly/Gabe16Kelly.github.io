class uiScene extends Phaser.Scene{
    constructor(){
        super({key: "uiScene", active: true})
    }
    create(){
        console.log("ui");
        this.score = 0
        this.Highscore = 0

        this.scoreText = this.add.text(500, 20, "Score:" + this.score, {font:"38px", fill:"#ffffff"})
        this.HighScoreText = this.add.text(500, 80, "Highscore:" + this.Highscore, {font:"38px", fill:"#ffffff"})

        this.healthbar = new HealthBar(this, 40, 54, 300)

    }

    updateScore(){
        this.score += 100
        this.scoreText.setText("Score: "+this.score)

        if(this.score>this.Highscore){
            this.Highscore += 100
        this.HighScoreText.setText("Highscore: "+this.Highscore)

        }

        
    }

    reset(){
        this.score = 0;
        this.scoreText.setText("Score: "+this.score)
        this.healthbar.updateHealth(300)
    }
}