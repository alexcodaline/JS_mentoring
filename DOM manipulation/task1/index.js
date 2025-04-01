const calendarContainer = document.getElementById('calendar');
const eventList = document.getElementById('event-list');
const selectedDateElem = document.getElementById('selected-date');
const eventForm = document.getElementById('event-form');
const eventInput = document.getElementById('event-input');
const saveEventButton = document.getElementById('save-event');

let events = JSON.parse(localStorage.getItem('events')) || {};
let selectedDate = null;

function createCalendar(year, month) {
    const date = new Date(year, month);
    let calendarHTML = `
        <table>
            <caption>${month + 1}/${year}</caption>
            <tr>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wen</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
            </tr>
            <tr>`;

    for (let i = 0; i < getDay(date); i++) {
        calendarHTML += `<td></td>`;
    }

    while (date.getMonth() === month) {
        let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        calendarHTML += `
            <td class="calendar-day" data-date="${currentDate}">
                ${date.getDate()}
            </td>`;

        if (getDay(date) % 7 === 6) {
            calendarHTML += `</tr><tr>`;
        }

        date.setDate(date.getDate() + 1);
    }

    calendarHTML += `</tr></table>`;
    calendarContainer.innerHTML = calendarHTML;

    document.querySelectorAll('.calendar-day').forEach(cell => {
        cell.addEventListener('click', function () {
            const date = this.getAttribute('data-date');
            showEvents(date);
        });
    });
}

function getDay(date) {
    let day = date.getDay();
    if (day === 0) day = 7; 
    return day - 1;
}


function showEvents(date) {
    selectedDate = date;
    selectedDateElem.textContent = date;
    eventList.innerHTML = '';

    if (events[date]) {
        events[date].forEach((event, index) => {
            const eventItem = document.createElement('li');
            eventItem.classList.add('event-item');
            eventItem.innerHTML = `${event} <button class="delete-btn" data-index="${index}">Delete event</button>`;
            eventList.appendChild(eventItem);
            eventItem.querySelector('.delete-btn').addEventListener('click', function () {
                deleteEvent(date, index);
            });
        });
    }
    eventForm.style.display = 'block';
}


function addEvent(date, eventText) {
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push(eventText);
    localStorage.setItem('events', JSON.stringify(events));
    showEvents(date);
}

function deleteEvent(date, index) {
    events[date].splice(index, 1);
    if (events[date].length === 0) {
        delete events[date];
    }
    localStorage.setItem('events', JSON.stringify(events));
    showEvents(date); 
}


saveEventButton.addEventListener('click', function () {
    const eventText = eventInput.value.trim();
    if (eventText) {
        addEvent(selectedDate, eventText);
        eventInput.value = '';
    }
});
const today = new Date();
createCalendar(today.getFullYear(), today.getMonth());