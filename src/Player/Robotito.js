class Robotito extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'robotito');

        this.scene = config.scene;
        this.scene.add.existing(this); //para indicar que el objeto exsite
        this.scene.physics.world.enable(this); //habilitar fisicas

        this.setScale(0.15); //escala del personaje
        this.body.setSize(100, 180); //tamaño del box collider del personaje
        this.body.setOffset(140, 120); //desplazamiento del box collider del personaje
        this.body.setBounce(0.2); //rebote

        this.jumping = false;

        this.anims.play('idle'); //cargamos animacion idle
        this.preMov = 'idle'; //variable de animacion idle

        this.hitDealy = false; //variable de colision

        this.cursor = this.scene.input.keyboard.createCursorKeys(); //variable movimiento personaje

        this.life = 3; //vida del personaje
    }

    update(){ //bucle del personaje
        if(this.cursor.left.isDown){ //movimiento a la izquierda
            this.body.setVelocityX(-250);
            this.flipX = true; //para que gire al cambiar de direccion
            if(this.preMov !== 'left' && !this.jumping){ //para solo se ejecute la animacion al mover
                this.preMov = 'left';
                this.anims.play('walk');
            }

        } else if(this.cursor.right.isDown) { //movimiento a la derecha
            this.body.setVelocityX(250);
            this.flipX = false; //cambio de direccion
            if(this.preMov !== 'right' && !this.jumping){ //para solo se ejecute la animacion al mover
                this.preMov = 'right';
                this.anims.play('walk');
            }

        } else if(this.cursor.down.isDown && !this.jumping) { //agachado
            this.body.setVelocityX(0); //no se mueve
            this.body.setSize(70, 150) //modificamos el tamaño del collider
            this.body.setOffset(110, 90); //modificamos posicion del collider
            if(this.preMov !== 'down' && !this.jumping){ //para solo se ejecute la animacion al agacharse
                this.preMov = 'down';
                this.anims.play('idle'); //poner animacion para down
            }

        }
        else{
            this.body.setVelocityX(0); //solo se mueve al pulsar
            //deshacemos la modificacion del agachado
            this.body.setSize(100, 180); 
            this.body.setOffset(140, 120);
            if(this.preMov !== 'idle' && !this.jumping){ //para solo se ejecute la animacion al mover
                this.preMov = 'idle';
                this.anims.play('idle');
            }
        }

        //salto. usamos el metodo de phaser que solo deja saltar una vez hasta que se vueleve al suelo
        if(Phaser.Input.Keyboard.JustDown(this.cursor.up) && !this.jumping){
            this.jumping = true; //cuando salta
            this.body.setVelocityY(-800);
            if(this.preMov !== 'jump' && !this.jumping){ 
                this.preMov = 'jump';
                this.anims.play('jump');
            }
            //habilitar de nuevo el salto
        } else if(this.body.blocked.down){
            this.jumping = false;
        }   
    }

    bombCollision() {
        if(!this.hitDelay) { // para una sola colision
            //console.log('Colisiona');
            this.hitDelay = true; 

            //sonido de daño por colision
            this.scene.sound.play('draw');

            //daño de la colision
            this.life--;
            this.scene.registry.events.emit('remove_life');

            //condicion de muerte
            if(this.life === 0 ) {
                this.scene.registry.events.emit('game_over');
            }

            //cambiar de color al personaje al chocar
            this.setTint(0x1abc9c); //color hexadecimal de flatuicolors

            //devolver false
            this.scene.time.addEvent({
                delay: 600,
                callback: () => { //cuando se ejecuta el delay llama a esta funcion
                    this.hitDelay = false;
                    //restaruar color de daño por colision
                    this.clearTint();
                }
            });
        }
    }
}

export default Robotito;