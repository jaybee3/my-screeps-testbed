var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader2 = require('role.upgrader2');
var spawnCheck = require('role.spawn');

Creep.prototype.findMyClosestTarget = function findMyClosestTarget(){
    return this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
        }
    });
};
Creep.prototype.findMyClosestSource = function findMyClosestSource(){
    return this.pos.findClosestByPath(FIND_SOURCES, {
        filter: (source) => {
            return source.energy < source.energyCapacity
        }
    });
};
Creep.prototype.checkMemoryForSource = function checkMemoryForSource(){
    if (this.memory.source == null || (!this.memory.source)){
        this.memory.source = this.findMyClosestSource();
    } //Got SOURCE?
    return Game.getObjectById(this.memory.source.id)
};

module.exports.loop = function () {

    console.log('Energy: ' + Game.spawns.Spawn1.room.energyAvailable + '/' + Game.spawns.Spawn1.room.energyCapacityAvailable);

    spawnCheck.run(Game.spawns.Spawn1);

    for(var nameInMem in Memory.creeps){
    var x = false;
    for(var nameInGame in Game.creeps){
        if (nameInGame == nameInMem){
            x = true;
            break;
        }
    }
    if (!x){
        delete Memory.creeps[nameInMem];
    }
} //memory check

    var roles = [
    {role: 'harvester', cap: 0, duty: [WORK,CARRY,MOVE]},
    {role: 'harvester2', cap: 0, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE]},
    {role: 'harvProto', cap: 0, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,WORK,CARRY,CARRY, MOVE, MOVE]},
    {role: 'builder', cap: 1, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE]},
    {role: 'upgrader', cap: 0, duty: [WORK,CARRY,MOVE]},
    {role: 'upgrader2', cap: 1, duty: [WORK,CARRY,MOVE]},
    {role: 'bigHarvester', cap: 0, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,WORK,CARRY,CARRY, MOVE, MOVE]},//,MOVE,MOVE]},
    {role: 'repairer', cap: 1, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE]},
    {role: 'bigUpgrader', cap: 0, duty: [WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,WORK,CARRY,CARRY, MOVE, MOVE]}//,MOVE,MOVE]},
]; //roles to be redone for auto production based on avail energy
    roles.forEach( function(role) {
        var type = _.filter(Game.creeps, (creep) => creep.memory.role == role.role);
        console.log(role.role + ":" + type.length + ":" + role.cap);
        if (type.length < role.cap) {
            var newName = Game.spawns.Spawn1.createCreep(role.duty, undefined, {role: role.role});
            console.log('Spawning new ' + role.role + ": " + newName);
        }
    }); //spawn new creeps based on role limits, maybe change to % based roles

    for(var creepName in Game.creeps) {
        var creep = Game.creeps[creepName];
        switch (creep.memory.role) {
            case 'harvester':   
            case 'bigHarvester':
            case 'harvProto':
                roleHarvester.run(creep);
                break;
            case 'harvester2':
            case 'newHarvester':
                roleHarvester2.run(creep);
                break;
            case 'upgrader':
            case 'bigUpgrader':   
                roleUpgrader.run(creep);       
                break;
            case 'upgrader2':
            case 'newUpgrader':
                roleUpgrader2.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'repairer': 
                roleRepairer.run(creep);
                break;
        }
    } //creeps do their jobs based on roles in mem
}; //main loop