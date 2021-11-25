const sevenDaysFromToday = (text) => {
        
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const leapYear = year % 4 === 0;
    const monthIs30days = `${month}`.match(/4|6|9|11/);
    const february = month === 2;
    let sevenDaysBound = 0;
    let nextDate = '';
    if(february){
        if(leapYear){
            // February is now 29 days
            sevenDaysBound = 29 -7;
            if(day > sevenDaysBound){
                nextDate = `${year}-${month + 1}-${7 - (29 - day)}`;
            }else{
                nextDate = `${year}-${month}-${day + 7}`;
            }
        }else{
            // February is now 28 days
            sevenDaysBound = 28 -7;
            if(day > sevenDaysBound){
                // It will be next month
                nextDate = `${year}-${month + 1}-${7 - (28 - day)}`;
            }else{
                nextDate = `${year}-${month}-${day + 7}`;
            }
        }
    }else if(monthIs30days){
        sevenDaysBound = 30 - 7;
        if(day > sevenDaysBound){
            nextDate = ` ${month < 12 ? year : year + 1}-${month < 12 ? month+1 : 1}-${7 - (30 - day)}`;
        }else{
            nextDate = `${year}-${month}-${day + 7}`;
        }
    }else{
        sevenDaysBound = 31 - 7;
        if(day > sevenDaysBound){
            nextDate = ` ${month < 12 ? year : year + 1}-${month < 12 ? month + 1 : 1}-${7 - (31 - day)}`;
        }else{
            nextDate = `${year}-${month}-${day + 7}`;
        }
    }
    console.log(`PrevDate: ${year}-${month}-${day} NextDate: ${nextDate}`);

    // format is YYYY-M-D-d without a leading zero
    return text === "normal" ? `${year}-${month}-${day}-${dayOfWeek}` : `${nextDate}-${dayOfWeek}`;
};

// format is YYYY-M-D-d without a leading zero
// Y: year, M: month, D: Day of month, d: day of week eg monday is 0 and tuesday is 1 
const dateInWords = (date) => {
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday", "Sunday"];
    const sufix = {"0": "th", "1": "st", "2": "nd", "3": "rd", "4": "th", "5": "th", "6": "th", "8": "th", "9": "th"};
    const datePieces = date.split('-');

    return `${daysOfWeek[Number(datePieces[3])-1]} 
    ${datePieces[2]}${sufix[datePieces[2].split('')[datePieces[2].split('').length-1]]} 
    ${monthsOfYear[Number(datePieces[1])-1]},
    ${datePieces[0]}`;
};

const DATE_TODAY = sevenDaysFromToday("normal");
const DATE_TODAY_WORD = dateInWords(DATE_TODAY).replace(/\n|\r/g,'').replace(/\s+/g,' ');
const NEXT_WEEK = sevenDaysFromToday("new");
const NEXT_WEEK_WORD = dateInWords(NEXT_WEEK).replace(/\n|\r/g,'').replace(/\s+/g,' ');

const allowDrop = (ev) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
};

const drag_handler = (ev) => {
    ev.preventDefault();
};

let currentElemnt = {};
let newElement = {};
const holder = {};
let currentlyDraggedItemObject = {};

const dragstart_handler = (ev) => {
    currentElemnt = $(ev.target);
    newElement = currentElemnt.html();
    currentlyDraggedItemObject = {};
    currentlyDraggedItemObject[ev.target.getAttribute('id')] = {id: ev.target.getAttribute('id'), name: ev.target.getAttribute('name'), 
    pickup: ev.target.getAttribute('pickup'), dropoff: ev.target.getAttribute('dropoff')};
};

const drop_handler = (ev) => {
    ev.preventDefault();
    if(!holder.hasOwnProperty(Object.keys(currentlyDraggedItemObject)[0])){
        const id = Object.keys(currentlyDraggedItemObject)[0];
        holder[id] = currentlyDraggedItemObject[id];
        ev.currentTarget.style.background = "lightyellow";
        currentElemnt.detach();
        if($(ev.target).hasClass('drop-box')){
            $(ev.target).children().hide();
            $(ev.target).append(newElement);
            $(ev.target).children().show();
            holder[id] = {...holder[id], slot: $(ev.target).attr('box-name'), date1: DATE_TODAY_WORD, date2: NEXT_WEEK_WORD};
        }else{
            const parent = $(ev.target).parent().hasClass('drop-box') ? 
            $(ev.target).parent() : 
            $(ev.target).parentsUntil(".drop-box").parent();
            
            parent.children().hide();
            parent.append(newElement);
            parent.children().show();
            holder[id] = {...holder[id], slot: parent.attr('box-name'), date1: DATE_TODAY_WORD, date2: NEXT_WEEK_WORD};
        }
    }
};

