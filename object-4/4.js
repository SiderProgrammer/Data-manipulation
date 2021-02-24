import {findRunnerWithId,hasMaxRPR,hasMaxTS} from "./shared.js"

export default function isTopMarks(horseId){
    //  console.log(hasMaxTS(horseId))
    //  console.log(hasMaxRPR(horseId))
    const isTrue = hasMaxTS(horseId) && hasMaxRPR(horseId)
  
    if(isTrue){
      findRunnerWithId(horseId).isTopMarks = true;
    }else{
      findRunnerWithId(horseId).isTopMarks = false;
    }
  
      return isTrue
  }
  