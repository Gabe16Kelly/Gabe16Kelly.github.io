class projectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "bullet")

        this.x = 200
        this.y = 200
    }
    fire(x, y, direction){
        this.body.reset(x,y)
        this.setActive(true)
        this.setVisible(true)
        this.direction = direction
        switch(direction){
            case "left":
                this.setVelocity(-300,0)
                this.body.rotation = 180;
                return
            case "right":
                this.setVelocity(300,0)
                this.body.rotation = 0;
                return    
            case "up":
                this.setVelocity(0, -300)
                this.body.rotation = -90;
                return
            case "down":
                this.setVelocity(0, 300)
                this.body.rotation = 90;
                return    
        }
    }
    recycle(){
        this.setActive(false)
        this.setVisible(false)
    }
}
class projectiles extends Phaser.Physics.Arcade.Group {
    constructor(scene){
        super(scene.physics.world, scene)
        this.createMultiple({
            frameQuantity : 5,
            key: "bullet",
            active: false,
            visible: false,
            classType: projectile
        })
    }
    fireBullet(x, y, direction){
        let projectile = this.getFirstDead(false)
        if(projectile){
            projectile.fire(x, y, direction)
        }
    }
}