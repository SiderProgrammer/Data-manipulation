
import data from "./data.js";

export function convertDates(){
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
    function convertMonthToNumber(month){
      
        const index =  (monthNames.findIndex(el=>el.slice(0,3) === month) + 1).toString()
        let number = index;

        number.length === 1 && ( number = "0" + number);

        return number;
    }


    data.forEach((el)=>{ // mutate array of objects
        
       const raceDate = el.raceDate;

        const day = Number(raceDate.slice(0,2))
        const month = Number(convertMonthToNumber(raceDate.slice(2,5))) -1
        const year = Number("20"+raceDate.slice(5,7))

      el.raceDate = Date.UTC(year,month,day);
    
        return el;
    })

  }

  export function sortByDate(){
    data.sort((a,b)=>{
    return  b.raceDate- a.raceDate
    })
  }

 