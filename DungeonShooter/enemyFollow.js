class enemyFollow extends Enemy{
    constructor(scene, x, y, texture, damage, type){
        super(scene, x, y, "enemy", type)

        this.speed = 32
        this.chasing = true
        this.damage = damage
    }

    update(destination){
        const {speed} = this
        if(this.chasing){
            this.body.setVelocity(0,0)
            const dx = Math.abs(this.body.x - destination.x)
            const dy = Math.abs(this.body.y - destination.y)
            if (dx > dy){
                if(this.body.x < destination.x){
                    this.body.setVelocity(speed, 0)
                }else{
                    this.body.setVelocity(-speed, 0)
                }

            }else{
                if(this.body.y < destination.y){
                    this.body.setVelocity(0, speed)
                }else{
                    this.body.setVelocity(0, -speed)
                }   

            }
            this.body.velocity.normalize().scale(speed)
        }


        const enemyBlocked = this.body.blocked

        if (enemyBlocked.down || enemyBlocked.up || enemyBlocked.left || enemyBlocked.right){
            this.chasing = false

            this.scene.time.addEvent({
                delay:2000,
                callback: () =>{
                    this.chasing = true
                },
                callbackScope: this.scene,
                loop:false
            })
            
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