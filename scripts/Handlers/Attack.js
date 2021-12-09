/**
 * Import Classes
 */
import { LOGGER } from '../logger.js';

/**
 * ATTACK : handles all item attacks
 */
export class ATTACK{
  /**
   * Global Variables
   */


  static _execute(item){
    LOGGER.debug("ITEM | _execute | ", { item });

    ATTACK.data = { item };
    ATTACK._roll();

    LOGGER.debug("ITEM | _post | ", { data : ATTACK.data });
  }

  static async _roll(){
    //construct default information
      //!formula
      //!cover

    //check if roll is possilbe
      //!check cover
      //!check if in range

    //check if dialog is required (possible event required)

    //execute roll as needed  
  }

  static _dialog(){

  }

  static _hit(){

  }

  static _range(){

  }

  static _cover(){

  }

  static _ac(){

  }

  static _crit(){

  }
}