class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, textureKey, type){
        super(scene, x, y, textureKey)

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enableBody(this, 0)
        this.isDead = false
    }

    explode(){
        if(!this.isDead){
            this.isDead = true
            this.destroy()
            console.log("enemy death");
        }
    }

      
        
    

    
}