class Enemy extends Entity{
    constructor(scene, x, y, texture, damage, type){
        super(scene, x, y, "enemy", type)
        
        this.damage = damage
        this.type = type


        this.anims.create({
            key: "enemy-idle",
            frames: this.anims.generateFrameNames("enemy", {start: 1, end: 6, prefix: "idle-", suffix: ".png"}),
            repeat: -1,
            frameRate: 15
          })
      
          this.anims.create({
            key: "enemy-run",
            frames: this.anims.generateFrameNames("enemy", {start: 1, end: 6, prefix: "run-", suffix: ".png"}),
            repeat: -1,
            frameRate: 15
          })

          this.anims.play("enemy-idle", true);

          this.speed = 50;
          
          let dir = Math.floor(Math.random()*4)

          switch (dir) {
            case 0:
                this.body.setVelocity(0,-this.speed)//up
                break;
                case 1:
                this.body.setVelocity(-this.speed,0)//left
                break;
                case 2:
                this.body.setVelocity(0,this.speed)//down
                break;
                case 3:
                this.body.setVelocity(this.speed, 0)//right
                break;
            default:
                break;
        }
            console.log(this.body.blocked);
    }

    increaseSpeed(){
        this.speed +=5;
    }



    update(){
        const {speed} = this
        const enemyBlocked = this.body.blocked

        if (enemyBlocked.down || enemyBlocked.up || enemyBlocked.left || enemyBlocked.right){
            
            let possibleDirections = []
            for (const direction in enemyBlocked){
                possibleDirections.push(direction)
            }
            
            const newDirection = possibleDirections[Math.floor(Math.random()*4)+1]
            switch (newDirection) {
                case "up":
                    this.body.setVelocity(0,-this.speed)//up
                    break;
                    case "left":
                    this.body.setVelocity(-this.speed,0)//left
                    break;
                    case "down":
                    this.body.setVelocity(0,this.speed)//down
                    break;
                    case "right":
                    this.body.setVelocity(this.speed, 0)//right
                    break;
                    case "none":
                    this.body.setVelocity(0, 0)//right
                    break;
            
                default:
                    break;
            }
        }



    }
}