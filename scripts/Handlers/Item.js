/* Import Classes */
import { LOGGER } from '../logger.js';
import { ATTACK } from './Attack.js';

/* Global Variables */
const NAME = "ITEM";


/* ITEM - handle item's in game and how they are executed. */
export class ITEM{
  static register(){
    LOGGER.info(`Registering ${NAME}`);
    ITEM.prototypes();
  }

  static prototypes(){
    const roll_original = getDocumentClass("Item").prototype.roll;
    getDocumentClass("Item").prototype.roll = async function(){
      switch(this.type){
        case "weapon":
          return await ATTACK._execute(this);
        default :
          await roll_original.call(this);
      }
    }
  }
}