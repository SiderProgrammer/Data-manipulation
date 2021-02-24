import {runners} from "./data.js"
import DownInTrip from "./1.js"
import IsFirstTimeNewTrainer from "./2.js"

import {
    convertRacesDistances,
    convertTodayRaceDistance,
    convertPreviousEventsDates
} from "./transform-data.js"


convertRacesDistances()
convertTodayRaceDistance()
convertPreviousEventsDates()

//ME to test
// 3248385 no
// 3265144 yes

// LOOP over all runners in data.js
// call each function 
// update object at runner top level with new stat DownInTrip:x  isFirstTimeNewTrainer: x
//console.log(DownInTrip(3265144))
//console.log(IsFirstTimeNewTrainer(2564356))

runners.forEach(runner=>{
    DownInTrip(runner.horseId) ? runner.DownInTrip = true : runner.DownInTrip = false
    IsFirstTimeNewTrainer(runner.horseId) // writing in function
   
})
//console.log(runners)
