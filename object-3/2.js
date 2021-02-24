import {hasPassedPositionsCondition,hasAnyWins} from "./transform-data.js"
import {findRunnerWithId} from "./shared.js"

export default function MaidenKAD(horseId,isFlat){
    
    console.log("MaidenKAD condition_1 = " + hasPassedPositionsCondition(horseId))
    console.log("MaidenKAD condition_2 = " + hasAnyWins(horseId,isFlat))
 
    
    const isTrue = hasPassedPositionsCondition(horseId) && hasAnyWins(horseId,isFlat)
    
    if(isTrue){
        findRunnerWithId(horseId).maidenKAD = true;
      } 
    
    return isTrue
    
    }