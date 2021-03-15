class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        this.load.path = './assets/';

        this.load.image([
            'background',
            'floor',
            'wall',
            'bomb',
            'coin_item',
            'life',
            'logo'
        ]);

        //cargando el audio mp3
        this.load.audio('menuMusicBoston', 'menuMusicBoston.mp3');
        this.load.audio('letsRock', 'letsRock.mp3');
        this.load.audio('draw', 'draw.mp3');

        //cargando las fuentes
        this.load.image('font', 'font/font.png');
        this.load.json('fontData', 'font/font.json');

        //cargando atlas y animaciones 
        this.load.atlas('robotito', 'robotito/robotito.png', 'robotito/robotito_atlas.json');
        this.load.animation('robotito_Anim', 'robotito/robotito_anim.json');

        this.load.on('complete', () => {
            //sonido de la escena menu
            this.sound.play('menuMusicBoston', {loop: true});

            const fontData = this.cache.json.get('fontData');
            this.cache.bitmapFont.add('pixelFont', Phaser.GameObjects.RetroFont.Parse(this, fontData));

            this.scene.start('Menu'); //empezar con la escena menu
        });
    }
}
export default Bootloader;