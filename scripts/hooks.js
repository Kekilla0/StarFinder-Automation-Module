import { settings } from './settings.js';
import { helper } from './helper.js';

Hooks.on(`init`, settings.register);
Hooks.on('ready', helper.register);


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