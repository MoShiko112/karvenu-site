async function loadCalendar() {
  const year = new Date().getFullYear();
  // geonameid=293397 = Tel Aviv; candles+havdalah turned on
  const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&year=${year}&geonameid=293397&candles=on&havdalah=on`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const events = data.items.filter(
      it => it.category === 'candles' || it.category === 'havdalah'
    );
    const tbody = document.querySelector('#calendar-table tbody');
    events.forEach(ev => {
      const tr = document.createElement('tr');
      const dateCell = document.createElement('td');
      const evCell   = document.createElement('td');
      const timeCell = document.createElement('td');
      const d = new Date(ev.date);
      dateCell.textContent = d.toLocaleDateString('he-IL');
      evCell.textContent   = ev.category === 'candles' ? 'הדלקת נרות' : 'הבדלה';
      timeCell.textContent = d.toLocaleTimeString('he-IL', { hour:'2-digit', minute:'2-digit' });
      tr.append(dateCell, evCell, timeCell);
      tbody.appendChild(tr);
    });
  } catch(err) {
    console.error('Error loading calendar:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadCalendar);
