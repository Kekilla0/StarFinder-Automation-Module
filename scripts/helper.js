import { logger } from "./logger.js";
import { settings } from './settings.js';
import { attack } from './attack.js';

/*
  This might need to be broken up into different handlers
*/

export class helper{
  static register(){
    logger.info("Register Helper Functions.");
    helper.rayPrototypes();
    helper.itemPrototypes();
    helper.registerSocket();
  }

  static rayPrototypes(){
    Ray.prototype.draw = async function(){
      let randColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;
      await canvas.scene.createEmbeddedDocuments("Drawing", [{
          hidden : false, locked : false, x : this.x0, y : this.y0, strokeWidth : 1, strokeColor : randColor(), points : [[0,0], [this.dx, this.dy]]
      }]);    
    }
  }

  static itemPrototypes(){
    let roll_original = CONFIG.Item.documentClass.prototype.roll;
    CONFIG.Item.documentClass.prototype.roll = async function(){
      switch(this.type)
      {
        case "weapon":
          return await attack._executeAttack(this);
        default :
          await roll_original.call(this);
      }
    }
  }

  static registerSocket(){

  }
}