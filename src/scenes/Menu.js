class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }
    
    init(data) {
        //console.log('Se ha iniciado la escena Menu');
        this.points = 0;

        //comprobar data
        if(Object.keys(data).length !== 0) {
            this.points = data.points;

        }
    }

    create() { 
        
        //mejor puntuacion
        const pointsDB = localStorage.getItem('best_points');
        this.bestPoints = (pointsDB !== null) ? pointsDB : 0;
        
        //creamos la imagen del menu
        this.logoMenu = this.add.image(
            this.scale.width/2,
            this.scale.height/2,
            'logo'
        ).setScale(1).setInteractive();
        
        //varaibles
        this.pointsText = this.add.bitmapText( //puntos que entran
            this.scale.width/2,
            this.scale.height - 100,
            'pixelFont',
            'PUNTOS ' + this.points

        ).setDepth(2).setOrigin(0.5);
        
        //mejor puntuacion
        this.bestPointsText = this.add.bitmapText( //puntos que entran
            this.scale.width/2,
            this.scale.height - 80,
            'pixelFont',
            'MEJOR ' + this.bestPoints
        ).setDepth(2).setOrigin(0.5);


        //cuando se hace clic se empeiza la partida: interactiva
        this.logoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.add.tween({//hacer que el logo se oculte
                targets: this.logoMenu,
                ease: 'Bounce.easeIn', //efecto rebote
                y: -200,
                duration: 1000, //1 segundo
                //cuando se complete el efecto vaya a la escena de partida
                onComplete: () => {
                   this.scene.start('Play');
                }
            });

            this.add.tween({//mejor puntuacion
                targets: [this.pointsText, this.bestPointsText],
                ease: 'Bounce.easeIn', 
                y: 400,
                duration: 1000, 
            });
        });

        //logica mejor puntuacion
        if(this.points > this.bestPoints) {
            localStorage.setItem('best_points', this.points);
        }
    }
}

export default Menu;