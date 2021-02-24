
 import {isRPRgreater,isTodayPeroidTestPassed,isFormTablePeroidTestPassed} from "./transform-data.js"
 import {findRunnerWithId} from "./shared.js"
 
 export default function ComingOn(horseId){
    console.log("ComingOn condition_1 = " + isRPRgreater(horseId,14))
    console.log("ComingOn condition_2 = " + isTodayPeroidTestPassed(horseId))
    console.log("ComingOn condition_3 = " + isFormTablePeroidTestPassed(horseId))
    
    const isTrue = isRPRgreater(horseId,14) && isTodayPeroidTestPassed(horseId) && isFormTablePeroidTestPassed(horseId)

     if(isTrue){
       findRunnerWithId(horseId).comingOn = true;
     } 

return isTrue
}
