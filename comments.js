/**
 * Created by jaybee3 on 05/07/2016.
 */
/**for(var structure in Game.structures){
   
                var thing = Game.structures[structure];
   
                console.log(thing.id + ": " + thing.pos + ": " + thing.structureType); //+ ":" + thing.pos + ":" thing.room);
 
};*/
//Game.structures.forEach((thing) => { console.log(thing.id + ": " + thing.pos + ": " + thing.structureType);});
/**    var tower = Game.getObjectById('TOWER_ID');
 if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
 
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }*/


/**function defendRoom(roomName) {
    var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${roomName}`);
        var towers = Game.rooms[roomName].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
}*/

//HARVESTER2
//add to memory
//role
//end point
//start point
//should be able to see shortest path between source and structure and use that as path
/**
 creep.memory.tgt = creep.findMyClosest();

 console.log('H3b2: ' + (Game.cpu.getUsed() - startCpu));

 //goto recheck

 break;
 can't use goto to replay code?
 **/