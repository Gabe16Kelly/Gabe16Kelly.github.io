class HealthBar{
    constructor(scene, x, y, health){
        this.scene = scene
        this.currentHealth = health
        this.x = x
        this.y = y

        this.graphics = this.scene.add.graphics()
        this.graphics2 = this.scene.add.graphics()
        this.newGraphics = this.scene.add.graphics()
        this.newGraphics2 = this.scene.add.graphics()
        const healthbarBackground = new Phaser.Geom.Rectangle(x+66, y, 312, 36)
        const healthbarBackground2 = new Phaser.Geom.Rectangle(x+72, y+ 6, 300, 24)
        const healthbarFill = new Phaser.Geom.Rectangle(x+72, y + 6, this.currentHealth, 24)
    
        this.graphics.fillStyle(0x00D4FF, 0.5)
        this.graphics2.fillStyle(0xFF0000, 1)
        this.graphics.fillRectShape(healthbarBackground)
        this.graphics2.fillRectShape(healthbarBackground2)
        this.newGraphics.fillStyle(0x7FFF00, 1)
        this.newGraphics.fillRectShape(healthbarFill)

        this.scene.add.text(x+ 70, y-35, "health", {fontSize: "38px", fill: "#fff"})


    }

    updateHealth(health){
        this.newGraphics.clear()
        this.newGraphics.fillStyle(0x5AFF00, 1)
        this.currentHealth = health
        const healthbarFill = new Phaser.Geom.Rectangle(this.x+72, this.y+6, this.currentHealth, 24)
        this.newGraphics.fillRectShape(healthbarFill)
    }
}