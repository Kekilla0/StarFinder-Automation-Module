import { logger } from "./logger.js";

export class settings{  
  static value(str){
    return game.settings.get(settings.data.name, str);
  }
  static i18n(key){
    return game.i18n.localize(key);
  }
  static register_module(key){
    settings.data = game.modules.get(key)?.data;
    if(!settings.data) return logger.error("Module Registration Error | Data Error | ");

    //module constant declarations
    settings.COVER = {
      cover : {
        text : "Cover",
        value : 4,
      },
      improved : {
        text : "Improved Cover",
        value : 8,
      },
      none : {
        text : "None",
        value : 0,
      },
      partial : {
        text : "Partial Cover",
        value : 2,
      },
      soft : {
        text : "Soft Cover",
        value : 2,
      },
      total : {
        text : "Total Cover",
        value : 1000,
      }
    };
  }

  static register(){
    settings.register_module("starfinder-automation-module");
    logger.info(`Registering All Settings.`);
    settings.register_settings();
  }

  static register_settings(){
    const settingData = {
      debug : {
        scope : "client", config : true, default : false, type : Boolean,
      },
      range : {
        scope : "world", config : true, default : false, type : Boolean,
      },
      cover : {
        scope : "world", config : true, default : false, type : Boolean,
      },
      skipDialog : {
        scope : "world", config : true, default : false, type : Boolean,
      },
    };


    Object.entries(settingData).forEach(([key, data])=> {
      game.settings.register(
        settings.data.name, key, {
          name : settings.i18n(`settings.${key}.title`),
          hint : settings.i18n(`settings.${key}.hint`),
          ...data
        }
      );
    })
  }
}