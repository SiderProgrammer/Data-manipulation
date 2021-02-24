import {findRunnerWithId,hasMaxRPR,getFirstTwoHRPRdifference} from "./shared.js"

export default function isPostMarkPick(horseId){
    const isTrue = hasMaxRPR(horseId)

if(isTrue){
    findRunnerWithId(horseId).isPostMarkPick = true;
    return getFirstTwoHRPRdifference()
}else{
    findRunnerWithId(horseId).isPostMarkPick = false
    return false;
}

    
}