const showAlert = (message) => {
    const str = `<div class="bg-dark text-light text-small p-2 r-10 w-150 alert-box">${message}</div>`;
    $("body").append(str);
    setTimeout(() => {
        $(".alert-box").remove();
    }, 5000);
};

(() => {
    // Write today's date on the page
    document.querySelector(".todays-date").textContent = `Today's date: ${dateInWords(sevenDaysFromToday("normal"))}`;
    
    window.addEventListener('DOMContentLoaded', () => {
        
        // These ids is expected to be unique
        // You need to change the id values if you are to insert data more than once
        const queue = [
            {id: "a4018", name: "Johnson", pickup: "8 Apapa Oshodi Express", dropoff: "5 Wedral Road Owerri"},
            {id: "a5019", name: "Amaka", pickup: "5 Ijesha Express", dropoff: "10A Omuma rd Aba"},
            {id: "a6010", name: "Tope", pickup: "8 Apapa Oshodi Express", dropoff: "2 Alhaji Ahmed rd FCT"},
        ];

        const slots = ["slot1", "slot2", 'slot3'];
        
        for(let i = 0; i < queue.length; i++){
            const htm = `
            <div 
            name="${queue[i].name}" pickup="${queue[i].pickup}" dropoff="${queue[i].dropoff}"
            ondragstart="dragstart_handler(event);" ondrag="drag_handler(event);" draggable="true"
            class="item r-10 light-tabs fit-content mt-1 pointer queue-item" id="${queue[i].id}">
              <div class="r-2 p-2 dropable">
                <div class="border-bott p-1">Name: ${queue[i].name}</div>
                <div class="border-bott p-1">Customer ID: ${queue[i].id.replace(/a/,'')}</div>
                <div class="p-1">Pickup location:</div>
                <div class="border-bott p-1">${queue[i].pickup}</div>
                <div class="p-1">Drop off location:</div>
                <div class="p-1">${queue[i].dropoff}</div>
              <div>
            </div>`;
            if(i === 0){
                document.querySelector("#delivery-queue").insertAdjacentHTML('beforeend',htm);
                let element = document.getElementById(`${queue[i].id}`);
                element.addEventListener("dragstart", dragstart_handler);
            }else{
                document.querySelector(`#${queue[i-1].id}`).insertAdjacentHTML('afterend',htm);
                let element = document.getElementById(`${queue[i-1].id}`);
                element.addEventListener("dragstart", dragstart_handler);
            }
        }

        // we have three slots
        for(let i = 0; i < slots.length; i++){
            let html = `
            <div>
              <div 
              class="drop-box r-15 mb-1 p-1 m-auto" id="slot-${i}" 
              box-name="slot${i+1}" 
              ondrop="allowDrop(event);" ondragover="drop_handler(event);"> <div class="slot-text r-10 m-auto">
                Slot ${i+1}, Depature date ${dateInWords(sevenDaysFromToday("new"))}</div> 
              </div>
            </div>`;
            $("#planner").append(html);
        }

        $("#submit-button").click(() => {
            if(!Object.keys(holder).length){
                showAlert('Please drag some elements from left to right');
                return;
            }
            // check if axios is available
            if(typeof axios == "undefined"){
                showAlert("Sory, axios needs internet connection to work here");
                return;
            }

            try {
                axios.post('http://localhost:8000/api/slots', holder)
                .then((result) => {
                    showAlert("Data inserted successfully");
                       // Empty everything
                       holder = {};
                       currentElemnt = {};
                       newElement = {};
                       ccurrentlyDraggedItemObject = {};
                       $(".drop-box").html('');
                })
            } catch (error) {
                showAlert("Ooops! Something happened");
            }
        });
    });

})();