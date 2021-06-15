import { logger } from "./logger.js";
import { settings } from "./settings.js";

export class target{
  static _getTarget(token){
    let targets = Array.from(game.user.targets);
    if(targets.length !== 1) return logger.error("Target only 1 enemy.");
    if(targets[0].id === token.id) return logger.error("Do not Target yourself.");

    logger.debug("_getTarget | targets | ", targets);
    logger.debug("_getTarget | target  | ", targets[0]);

    return targets[0];
  }

  static _inRange(token, target, range){
    if(!settings.value("range")) return true;
    let measureDistance = canvas.grid.measureDistance(token, target);

    logger.debug("_inRange | token     | ", token);
    logger.debug("_inRange | target    | ", target);
    logger.debug("_inRange | range     | ", range);
    logger.debug("_inRange | distance  | ", measureDistance);
    logger.debug("_inRange | in range? | ", range >= measureDistance);

    return range >= measureDistance;
  }

  static _checkCover(token, target){
    if(!settings.value("cover")) return false;
    return false;
  }

  static registerLayers(){
    TokenLayer.prototype._rayCollisions = function(ray, ids = []){
      for(let token of this.placeables.filter(t => !ids.includes(t.id))){
        let segments = [
          [token.x, token.y, token.x + token.w, token.y],
          [token.x + token.w, token.y, token.x + token.w, token.y + token.h],
          [token.x + token.w, token.y + token.h,  token.x, token.y + token.h],
          [token.x, token.y + token.h, token.x, token.y ],
        ];
        for(let segment of segments){
          if(ray.intersectSegment(segment)){
            return true;
          } 
        }
      }
      return false;
    }

    WallsLayer.prototype._rayCollisions = function(ray, ids = []){
      for(let wall of this.placeables.filter(w => !ids.includes(w.id) && w.data.sense === CONST.WALL_SENSE_TYPES /* && sense blocking? */)){
        if(ray.intersectSegment([...wall.data.c])){
          return true;
        }
      }
      return false;
    }

    Token.prototype._coverCheck = function(placeable){
      logger.debug("_coverCheck | this       | ", this);
      logger.debug("_coverCheck | placeable  | ", placeable);
      
      const targetPoints = [
        [this.x, this.y], 
        [this.x + this.w, this.y],
        [this.x, this.y + this.h], 
        [this.x + this.w, this.y + this.h],
      ];
  
      const attackerPoints = [
        [placeable.x, placeable.y],
        [placeable.x + placeable.w , placeable.y],
        [placeable.x, placeable.y + placeable.h],
        [placeable.x + placeable.w, placeable.y + placeable.h],
      ];
  
      logger.debug("_coverCheck | targetPoints    | ", targetPoints);
      logger.debug("_coverCheck | attackerPoints  | ", attackerPoints);
  
      const options = {
        blockMovement : false, blockSenses : true, mode : 'any'
      };
      
      /*
        Need to do multiple checks
  
        0. filter out the walls that aren't in range
        1. Check for hard cover (walls)
        2. filter out rays that are nulled by the hard cover
        2. Check for soft cover (other tokens)
      */
  
      const HitArray = attackerPoints.map((attacker_point, index)=> {
        return targetPoints.reduce((acc, target_point)=> {
          logger.debug("_coverCheck | Attacker Point   | ", attacker_point);
          logger.debug("_coverCheck | Target Point  | ", target_point);
  
          const ray = new Ray(
            { x : target_point[0], y : target_point[1]}, 
            { x : attacker_point[0], y: attacker_point[1]}
          );
  
          if(index === 1) ray.draw();
  
          //const wall_collide = canvas.walls.getRayCollisions(ray, { blockMovement : false, blockSenses : true, mode : 'any '});
          const wall_collide = canvas.walls._rayCollisions(ray, [this.id, placeable.id]);
          const token_collide = canvas.tokens._rayCollisions(ray, [this.id, placeable.id]);
  
          logger.debug("_coverCheck | wall collision check   | ", wall_collide);
          //logger.debug("_coverCheck | token collision check  | ", token_collide);
          
          if(wall_collide) acc.wall +=1;
          if(token_collide) acc.token +=1;
  
          return acc;
        }, {wall : 0, token : 0});
      });
  
      logger.debug("_coverCheck | Hit Array  | ", HitArray);
    }
  }
}