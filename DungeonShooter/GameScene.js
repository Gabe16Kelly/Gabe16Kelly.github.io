var cursors;
var player;
var keyboard;
var reticle;
var blood;
var lastTimeFired = 0;
var emitter;
var EnemiesKilled = 0



class GameScene extends Phaser.Scene {
  constructor() {
      super('GameScene')
  }
  
  
   preload() {
    this.load.image("tiles", "/assets/Tiles/TileSet.png");
    this.load.tilemapTiledJSON("map", "/assets/Tiles/DungeonDemo.json");

    this.load.atlas("player", "/assets/Player/spritesheet.png", "/assets/Player/PlayerAtlas.json");
    
    this.load.atlas("enemy", "/assets/Enemy/slime.png", "/assets/Enemy/slime.json");

    this.load.image("bullet", "/assets/Fireball.png");

    this.load.image("particle", "/assets/blood.png");

    this.load.audio("background", "/assets/Sound/Background.mp3");
    this.load.audio("fireball", "/assets/Sound/Fireball.mp3");
    this.load.audio("hit", "/assets/Sound/hit.mp3");
    this.load.audio("enemyDeath", "/assets/Sound/EnemyDeath.mp3");
    this.load.audio("teleport", "/assets/Sound/teleport.mp3");

    // Runs once, loads up assets like images and audio
  }//end of preload
  
   create() {
    //TILEMAP
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("TileSet", "tiles");

    const belowLayer = map.createLayer("Floor", tileset, 0, 0);
    const worldLayer = map.createLayer("Walls", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });

    //const debugGraphics = this.add.graphics().setAlpha(0.75);
    //worldLayer.renderDebug(debugGraphics, {
     // tileColor: null, // Color of non-colliding tiles
     /// collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
     // faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
   // });

    //------PLAYER------
    player = new Player(this, 128, 128, "player", 300);
    player.body.setSize(player.width * 0.5, player.height * 0.8);

    this.cameras.main.startFollow(player);
    
    keyboard = this.input.keyboard.addKeys("W, A, S, D");
      
    this.physics.add.collider(player, worldLayer);
    console.log(player.health);

    this.cameras.main.zoom = 3.5;


    //---------ENEMY-------


    this.enemy = new Enemy(this, 200, 200, "enemy", 10, "wandering").setTint(0x5AFF00);
    this.physics.add.collider(this.enemy, worldLayer)

    this.enemy2 = new enemyFollow(this, 180, 180, "enemy", 10, "follow").setTint(0xFC00FF);
    this.physics.add.collider(this.enemy2, worldLayer)



    this.enemyGroup = this.add.group()
    
    for (let i = 0; i < 6; i++) {
      const e = new Enemy(this, 300 + 20*i, 250, "enemy", 30);
      e.body.setCollideWorldBounds(true)
      e.setTint(0x5AFF00)
      this.enemyGroup.add(e)
      
    }
    for (let i = 0; i < 6; i++) {
      const e = new Enemy(this, 300 + 20*i, 550, "enemy", 30);
      e.body.setCollideWorldBounds(true)
      e.setTint(0x5AFF00)
      this.enemyGroup.add(e)
      
    }
    this.enemyGroup2 = this.add.group()
    for (let i = 0; i < 4; i++) {
      const e = new enemyFollow(this, 300 + 20*i, 550, "enemy", 30);
      e.body.setCollideWorldBounds(true)
      e.setTint(0xFC00FF)
      this.enemyGroup2.add(e)
      
    }
   


    this.physics.add.collider(this.enemyGroup, worldLayer)
    this.physics.add.collider(this.enemyGroup2, worldLayer)


    this.physics.add.overlap(player, this.enemy, this.PlayerEnemyCollision, null, this)
    this.physics.add.overlap(player, this.enemy2, this.PlayerEnemyCollision, null, this)
    this.physics.add.overlap(player, this.enemyGroup, this.PlayerEnemyCollision, null, this)
    this.physics.add.overlap(player, this.enemyGroup2, this.PlayerEnemyCollision, null, this)
    




    

    this.keys = this.input.keyboard.addKeys({
      space: "SPACE"
    })
    cursors = this.input.keyboard.createCursorKeys();

    this.projectiles = new projectiles(this)

    this.physics.add.collider(this.projectiles, worldLayer, this.handleProjectileWorldCollision, null, this)
    this.physics.add.overlap(this.projectiles, this.enemy, this.handleProjectileEnemyCollision, null, this)
    this.physics.add.overlap(this.projectiles, this.enemy2, this.handleProjectileEnemyCollision, null, this)
    this.physics.add.overlap(this.projectiles, this.enemyGroup, this.handleProjectileEnemyCollision, null, this)
    this.physics.add.overlap(this.projectiles, this.enemyGroup2, this.handleProjectileEnemyCollision, null, this)

    emitter = this.add.particles("particle").createEmitter({
        x: 200,
        y: 200,
        quantity: 15,
        speed: {min: -100, max: 100},
        angle: {min: 0, max:360},
        scale: {start:0.1, end:0},
        lifespan: 300,
        active: false,

    })



    this.backgroundSound = this.sound.add("background");
    this.fireballSound = this.sound.add("fireball");
    this.HitSound = this.sound.add("hit");
    this.EnemySound = this.sound.add("enemyDeath");
    this.TeleportSound = this.sound.add("teleport");

