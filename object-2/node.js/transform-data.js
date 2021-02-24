import {runners,today} from "./data.js"
const fractionCharCode = "½".charCodeAt(0)

export function getConvertedDistance(distanceToConvert){ // converts to meters
    const miles = distanceToConvert.slice(0,2);
    const furlongs = distanceToConvert.slice(2);

    const milesInNumber = Number(miles[0]);
    let furlongsInNumber = 0;

    for(let i=0;i<furlongs.length-1;++i){
 
        if(Number(furlongs[i])){
            furlongsInNumber+=Number(furlongs[i])
        }else if(furlongs[i].charCodeAt(0) === fractionCharCode){ // if comparing string, it doesn't work (it must be char code)
            furlongsInNumber+=0.5;
           
        }
    }
    furlongsInNumber /=8; // 1 furlong = 1/8 mile
  
   return distanceToConvert = milesInNumber+furlongsInNumber
}

export function convertRacesDistances(){
    runners.forEach(runner=>{
        runner.formTable.forEach(race=>{
         race.lRaceDistance = getConvertedDistance(race.lRaceDistance)
        })
    })
}
export function convertTodayRaceDistance(){
  today.raceDistance =  getConvertedDistance(today.raceDistance)
    
}
   
export function getDatesFromFormTable(){
    return runners.flatMap(runner=>{ // flat map spreads arrays
       return runner.formTable.map(race=>new Date(race.lRaceDate))
    })
}

export function sort(array){
    return array.sort((a,b)=>b-a)
}

export function getSortedDates(){
 return   sort(getDatesFromFormTable())
}


export function convertDate(date){
    var d = new Date(date);
    
    return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
    ].join('-');  
}

export function findRunnerWithId(id){
     const runnerWithId = runners.filter(runner=>{
        return runner.horseId == id;
     });
    
     return runnerWithId[0];
 }

function sortFormByRaceDate(formTable){
   const sortedTable = formTable.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.date) - new Date(a.date);
});
return sortedTable;
}


export function getLastRunRunnerWithId(id){
    const raceRecords = sortFormByRaceDate(findRunnerWithId(id).formTable);
     return raceRecords[0];
 }




export function convertPreviousEventsDates(){
    runners.forEach(runner=>{
        runner.previousEvents.forEach(event=>{
               event.eventDate = convertDate(event.eventDate)
        })
    })
   }


   export function findSmallerDate(a1,a2){
    for(let i = a2.length-1;i >= 0;--i){
      
        if(a2[i] > a1) return a2[i]
    }
    
}


export function execIsFirstTimeNewTrainer(horseId){
    const runner = findRunnerWithId(horseId)

    const changes = runner.previousEvents.filter(event=>{ // getting events where trainer changed
      return  event.eventName.includes("Changed Trainer")
    })
    
    const changeDates = changes.map(change=>change.eventDate) // getting dates where trainer changed
    
    const runnerRaces = sortFormByRaceDate(runner.formTable) // getting runner races

    const runnerRacesDates = runnerRaces.map(race=>race.lRaceDate) // getting runner races dates
    
    const mappedDatesToWrite = changeDates.map(date=>{ // getting runner races dates where isFirstTimeNewTrainer
        return findSmallerDate(date,runnerRacesDates)
     })
    
    const datesToWrite =  mappedDatesToWrite.filter(el=>el != undefined) // filtering dates from undefined

   const indexesToWrite =  datesToWrite.map(date=>{ // getting runner formTable races indexes where should be isFirstTimeNewTrainer write
      return runnerRaces.findIndex(race=>race.lRaceDate === date) 
    })

    const runnerIndex = runners.findIndex(runner=>runner.horseId === horseId) // getting runner index from runners array to mutate runner with new properties // could be also runners.find(horseId) instead of index


    runners[runnerIndex].isFirstTimeNewTrainer = true // write on top, I think it is not needed

  indexesToWrite.forEach(index=>{ // write on race, I think it is needed
      runners[runnerIndex].formTable[index].isFirstTimeNewTrainer = true;
  })

 
    return (indexesToWrite.length > 0 ? true : false) // returning true if there was firstTImeNewTrainer
  
}

