$(document).ready(function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      defaultDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          id: 999,
          title: 'Running',
          start: '2019-01-09T16:00:00',
            end: '2019-01-09T17:30:00'
        },
        {
          id: 999,
          title: 'Running',
          start: '2019-01-16T16:00:00',
            end: '2019-01-16T17:30:00'
        },
        {
          id: 999,
          title: 'Running',
          start: '2019-01-18T16:00:00',
            end: '2019-01-18T17:30:00'
        },
        {
          id: 999,
          title: 'Running',
          start: '2019-01-20T16:00:00',
            end: '2019-01-20T17:30:00'
        },
        {
          id: 999,
          title: 'Running',
          start: '2019-01-22T16:00:00',
            end: '2019-01-22T17:30:00'
        },
        {
          id: 777,
          title: 'Biking',
          start: '2019-01-11T16:00:00',
            end: '2019-01-11T17:30:00'
        },
        {
          id: 777,
          title: 'Biking',
          start: '2019-01-14T16:00:00',
            end: '2019-01-14T17:30:00'
        },
        {
          id: 888,
          title: 'Walking',
          start: '2019-01-17T16:00:00',
            end: '2019-01-17T17:30:00'
        },
        {
          id: 888,
          title: 'Walking',
          start: '2019-01-23T16:00:00',
            end: '2019-01-23T17:30:00'
        },
        {
          id: 888,
          title: 'Walking',
          start: '2019-01-29T16:00:00',
            end: '2019-01-29T17:30:00'
        }
      ]
    });

  });
