    import {findRunnerWithId} from "./shared.js"

export default function getRunsThisSeason(horseId,seasonStart){
    const runnerFormTable = findRunnerWithId(horseId).formTable

    const date = new Date(seasonStart)

    return  runnerFormTable.filter(race=>new Date(race.lRaceDate) >= date)
}   