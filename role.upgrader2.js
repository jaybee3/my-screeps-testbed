var roleUpgrader2 = {
 
    /** @param {Creep} creep **/
    run: function(creep) {
         var startCpu = Game.cpu.getUsed();
        if(creep.carry.energy == 0) {
            var source = creep.checkMemoryForSource();
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        console.log(creep.name + ' ' + creep.memory.role + ' ' + (Game.cpu.getUsed() - startCpu));
    }
};
 
module.exports = roleUpgrader2;