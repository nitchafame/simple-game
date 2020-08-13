//Author Nitcha Tothong(Fame)–http://nitchafa.me/

/* global PIXI */
//this line ^ to make PIXI global and avoid error from Glitch

let tileSize = 42;
let tileSizeMap = 16;
let bgSpeed = 0.008;
let count = 0;
let SCALE = 1.8;
let playerSheet = {};  
let playerSpeed = 80;
let isClick = false;
let isTap = false;


PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
  width: 480,
  height: 720,
  backgroundColor: 0x595959,
  antialias: true
});


//json file map–foreground
let map = {
  width: 32,
  height: 16,
  tiles: [
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 556, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    663, 664, 665, 666, 667, 668, 669, 670, 663, 664, 665, 666, 667, 668, 669, 670, 663, 664, 665, 666, 667, 668, 669, 670, 663, 664, 665, 666, 667, 668, 669, 670,
    699, 700, 701, 702, 703, 704, 705, 706, 699, 700, 701, 702, 703, 704, 705, 706, 699, 700, 701, 702, 703, 704, 705, 706, 699, 700, 701, 702, 703, 704, 705, 706,
    735, 736, 736, 737, 738, 739, 740, 741, 735, 736, 736, 737, 738, 739, 740, 741, 735, 736, 736, 737, 738, 739, 740, 741, 735, 736, 736, 737, 738, 739, 740, 741,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    
  ],
  collision:[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
    0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,     
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  
 ] 
}

//Interaction handler
class Keyboard {
  constructor() {
    this.pressed = {};
  }

  watch(el) {
    el.addEventListener("keydown", e => {
      this.pressed[e.keyCode] = true;
    });
    el.addEventListener("keyup", e => {
      this.pressed[e.keyCode] = false;
    });
    el.addEventListener("mousedown", e => {
      isClick = true;
    });
    el.addEventListener("mouseup", e => {
      isClick = false;      
    });
     el.addEventListener("touchstart", e => {
      isTap = true;
    });
     el.addEventListener("touchend", e => {
      isTap = false;
    });
  }
}

//Collision
function testCollision(worldX, worldY) {
  let mapX = Math.floor(worldX / tileSize / SCALE);
  let mapY = Math.floor(worldY / tileSize / SCALE);
    return map.collision[mapY * map.width + mapX];
}

//Create a canvas element and insert into DOM
document.body.appendChild(app.view);
app.view.setAttribute("tabindex", 0);
app.renderer.autoResize = true;

