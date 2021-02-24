
import data from "./data.js";

export function getDaysDifference(date1, date2) {
    const dt1 = date1;
    const dt2 = date2;

     const oneDayInMilis = 1000 * 60 * 60 * 24;
     return Math.floor(( dt1 - dt2 ) / oneDayInMilis);
  }
export function getLastRun(){
    return data[0];
}
export function getLastRunDate(){
    // first element in array because it is sorted by date in descending order
    return data[0].raceDate 
}

export function hasWon(run){
   return run.pos_finishPos_winnerRunnerIp_wgt.slice(0,1) === "1" || false
}


export function getNumberOfWeek(_date) {
    const date = new Date(_date);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getWeeks(){
    return data.map(el=>{
        return getNumberOfWeek(el.raceDate)
    })
}

