import {findRunnerWithId} from "./shared.js"
import {todayRaceObj} from "./data.js"

export default function isDroppingDown(horseId, isFlat){
    const todayHRPR = Number(todayRaceObj.runnerTSRPRs.find(horse=>horse.hid === horseId).hrpr); // change to OR
  
    const runnerFormTable = findRunnerWithId(horseId).formTable
  
    let races = []
  
    if(isFlat){
      races = runnerFormTable.filter(race=>race.lTrackDesc.includes("flat"))
    }else{
        races = runnerFormTable.filter(race=> !race.lTrackDesc.includes("flat"))
    }
   
   
    for(let i in races){
        if(todayHRPR > Number(races[i].lRPR)){
            findRunnerWithId(horseId).isDroppingDown = false
            return false

        }
    }
    findRunnerWithId(horseId).isDroppingDown = true
    return true;
  }
  
