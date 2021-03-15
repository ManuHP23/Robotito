class CoinItem extends Phaser.Physics.Arcade.StaticGroup{//grupo estatico
    constructor(config) {
        super(config.physicsWorld, config.scene);
        //prueba de posibles posiciones de los items
        //setInterval(() => {
            this.addCoinItem();
        //}, 10); //se ejecutara cada 10 milisegundos
        this.addCoinItem();
    }

    addCoinItem() { //crear coins
        this.create(
            Phaser.Math.Between(50, this.scene.scale.width - 50),
            Phaser.Math.Between(150, this.scene.scale.height - 70),
            'coin_item'
        );
    }

    //destruir coins al cogerlos
    destroyItem() {
        this.children.entries[0].destroy();
        this.addCoinItem();
    }

}

export default CoinItem;