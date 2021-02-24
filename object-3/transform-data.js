import {todayRaceObj,runners} from "./data.js"
import {getSortedFormByRaceDate,findRunnerWithId,getDaysDifference} from "./shared.js"





  
export function getConvertedBeatenBy(distanceToConvert){ // converts to meters

    if(distanceToConvert === undefined) return 0;

    const fractionCharCodes = [
        {
        code:"½".charCodeAt(0),
        value :0.5,
        },
    
        {
        code:"¼".charCodeAt(0),
        value:0.25,
        },
    
        {
        code:"¾".charCodeAt(0),
        value:0.75,
        },
    ] 
    

  
    const distanceArray = Array.from(distanceToConvert)

    const miles = distanceArray.filter(el=>Number(el) || el === "0").join('')
    const fraction = distanceArray.filter(el=>!Number(el) && el !== "0")[0]

    
    let milesInNumber = Number(miles);
    
    if(fraction){
    
        const fractionValue = fractionCharCodes.find(fractionObj=>fractionObj.code === fraction.charCodeAt(0)).value
        milesInNumber+=fractionValue
    }
 
  
  
   return milesInNumber
}

export function convertBeatenByDistances(){
   runners.forEach(runner=>{
        runner.formTable.forEach(race=>{  
         race.lBeatenBy = getConvertedBeatenBy(race.lBeatenBy)
        })
    })
}


const restPeroid = 150; // in days
const withinPeroid = 21 // in days


 // comingon functions

 export function isRPRgreater(horseId,difference){
    const runnerFormTable = getSortedFormByRaceDate(horseId);
    return (runnerFormTable[0].lRPR - runnerFormTable[1].lRPR >= difference)// ||  (runnerFormTable[runnerFormTable.length-2].lRPR - runnerFormTable[runnerFormTable.length-1].lRPR >= difference)
                                                                            // I'm not sure if I should check latest or newest races
 }

 export function isTodayPeroidTestPassed(horseId){


    const todayDate = new Date(todayRaceObj.todayRace.raceDate);

    const runnerFormTable = getSortedFormByRaceDate(horseId);

    const isRestPeroidTrue = (getDaysDifference(runnerFormTable[0].lRaceDate,runnerFormTable[1].lRaceDate) >= restPeroid);
  
    const isWithinPeroidTrue = (getDaysDifference(todayDate,runnerFormTable[0].lRaceDate) <= withinPeroid)


    const hasRunToday = todayRaceObj.runnerIds.some(id=>id == horseId)
  
    return hasRunToday && isWithinPeroidTrue && isRestPeroidTrue 
 }

export function isFormTablePeroidTestPassed(horseId){
 
    const runnerFormTable = getSortedFormByRaceDate(horseId);

    for(let i=2;i<runnerFormTable.length ;++i){
        if(getDaysDifference(runnerFormTable[i-1].lRaceDate,runnerFormTable[i].lRaceDate)>= restPeroid){
         
            if(getDaysDifference(runnerFormTable[i-2].lRaceDate,runnerFormTable[i-1].lRaceDate) <= withinPeroid){
                return true
            }
        }
    }
    return false
}



///////  maiden functions


export function hasAnyWins(horseId,isFlat){
   
    const runner = findRunnerWithId(horseId)
        const formTable = [...runner.formTable];
            let filteredFormTable = []

            if(isFlat){
                filteredFormTable = formTable.filter(race=>race.lTrackDesc.includes("flat"))
            } else {
                filteredFormTable = formTable.filter(race=>!race.lTrackDesc.includes("flat"))
            }
        
        return filteredFormTable.some(race=>race.lFinalPos === "1")
}

export function getRunnerRaces(horseId,amount){
    const races = [...getSortedFormByRaceDate(horseId)]
    races.length = amount

    return races;
}

export function hasPassedPositionsCondition(horseId){
    const positions = ["2","3"]

    const races = getRunnerRaces(horseId,3)
    
   return races.filter(race=>{ // could be reduce used
        return positions.some(position=>position === race.lFinalPos)
    }).length >= 2
}


////

function getSortedAscending(arr){
    return Array.from(new Set(arr.sort((a,b)=>b-a))) // sort and also remove duplicates
}

export function execCombinationRank1(){
    const jockeysSR = runners.map(runner=> Number(runner.todaysJockey.jockeySR))
    const lastRacePos = runners.map(runner=> Number(runner.formTable[0].lFinalPos))
    const statsAvgWinnings = runners.map(runner=>runner.stats.avgWinnings)
    const beatensBy = runners.map(runner=>runner.formTable[0].lBeatenBy)

    const sortedJockeysSr = getSortedAscending(jockeysSR)
    const sortedLastRacePos = getSortedAscending(lastRacePos)
    const sortedStatsAvgWinnings = getSortedAscending(statsAvgWinnings)
    const sortedBeatensBy = Array.from(new Set(beatensBy.sort()))

    const overallRankPoints = []

    runners.forEach(runner=>{
        runner.jockeySRRank = sortedJockeysSr.findIndex(sr=> sr == runner.todaysJockey.jockeySR) + 1
        runner.lastRaceRank = sortedLastRacePos.findIndex(pos => pos == runner.formTable[0].lFinalPos) + 1
        runner.avgWinningsRank = sortedStatsAvgWinnings.findIndex(pos => pos == runner.stats.avgWinnings) + 1
        runner.beatenByRank = sortedBeatensBy.findIndex(number=>number == runner.formTable[0].lBeatenBy) + 1

       
        const points = runner.jockeySRRank * 0.4 + 
                       runner.lastRaceRank * 0.25 + 
                       runner.avgWinningsRank * 0.25 +
                       runner.beatenByRank * 0.10

        runner.overallRankPoints = points 
        overallRankPoints.push(points)
            
        
    })
   
  const sortedOverallRankPoints = Array.from(new Set(overallRankPoints.sort())) // sort ascending (1 st element will be highest overall rank). The smaller value the better rank

    runners.forEach(runner=>{
        runner.overallRank = sortedOverallRankPoints.findIndex(rankPoints=>rankPoints == runner.overallRankPoints) +1;
        console.log("runner overallRank = "+runner.overallRank)
    })
}



