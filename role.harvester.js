var roleHarvester = {
 
    /** @param {Creep} creep **/
    run: function(creep) {
        //commit source and target to memory and constantly farm between the two if energy cap is there, if not load up?
        if(creep.carry.energy < creep.carryCapacity) {
            //var sources = creep.room.find(FIND_SOURCES);
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            /** if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }*/
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
                //console.log('Looking for source: ' + creep.name);
            }
        }
        else {
            //console.log('Looking for target: ' + creep.name);
            //var targets = creep.room.find(FIND_STRUCTURES, {
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                    }
            });
            /**if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }*/
            if(targets) {
                //console.log(targets + ":" + creep.name);
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
                if(creep.transfer(targets,RESOURCE_ENERGY) == ERR_FULL){
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                //    console.log(creep.room.controller);
                    creep.moveTo(creep.room.controller);
                    }
                }    
                
            }
        }
    }
}
 
module.exports = roleHarvester;