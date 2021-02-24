import {hasWon} from "./shared.js"
import data from "./data.js"
export default function rcrseDistWinner(racecourse,dist){
  
    const filteredByDistanceAndRacecourse =  data.filter(el=>{

       const splitedBySpace = el.raceCourse.split(" ")
       let raceCourse = splitedBySpace[0];

       if(splitedBySpace.length >3){
         raceCourse +=" "+ splitedBySpace[1]
       }
  
       return el.raceDistance === dist && raceCourse === racecourse;
    })
 
    return filteredByDistanceAndRacecourse.some(horse=>hasWon(horse));
    
    }
    
  
    
    
    