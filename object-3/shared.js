import {runners} from "./data.js"

export function findRunnerWithId(id){
    return runners.find(runner=>{ // improved function from filter to find (runner can be mutated now)
       return runner.horseId == id;
    });
   
}
export function sortFormByRaceDate(formTable){
  const sortedTable = formTable.sort(function(a,b){
 return new Date(b.date) - new Date(a.date);
});
return sortedTable;
}


export function getDaysDifference(d1,d2){
   const day = 1000 * 60 * 60 * 24;

   return Math.floor((new Date(d1) - new Date(d2)) / day)
}

export function getSortedFormByRaceDate(id){
    return sortFormByRaceDate(findRunnerWithId(id).formTable);
 }