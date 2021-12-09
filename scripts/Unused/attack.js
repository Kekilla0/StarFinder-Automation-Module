import { logger } from "./logger.js";
import { settings } from './settings.js';
import { target } from './target.js';

export class attack{
  static async _executeAttack(item){
    let item_token = item.actor.token ?? item.actor.getActiveTokens(true, false)[0];

    if(!token) return;

    let target_token = target._getTarget(item_token);
    if(!target) return;

    if(!target._inRange(item_token, target_token, item.data.data.range.value)) logger.error(`${target.name} is not in range.`);

    if(!target._checkCover(item_token, target_token)) return;

    if(item.hasAttack){
      return await item.rollAttack();
    }
  }

  static async _checkHit(item, target, roll){
    const KAC_TYPES = ["bludgeoning", "piercing", "slashing"];
    const EAC_TYPES = ["acid","cold","electricity","fire","sonic"];
    const { eac, kac } = target.actor.data.data.attributes;

    const damageTypes = item.data.data.damage.parts.reduce((a,[d,t])=> a.concat(t) ,[]);

    logger.debugger("_checkHit | item        | ", item);
    logger.debugger("_checkHit | target      | ", target);
    logger.debugger("_checkHit | roll        | ", roll);
    logger.debugger("_checkHit | KAC_TYPES   | ", KAC_TYPES);
    logger.debugger("_checkHit | EAC_TYPES   | ", EAC_TYPES);
    logger.debugger("_checkHit | damageTypes | ", damageTypes);

    if(damageTypes.some(t => KAC_TYPES.includes(t.toLowerCase())))
      return roll.total >= kac.value;
    if(damageTypes.some(t => EAC_TYPES.includes(t.toLowerCase())))
      return roll.total >= eac.value;
    
    return roll.total >= Math.max(kac.value, eac.value);
  }

  static _checkCrit(item, target, roll){

  }
}