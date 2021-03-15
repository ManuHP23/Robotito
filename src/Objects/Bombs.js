class Bombs extends Phaser.Physics.Arcade.Group {//clase bomba extendida de fisicas arcade de phaser
    constructor(config) {
        super(config.physicsWorld, config.scene);
        this.addBomb();
    }

    addBomb() { //creamos la bomba
        this.create(
            Phaser.Math.Between(40, this.scene.scale.width - 40) //movimiento de la bomba por toda la pantalla de juego
            , -10, 'bomb')
            .setDepth(2) //profundidad 2 para que no se esconda
            .setBounce(1) //rebote
            .setCircle(18) //colision redonda
            .setVelocityX( //movimiento random de izq a dcha
                (Phaser.Math.Between(0, 1)) ? 100 : -100
            )
            .setGravityY(-1800); //gravedad
    }

    update() {  
        this.children.iterate( bomb => {
            if(bomb.body.velocity.x < 0) {
                bomb.setAngularVelocity(-300);
            } else {
                bomb.setAngularVelocity(300);
            }
        });
    }
}

export default Bombs;