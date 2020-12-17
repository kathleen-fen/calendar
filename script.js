function createCalendar(elem, year, month, courses=[]) {

    let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    let d = new Date(year, mon);
    today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log(courses);

    let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    // <td> ячейки календаря с датами
    while (d.getMonth() == mon) {
  //    debugger  
        console.log('d',d);
        console.log(courses.filter(el=>+el==(+d)));
      if (+d==(+today)) {
        table += '<td><div class="day today"><div>' + d.getDate() + '</div></div></td>';
      }  else if (courses.filter(el=>+el==(+d)).length){
        table += '<td><div class="day course-day"><div>' + d.getDate() + '</div></div></td>';
      }  else {
        table += '<td><div class="day"><div>' + d.getDate() + '</div></div></td>';
      }
      

      if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    // закрыть таблицу
    table += '</tr></table>';

    elem.innerHTML = table;
  }

  function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day == 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
  }

  createCalendar(calendar, 2020, 12, [new Date(2020, 11, 11), new Date(2020, 11, 22), new Date(2020, 11, 7)]);