    var musicConfig = {
      mute: false,
      volume: 0.5,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }
    this.backgroundSound.play(musicConfig);
    



  }//end of create


  handleProjectileWorldCollision(p){
    p.recycle()
  }

  handleProjectileEnemyCollision(enemy, projectile){
    if(projectile.active){
      
      enemy.setTint(0xff0000)
      this.time.addEvent({
        delay: 40,
        callback: ()=>{
          enemy.explode()
        projectile.recycle()
        },
        callbackScope: this,
        loop: false
      })
      EnemiesKilled += 1
      console.log(EnemiesKilled)
      emitter.active=true
      emitter.setPosition(enemy.x, enemy.y)
      emitter.explode()

      let ui = this.scene.get("uiScene")
      ui.updateScore()
      
    }
  }


   PlayerEnemyCollision(p, e){
    p.health -= e.damage
    this.HitSound.play();
    this.EnemySound.play();
    let ui = this.scene.get("uiScene")
    ui.healthbar.updateHealth(p.health)
      if(p.health <= 0){
        this.cameras.main.shake(100, 0.05),
        this.cameras.main.fade(250, 0, 0, 0),
        this.cameras.main.once('camerafadeoutcomplete', ()=>{
          ui.reset()
          EnemiesKilled = 0
          this.scene.restart()
          
        })
      }
      

    console.log(p.health)
    this.cameras.main.shake(80, 0.02)
    p.setTint(0xff0000)
    this.time.addEvent({
      delay: 500,
      callback: ()=>{
        
        p.clearTint()
      },
      callbackScope: this,
      loop: false
    })
    
     e.explode()
     
    
   } 


   update(time, delta) {

    if(cursors.up.isDown){
      if(time > lastTimeFired){
        lastTimeFired = time + 600
        this.projectiles.fireBullet(player.x, player.y, "up")
        this.fireballSound.play();

      }
      
    }
    if(cursors.down.isDown){
      if(time > lastTimeFired){
        lastTimeFired = time + 600
        this.projectiles.fireBullet(player.x, player.y, "down")
        this.fireballSound.play();
      }
      
    }
    if(cursors.left.isDown){
      if(time > lastTimeFired){
        lastTimeFired = time + 600
        this.projectiles.fireBullet(player.x, player.y, "left")
        this.fireballSound.play();
      }
      
    }
    if(cursors.right.isDown){
      if(time > lastTimeFired){
        lastTimeFired = time + 600
        this.projectiles.fireBullet(player.x, player.y, "right")
        this.fireballSound.play();
      }

    }

    player.update()

    if(!this.enemy.isDead){
      this.enemy.update()
    }

    if(!this.enemy2.isDead){
      this.enemy2.update(player.body.position, time)
    }

    this.enemyGroup2.children.iterate((child) => {
      if(!child.isDead){
        child.update(player.body.position, time)
      }
    })
    
    
    this.enemyGroup.children.iterate((child) => {
      if(!child.isDead){
        child.update()
      }
    })
    
      

    //talks to player.js which moves the player
    if(keyboard.A.isDown){
      player.moveLeft();
    }else if(keyboard.D.isDown){
      player.moveRight();
    }
    else if(keyboard.W.isDown){
      player.moveUp();
    }
    else if(keyboard.S.isDown){
      player.moveDown();
    }
    else{
      player.idle()
    }

    if(EnemiesKilled >=21){
      this.TeleportSound.play();
      EnemiesKilled= 0
      this.enemyGroup.children.iterate((child) => {
        if(!child.isDead){
          child.increaseSpeed()
        }
      })
      this.enemyGroup2.children.iterate((child) => {
        if(!child.isDead){
          child.increaseSpeed()
        }
      })
      //left top of map
      for (let i = 0; i < 2; i++) {
        const e = new Enemy(this, 300 + 20*i, 250, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0x5AFF00)
        this.enemyGroup.add(e)
        
      }
      //right top of map
      for (let i = 0; i < 2; i++) {
        const e = new Enemy(this, 600 + 20*i, 250, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0x5AFF00)
        this.enemyGroup.add(e)
        
      }
      //left bottom of map
      for (let i = 0; i < 2; i++) {
        const e = new Enemy(this, 300 + 20*i, 550, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0x5AFF00)
        this.enemyGroup.add(e)
        
      }
      //right bottom of map
      for (let i = 0; i < 2; i++) {
        const e = new Enemy(this, 600 + 20*i, 550, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0x5AFF00)
        this.enemyGroup.add(e)
        
      }

      //left top of map
      for (let i = 0; i < 1; i++) {
        const e = new enemyFollow(this, 300 + 20*i, 550, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0xFC00FF)
        this.enemyGroup2.add(e)
      }  
      //left bottom of map
      for (let i = 0; i < 1; i++) {
        const e = new enemyFollow(this, 300 + 20*i, 250, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0xFC00FF)
        this.enemyGroup2.add(e)
      }  
      //right top of map
      for (let i = 0; i < 1; i++) {
        const e = new enemyFollow(this, 600 + 20*i, 550, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0xFC00FF)
        this.enemyGroup2.add(e)
      }  
      //right bottom of map
      for (let i = 0; i < 1; i++) {
        const e = new enemyFollow(this, 600 + 20*i, 250, "enemy", 30);
        e.body.setCollideWorldBounds(true)
        e.setTint(0xFC00FF)
        this.enemyGroup2.add(e)
      }  

    }
  }// end of update

  

}