//Load assets
app.loader
  .add(
    "skybg",
    "https://cdn.glitch.com/c20be499-e3db-4747-95db-4dfd091d8f0b%2Fbg-clouds.png?v=1596696187280"
  )
  .add(
    "mountbg",
    "https://cdn.glitch.com/c20be499-e3db-4747-95db-4dfd091d8f0b%2Fbg-mountains.png?v=1596696187300"
  )
  .add(
    "forestbg",
    "https://cdn.glitch.com/c20be499-e3db-4747-95db-4dfd091d8f0b%2Fbg-trees.png?v=1596696187234"
  )
  .add(
    "tileMap",
    "https://cdn.glitch.com/c20be499-e3db-4747-95db-4dfd091d8f0b%2Ftileset.png?v=1596696188407"
  )
  .add(
    "character",
    "https://cdn.glitch.com/566547c8-bb18-417e-97a4-920700de4aaa%2Frobot_sprite.png?v=1596158784369"
  )
  .load((loader, resources) => {
  
    const background = new PIXI.Container();
    const skybg = PIXI.Texture.fromImage("skybg");
    const mountbg = PIXI.Texture.fromImage("mountbg");
    //const forestbg = PIXI.Texture.fromImage("forestbg");
  
    //in WebGL the image size should preferably be a power of two 
    let tilingsky = new PIXI.extras.TilingSprite(skybg, 480, 720);
    let tilingmount = new PIXI.extras.TilingSprite(mountbg, 480, 720);
    //let tilingforest = new PIXI.extras.TilingSprite(forestbg, 480, 720);
    
    tilingsky.position.set (0,0);
    tilingmount.position.set (0,0);
  
    background.addChild(tilingsky);
    background.addChild(tilingmount);
    //background.addChild(tilingforest);

    //foreground 576 × 352 json file map jason data + img file
    let tileTextures = [];
    for (let i = 0; i < 36 * 22; i++){
      let x = i % 36;
      let y = Math.floor(i / 36);
      tileTextures[i] = new PIXI.Texture(
        resources.tileMap.texture,
        new PIXI.Rectangle(x * tileSizeMap, y * tileSizeMap, tileSizeMap, tileSizeMap)
      );
    }
  
   let foreground = new PIXI.Container();
    for (let y = 0; y < map.height; y++){
      for(let x = 0; x < map.width; x++){
        let pos = map.tiles[y * map.width + x];
        let spriteMap = new PIXI.Sprite(tileTextures[pos]);
        spriteMap.x = x * tileSizeMap;
        spriteMap.y = y * tileSizeMap;
        foreground.addChild(spriteMap);
        
      }
    } 
  
    let key = new Keyboard();
    key.watch(app.view);

    let characterTexture = [];

    for (let i = 0; i < 6; i++) {
      characterTexture[i] = new PIXI.Texture(
        resources.character.texture,
        new PIXI.Rectangle(i * tileSize, 0, tileSize, tileSize)
      );
      characterTexture.push(characterTexture);
    }
  
    let player = new PIXI.Sprite(characterTexture[0]);

    player.scale.x = SCALE;
    player.scale.y = SCALE;
    foreground.scale.x = 4;
    foreground.scale.y = 4;
    background.scale.x = 3.5;
    background.scale.y = 3.5;
  
    //Display sprites–order here indicates layer orders
    app.stage.addChild(background);
    app.stage.addChild(foreground);
   //app.stage.addChild(player);
  
    app.stage.interactive = true;

    let character = {
      x: 100, 
      y: 0,
      veloX: 0,
      veloY: 0,
      jumped: false
    };

    let scrollX = 0;
    let scrollY = 0;

    app.view.focus();
    app.ticker.add(time => { 
      player.x = character.x;
      player.y = character.y;
      
      let touchingGround = testCollision (
        character.x + 2,
        character.y + tileSize * SCALE * 2 + 1
      ) || testCollision(
        character.x + tileSize * SCALE - 3,
        character.y + tileSize * SCALE * 2 + 1
      );
      console.log(player.y);
      
      //Add Gravity
      character.veloY = Math.min(16, character.veloY + 2);
      
      //Collision–test point if player hits anything   
      if (character.veloY > 0) {
        for (let i = 0; i < character.veloY; i++) {
          let testX1 = character.x + 2;
          let testX2 = character.x + tileSize * SCALE - 2;
          let testY = character.y + tileSize * SCALE * 2;
          
          if(testCollision(testX1, testY)){ //collision
            character.veloY = 0;
            break;
          }
          character.y = character.y + 0.6;
          
        } 
      }
      if (character.veloY < 0) {
        for (let i = character.veloY; i < 0; i++) {
          let testX1 = character.x + 2;
          let testX2 = character.x + tileSize * SCALE - 3;
          let testY = character.y + 5;

          character.y = character.y - 1;
        }
      }

      //Loop function
      function animatebg() {
        count += 0.9;
        tilingsky.tilePosition.x -= bgSpeed;
        tilingmount.tilePosition.x -= bgSpeed * 20;
        foreground.x -= bgSpeed * 200;
        //foreground.Position.x -= bgSpeed * 4;
        // render the root container
        app.render(background);
        app.render(foreground);
        //requestAnimationFrame(animatebg);
      } 
      animatebg();

      // interaction control conditions
      if (!key.pressed["32"] || !isClick === true || !isTap === true && character.jumped) {
        character.jumped = false;
      }
      
      if (key.pressed["32"] || isClick === true || isTap === true && !character.jumped && touchingGround) {
        if (character.y > 120){
        character.veloY = -25;
        character.jumped = true; 
        }
      }
      
        // Display current frame in diifferent states
      player.loop = true;
      app.stage.addChild(player);
      
      if(!touchingGround){
        player.texture = characterTexture[4];
      } else { 
        player.texture = characterTexture[(Math.floor(Date.now()/ playerSpeed) % 6)]; // animate through sprite 80 ms, 6frames
      }
    });
  });

app.loader.onError.add(error => console.error(error));
