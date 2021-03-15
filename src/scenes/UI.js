class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'});
    }
    
    init() {
        console.log('Se ha iniciado la escena UI');
        this.scene.moveUp(); //para colocar delante la UI
    }

    create() {
        this.groupLife = this.add.group({ //vidas del juego
            key: 'life',
            repeat: 2, //se repetira dos veces después de la primera
            setXY: {
                x: 50,
                y: 30,
                stepX: 25
            }

        });
        //puntuacion
        this.actual_points = 0;
        this.points = this.add.bitmapText(
            this.scale.width -40, //colocación arriba a la derecha
            20,
            'pixelFont', //tipo de fuente
            Phaser.Utils.String.Pad('0', 6, '0', 1) //rellenar los ceros
        ).setOrigin(1, 0) //colocar la puntuacion

        //Eventos
        this.registry.events.on('remove_life', () => { //para escuchar un evento
            //accedemos al array que guarda los corazones y obtenemos el ultimo para eliminarlo
            this.groupLife.getChildren()[this.groupLife.getChildren().length -1].destroy();

            //evento game over
            this.registry.events.on('game_over', () => {
                this.registry.events.removeAllListeners(); //eliminar los listeners
                //ir a la escena menu
                this.scene.start('Menu', {points: this.actual_points});
            })
        }); 

        //setear los puntos
        this.registry.events.on('update_points', () => {
            this.actual_points += 10; //actualizar los puntos
            this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, '0', 1));
        });

    }
}

export default UI;
/*
class UI extends Phaser.Scene {
    constructor() {
        super({key: 'UI'});
    }
    
    init() {
        console.log('Se ha iniciado la escena UI');
        this.scene.moveUp();
        this.actual_points = 0;
    }

    create() {
        this.groupLife = this.add.group({
            key: 'life',
            repeat: 2,
            setXY: {
                x: 50,
                y: 50,
                stepX: 25
            }
        });

        this.points = this.add.bitmapText(
            this.scale.width - 40,
            20,
            'pixelFont',
            Phaser.Utils.String.Pad('0', 6, '0', 1)
        ).setOrigin(1, 0).setTint(0x000000);


        // Eventos
        this.registry.events.on('remove_life', () => {
            this.groupLife.getChildren()[this.groupLife.getChildren().length - 1].destroy();
        });
        this.registry.events.on('game_over', () => {
            this.registry.events.removeAllListeners();
            this.scene.start('Menu');
        });

        this.registry.events.on('update_points', () => {
            this.actual_points += 10;
            this.points.setText(Phaser.Utils.String.Pad(this.actual_points, 6, '0', 1));
        });
    }
}

export default UI;
*/