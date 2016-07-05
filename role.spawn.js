var roleSpawn = {

    /** @param {Creep} creep **/
    run: function (spawn) {
        //var startCpu = Game.cpu.getUsed();

        //count roles? if no harv make priority spawn?
        //check energy
        //check bodypart cost

        var defaultDuty = [WORK, WORK, CARRY, MOVE];
        /**var creepCost = defaultRole.reduce(function(a, b) {
            if (typeof a === 'string'){
                 return BODYPART_COST[a] + BODYPART_COST[b];
            } else {
                return a + BODYPART_COST[b];
            }
        });*/
        var creepCost = getCost(defaultDuty);

        console.log(creepCost);
        console.log(spawn.room.energyAvailable);

        /**while (creepCost < spawn.room.energyAvailable){
            defaultRole.push(WORK);
            creepCost = getCost(defaultRole);
        }**/

        while (getCost(defaultDuty) < spawn.room.energyAvailable) {
            defaultDuty.push(WORK);
            defaultDuty.push(WORK);
            defaultDuty.push(CARRY);
            defaultDuty.push(MOVE);
            //creepCost = getCost(defaultRole);
        }
        console.log(getCost(defaultDuty) + ':' + defaultDuty);

        while (getCost(defaultDuty) >= spawn.room.energyAvailable) {
            defaultDuty.pop();
        }

        console.log(getCost(defaultDuty) + ':' + defaultDuty);

        var countNewHarv = _.filter(Game.creeps,(creep)=> creep.memory.role == 'newHarv');
        var countNewUpgr = _.filter(Game.creeps,(creep)=> creep.memory.role == 'newUpgr');
        if (countNewHarv == 0){
            console.log('Spawning new newHarv:' + Game.spawns.Spawn1.createCreep(defaultDuty,undefined, {role: 'newHarv'}));
        }
        if (countNewUpgr == 0 && spawn.room.energyAvailable > 600){
            console.log('Spawning new newUpgr:' + Game.spawns.Spawn1.createCreep(defaultDuty,undefined, {role: 'newUpgr'}));
        }


        /**
         var roles = [
         {role: 'harvester', cap: 2, duty: [WORK,CARRY,MOVE]},

         {role: 'harvester2', cap: 2, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE]},
         {role: 'harvProto', cap: 0, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,WORK,CARRY,CARRY, MOVE, MOVE]},
         {role: 'builder', cap: 1, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE]},
         {role: 'upgrader', cap: 2, duty: [WORK,CARRY,MOVE]},
         {role: 'upgrader2', cap: 1, duty: [WORK,CARRY,MOVE]},
         {role: 'bigHarvester', cap: 2, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,WORK,CARRY,CARRY, MOVE, MOVE]},//,MOVE,MOVE]},
         {role: 'repairer', cap: 1, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE]},
         {role: 'bigUpgrader', cap: 2, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,WORK,CARRY,CARRY, MOVE, MOVE]}//,MOVE,MOVE]},
         ]; //roles to be redone for auto production based on avail energy
         roles.forEach( function(role) {
            var type = _.filter(Game.creeps, (creep) => creep.memory.role == role.role);
            console.log(role.role + ":" + type.length + ":" + role.cap);
            if (type.length < role.cap) {
                var newName = Game.spawns.Spawn1.createCreep(role.duty, undefined, {role: role.role});
                console.log('Spawning new ' + role.role + ": " + newName);
            }
        }); //spawn new creeps based on role limits, maybe change to % based roles
         */

    }
};    

function getCost(role){
    return role.reduce(function(a, b) {
        if (typeof a === 'string'){
            return BODYPART_COST[a] + BODYPART_COST[b];
        } else {
            return a + BODYPART_COST[b];
        }
    });
}


module.exports = roleSpawn;