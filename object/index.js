
import {convertDates,sortByDate} from "./transform-data.js"

import dslr from "./1.js"
import beatenFav from "./2.js"
import distWinner from "./3.js"
import rcrseDistWinner from "./4.js"
import isWeekLink from "./5.js"

 convertDates() // convert dates
 sortByDate() // sort


console.log(dslr())
console.log(beatenFav());
console.log(distWinner("2m"))
console.log(rcrseDistWinner('Foss Lass','1m'))
console.log(isWeekLink())