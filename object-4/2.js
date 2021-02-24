import {findRunnerWithId,getSortedFormByRaceDate,hadBreakAndWon2ndRace} from "./shared.js"
import {todayRaceObj} from "./data.js"

export default function isFreshStart(horseId){
    const todayDate =  todayRaceObj.raceDate

    const runnerFormTable = getSortedFormByRaceDate(horseId);
    const lastWin = runnerFormTable.find(race=>race.lFinalPos === "1")
    
    if(!lastWin){
        findRunnerWithId(horseId).isFreshStart = false
        return false;
    }
   
    const lastWinDate = lastWin.lRaceDate

    const condition = (new Date(todayDate) - new Date(lastWinDate) >= 180)

        const isTrue = condition && hadBreakAndWon2ndRace(horseId)

        if(isTrue){
            findRunnerWithId(horseId).isFreshStart = true
        }else{
            findRunnerWithId(horseId).isFreshStart = false
        }

    return  isTrue;
}
