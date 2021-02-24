import {hasWon} from "./shared.js"
import data from "./data.js"
export default function distWinner(dist){
  
const filteredByDistance =  data.filter(el=>{
   return el.raceDistance === dist
})

return filteredByDistance.some(horse=>hasWon(horse));

}




