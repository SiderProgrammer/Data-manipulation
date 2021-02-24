import {runners,todayRaceObj} from "./data.js"


export function findRunnerWithId(id){
    return runners.find(runner=>{ // improved function from filter to find (runner can be mutated now)
       return runner.horseId == id;
    });
   
}


export function hasMaxTS(horseId){
    const horseTS = todayRaceObj.runnerTSRPRs.find(horse=>horse.hid === horseId).hts;
    const sorted = todayRaceObj.runnerTSRPRs.sort((a,b)=>Number(b.hts) - Number(a.hts))
 
    return sorted[0].hts === horseTS

}

export function hasMaxRPR(horseId){
    const horseHRPR = todayRaceObj.runnerTSRPRs.find(horse=>horse.hid === horseId).hrpr;
    const sorted = todayRaceObj.runnerTSRPRs.sort((a,b)=>Number(b.hrpr) - Number(a.hrpr))
  
    return sorted[0].hrpr === horseHRPR;

}

export function getFirstTwoHRPRdifference(){

    const sorted = todayRaceObj.runnerTSRPRs.sort((a,b)=>Number(b.hrpr) - Number(a.hrpr));
    
    let i = 1;
    while(Number(sorted[0].hrpr) - Number(sorted[i].hrpr) == 0 ){ // omitting duplicate value
        ++i;
    }

    return Number(sorted[0].hrpr) - Number(sorted[i].hrpr);
}


export function sortFormByRaceDate(formTable){
    const sortedTable = formTable.sort(function(a,b){
   return new Date(b.date) - new Date(a.date);
  });
  return sortedTable;
  }
  
  export function getSortedFormByRaceDate(id){
      return sortFormByRaceDate(findRunnerWithId(id).formTable);
   }

export function hadBreakAndWon2ndRace(horseId){

    const runnerFormTable = getSortedFormByRaceDate(horseId);

    for(let i=0;i<runnerFormTable.length;++i){
        if(new Date(runnerFormTable[i].lRaceDate) - new Date(runnerFormTable[i+1].lRaceDate) >= 180){
            if(runnerFormTable[i].lFinalPos === "1" )  return true // and check if race is won
        }
    }
   return false;
}

