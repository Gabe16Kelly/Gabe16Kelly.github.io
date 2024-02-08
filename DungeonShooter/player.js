class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, health) {
        super(scene, x, y, texture);
        // had to do this to create a physics body
        scene.physics.add.existing(this);
        //set up the physics properties
        this.setCollideWorldBounds(true);

        this.health = health

        this.anims.create({
            key: "player-idle-down",
            frames: [{key: "player", frame: "walk-down-3.png"  }]
          })
        
          this.anims.create({
            key: "player-idle-up",
            frames: [{key: "player", frame: "walk-up-3.png"  }]
          })
        
          this.anims.create({
            key: "player-idle-side",
            frames: [{key: "player", frame: "walk-side-3.png"  }]
          })
        
          this.anims.create({
            key: "player-run-down",
            frames: this.anims.generateFrameNames("player", {start: 1, end: 8, prefix: "run-down-", suffix: ".png"}),
            repeat: -1,
            framRate: 15
          })
        
          this.anims.create({
            key: "player-run-up",
            frames: this.anims.generateFrameNames("player", {start: 1, end: 8, prefix: "run-up-", suffix: ".png"}),
            repeat: -1,
            framRate: 15
          })
        
          this.anims.create({
            key: "player-run-side",
            frames: this.anims.generateFrameNames("player", {start: 1, end: 8, prefix: "run-side-", suffix: ".png"}),
            repeat: -1,
            framRate: 15
          })

          scene.add.existing(this);
      
    }



    moveLeft(){
        player.setVelocityX(-200)
        player.anims.play("player-run-side", true);
  
        player.scaleX = -1;
        player.body.offset.x = 24;
    };

    moveRight() {
        player.setVelocityX(200);
        player.anims.play("player-run-side", true);
  
        player.scaleX = 1;
        player.body.offset.x = 8;
    };

    moveUp(){
        player.setVelocityY(-200)
        player.anims.play("player-run-up", true);
  
    };

    moveDown(){
        player.setVelocityY(200);
        player.anims.play("player-run-down", true);
    };
      
    idle(){
        player.setVelocity(0, 0);
        player.anims.play("player-idle-down");
    };







}       