import Robotito from '../Player/Robotito.js';
import Bombs from '../Objects/Bombs.js';
import CoinItem from '../Objects/CoinItem.js';

class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }
    
    init() {
        console.log('Se ha iniciado la escena Play');
        //llamamos a la escena UI
        this.scene.launch('UI');
    }

    create() {
        this.add.image(0, 0, 'background')
            .setOrigin(0);

        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(0, 0, 'wall')
            .setOrigin(0);
        this.wall_floor.create(this.scale.width, 0, 'wall')
            .setOrigin(1, 0)
            .setFlipX(true);
        
        this.wall_floor.create(0, this.scale.height, 'floor')
            .setOrigin(0, 1);

        this.wall_floor.refresh();

        this.wall_floor.getChildren()[0].setOffset(-30, 0); //ajustando posicion wall collider izquierdo
        this.wall_floor.getChildren()[1].setOffset(30, 0); //ajustando posicion wall collider derecho
        this.wall_floor.getChildren()[2].setOffset(0, 69); //ajustando posicion floor collider


        // Bombs
        this.bombsGroup = new Bombs({ //caracteristicas del mundo
            physicsWorld: this.physics.world,
            scene: this //escena play
        });

        // Item Coin
        this.itemsGroup = new CoinItem({
            physicsWorld: this.physics.world,
            scene: this //escena play
        });

        // Personaje
        this.robotito = new Robotito({
            scene: this,
            x: 100,
            y: 100,
        });

        //añadir collider al jugador y las bombas
        this.physics.add.collider([this.robotito, this.bombsGroup], this.wall_floor);
        
        //colision bomba-personaje
        this.physics.add.overlap(this.robotito, this.bombsGroup, () => {
            this.robotito.bombCollision();
        });

        //colision robotito y coin
        this.physics.add.overlap(this.itemsGroup, this.robotito, () => {
            this.sound.play('letsRock'); //sonido de colision
            this.registry.events.emit('update_points'); // para la ui
            this.itemsGroup.destroyItem(); //destruir los items coins al colisionar
            this.bombsGroup.addBomb(); //agregamos una bomba mas
        });
        

    }

    update() {
        this.robotito.update();
        this.bombsGroup.update();
    }
}

export default Play;