import {getWeeks,hasWon} from "./shared.js"
import data from "./data.js"
export default function isWeekLink(){
    const weeks = getWeeks()

    function isConditionMet(i){
        return weeks[i] === weeks[i+1] && hasWon(data[i]) && hasWon(data[i])
    }

    let sameWeeks = 0;

    if(isConditionMet(0)) sameWeeks++;

    for(let i=0;i<weeks.length-1;++i){
        if(isConditionMet(i))
        {
            sameWeeks++;
            if(sameWeeks === 2) return true;
        }
        else
        {
            sameWeeks = 0;
        }
    }
    return false;

}

