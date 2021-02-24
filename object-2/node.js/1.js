import {today} from "./data.js"
import {getLastRunRunnerWithId} from "./transform-data.js"

export default function DownInTrip(horseId){
   
    const lastRunner =  getLastRunRunnerWithId(horseId)
    if(!lastRunner) return false

    const lRaceDistance =lastRunner.lRaceDistance
    
   return (today.raceDistance > lRaceDistance ? true : false)
   
}