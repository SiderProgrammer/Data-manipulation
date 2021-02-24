import {hasWon,getLastRun} from "./shared.js"

export default function beatenFav(){
   const lastRun = getLastRun(); 
   const wasFavourite = lastRun.sp.slice(-1) === "F"

   return wasFavourite && !hasWon(lastRun);
}

