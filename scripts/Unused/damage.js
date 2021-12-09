import { logger } from "./logger.js";

export class damage{
  static async _applyDamage(actor, value){
    const { hp, sp } = duplicate(actor.data.data.attributes);

    logger.debug("_applyDamage | actor | ", actor);
    logger.debug("_applyDamage | value | ", value);

    if(!!hp.temp && value > 0) value = reduceTemp();
    if(sp.value > 0 && value > 0) value = reduceSP();
    if(hp.value > 0 && value > 0) value = reduceHP();

    logger.debug("_applyDamage | hp    | ", hp);
    logger.debug("_applyDamage | sp    | ", sp);

    return await actor.update({ data : { attributes : { hp, sp }}});

    function reduceTemp(){
      let original = hp.temp;
      hp.temp = Math.clamped(hp.temp - value, 0, hp.tempmax);
      return value - (original - hp.temp);
    }

    function reduceSP(){
      let original = sp.value;
      sp.value = Math.clamped(sp.value - value, 0, sp.max);
      return value - (original - sp.value);
    }

    function reduceHP(){
      let original = hp.value;
      hp.value = Math.clamped(hp.value - value, 0, hp.max);
      return value - (original - hp.value);
    }
  }

  static async _applyHealing(actor, type, value){
    if(!actor) return logger.error(``);
    const { hp, sp } = duplicate(actor.data.data.attributes);

    logger.debug("_applyHealing | actor | ", actor);
    logger.debug("_applyHealing | value | ", value);

    if(type === "hp")
      hp.value = Math.clamped( hp.value + value, 0, hp.max);
    if(type === "sp")
      sp.value = Math.clamped( sp.value + value, 0, sp.max);

    logger.debug("_applyHealing | hp | ", hp);
    logger.debug("_applyHealing | sp | ", sp);

    return await actor.update({ data : { attributes : { hp, sp }}});
  }
}