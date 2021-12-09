/* Import Variables */
import { LOGGER } from "./logger.js";
import { ITEM } from './Handlers/Item.js';

/* MODULE Constants */
const NAME = "starfinder-automation-module";
const PATH = `/modules/${NAME}`;
const TITLE = "Starfinder Automation Module";

/* MODULE CLASS */
export class MODULE{
  static async wait(ms) {new Promise((resolve) => setTimeout(resolve, ms))}
  static async waitFor(fn, m = 200, w = 100, i = 0){ while(!fn(i, ((i*w)/100)) && i < m){ i++; await MODULE.wait(w); } return i === m ? false : true; }

  static build(){
    MODULE.data = {
      name : NAME, path : PATH, title : TITLE,
    }
  }

  static register(){
    LOGGER.info("Initializing Module");
    MODULE.settings();

    /* Initialize Handlers */
    LOGGER.register();
    ITEM.register();
  }

  static settings(){

  }

  static applySettings(settingsData){
    Object.entries(settingsData).forEach(([key, data])=> {
      game.settings.register(
        MODULE.data.name, key, {
          name : MODULE.localize(`setting.${key}.name`),
          hint : MODULE.localize(`setting.${key}.hint`),
          ...data
        }
      );
    });
  }

  static setting(key){
    return game.settings.get(MODULE.data.name, key);
  }

  static localize(...args){
    return game.i18n.localize(...args);
  }
}

/* Initialize MODULE */
MODULE.build();
Hooks.on(`ready`, MODULE.register);