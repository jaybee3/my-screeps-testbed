var roleHarvester2 = {
     run: function(creep){
         var startCpu = Game.cpu.getUsed();
         console.log(creep.name + ' ' + Game.cpu.getUsed());
         if (creep.memory.source == null || (!creep.memory.source)){
             creep.memory.source = creep.findMyClosestSource();
         } //Got SOURCE?
         console.log('H1: ' + (Game.cpu.getUsed() - startCpu));
         if (creep.memory.tgt == null || (!creep.memory.tgt)){
             creep.memory.tgt = creep.findMyClosestTarget();
         }// Got TARGET?
         console.log('H2: ' + (Game.cpu.getUsed() - startCpu));
         if(creep.carry.energy < creep.carryCapacity) {
             var source = Game.getObjectById(creep.memory.source.id);
             if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(source);
                 console.log('H3a: ' + (Game.cpu.getUsed() - startCpu));
             } else {
                 var target = Game.getObjectById(creep.memory.tgt.id);
                 switch (creep.transfer(target,RESOURCE_ENERGY)) {
                     case ERR_NOT_IN_RANGE:
                         creep.moveTo(target);
                         console.log('H3b1: ' + (Game.cpu.getUsed() - startCpu));
                         break;
                     case ERR_FULL:
                         if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                             creep.moveTo(creep.room.controller);
                             console.log('H3b2: ' + (Game.cpu.getUsed() - startCpu));
                         }
                         break;
                 }
             }
         } // Got CAPACITY?
     }
};

module.exports = roleHarvester2;
