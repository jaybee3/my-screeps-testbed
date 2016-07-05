var roleBuilder = {
 
    /** @param {Creep} creep **/
    run: function(creep) {
 
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        
        //write target to memory if not building wipe it?
 
        if(creep.memory.building) {
            //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            //console.log(targets.length)
            /**if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }*/
            //console.log((targets))
            if(targets) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            } else {
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
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            }
        }
        else {
            //var sources = creep.room.find(FIND_SOURCES);
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            //console.log(sources)
            //if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                //creep.moveTo(sources[0]);
                creep.moveTo(sources);
            }
        }
    }
};
 
module.exports = roleBuilder;