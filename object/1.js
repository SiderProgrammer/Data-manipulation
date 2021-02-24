
import {getDaysDifference,getLastRunDate} from "./shared.js"

export default function dslr(){
return getDaysDifference(new Date(),new Date(getLastRunDate()))
}

