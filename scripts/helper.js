import { logger } from "./logger.js";
import { settings } from './settings.js';

export class helper{
  static register(){
    logger.info("Register Helper Functions.");
    helper.registerSFItem();
    helper.registerSFToken();
    helper.registerSFActor();
    helper.registerSocket();
  }

  static registerSFItem(){
    let roll_original = CONFIG.Item.documentClass.prototype.roll;
    CONFIG.Item.documentClass.prototype.roll = async function(){
      switch(this.type)
      {
        case "weapon":
          return await this._executeWeaponAttack();
        default :
          await roll_original.call(this);
      }
    }

    CONFIG.Item.documentClass.prototype._executeWeaponAttack = async function(){
      //target checker
      let targets = Array.from(game.user.targets);
      if(targets.length > 1) return logger.error("Target only 1 enemy.");
      let target = targets[0];

      //range checker
      if(settings.value("range")){
        let inRange = target._rangeCheck(
          this.actor.token ?? this.actor.getActiveTokens(true,false)[0],
          this._getRange(),
        );

        logger.debug("In Range : ", inRange);

        if(!inRange) return logger.error("Target not in range");
      }

      //setting for cover automation
        //check cover
      if(settings.value("cover")){
        let coverType = target_.coverCheck(
          this.actor.token ?? this.actor.getActiveTokens(true, false)[0]
        );

        
      }

      if(this._getTargetType() === "None"){
        if(this.hasAttack){
          let roll = await this.rollAttack();

          //check for hit on the actor
            //if true

          let damage = await this.rollDamage();
          
          //send damage to "actor.applyDamage"
        }
      }
    }

    CONFIG.Item.documentClass.prototype._getRange = function(){
      return this.data.data.range.value;
    }

    CONFIG.Item.documentClass.prototype._getTargetType =  function(){
      return this.data.data.area.shape === "" ? "None" : this.data.data.area.shape;
    }
  }

  static registerSFToken(){
    Token.prototype._rangeCheck= function(placeable, range){
      logger.debug("This Object | ", this);
      logger.debug("Argument Placeable | ",placeable);
      logger.debug("Range Check Range | ", range);
      if(!placeable instanceof PlaceableObject) return;
      let measureDistance = canvas.grid.measureDistance(this, placeable);
      logger.debug("Measured Distance | ", measureDistance);
      return range >= measureDistance;
    }

    Token.prototype._coverCheck = function(placeable){
      logger.debug("This Object | ", this);
      logger.debug("Argument Placeable | ", placeable);      
    }
  }

  static registerSFActor(){
    CONFIG.Actor.documentClass.prototype._applyDamage = async function(damage, type, reductionMultipier){

    }

    CONFIG.Actor.documentClass.prototype._checkHit = function(rollTotal = 0, acBonuses= 0, damageType = ""){
      const actorData = this.data;
      const { eac, kac } = actorData.data.attributes;

      //if kac_type else eac_type
      if(["bludgeoning", "piercing", "slashing"].includes(damageType.toLowerCase())){
        return rollTotal >= (kac.value + acBonuses);
      }else{
        return rollTotal >= (eac.value + acBonsues);
      }
    }
  }

  static registerSocket(){

  }
}