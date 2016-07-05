var roleUpgrader = {
 
    /** @param {Creep} creep **/
    run: function(creep) {
        var startCpu = Game.cpu.getUsed();
        if(creep.carry.energy == 0 || creep.carry.energy < creep.carryCapacity) {
            //console.log(creep.carry.energy)
            //var sources = creep.room.find(FIND_SOURCES);
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            /**if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }*/
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //    console.log(creep.room.controller);
                creep.moveTo(creep.room.controller);
            }
        }
        console.log(creep.name + ' ' + creep.memory.role + ' ' + (Game.cpu.getUsed() - startCpu));
    }
    
};
 
module.exports = roleUpgrader;