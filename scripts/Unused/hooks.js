import { settings } from './settings.js';
import { helper } from './helper.js';
import { ITEM } from './Handlers/Item.js';

Hooks.on(`init`, settings.register);
Hooks.on('ready', () => {
  ITEM.register();
});


/**
 * Known Issues :
 *  rollDamage & rollAttack do not return values
 * 
 * Fixes :
 *   
 *  
 * Ideas :
 *  coverCheck
 * 
 */