import ReactDOM from "react-dom/client";
import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
// import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex",
    paddingBlock: "100px"
  },
  left: {
    marginRight: "20px",
    marginLeft: "50px"
  },
  main: {
    flexGrow: "1",
    marginRight: "100px"
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    console.log("sessionKey: " + this.getCookie("sessionKey"));
    console.log("username: " + this.getCookie("username"));
    console.log("idRole: " + this.getCookie("idRole"));

    if(this.getCookie("idRole") === "1"){
      this.eventAreaImgHref = "https://i.imgur.com/9J0ObgV.jpg";
      this.eventAreaClickHref = "http://localhost:8081/update_delete_class.html?id=";
    }
    else if(this.getCookie("idRole") === "2"){
      this.eventAreaImgHref = "https://i.imgur.com/XOAGxdI.png";
      this.eventAreaClickHref = "http://localhost:8081/sign_up.html?id="
    }
    else{
      this.eventAreaImgHref = "https://i.imgur.com/XOAGxdI.png";
      this.eventAreaClickHref = "http://localhost:8081/log.html"
    }

    this.calendarRef = React.createRef();
    this.sundays = this.getAllDayOfWeek(0);
    this.mondays = this.getAllDayOfWeek(1);
    this.tuesdays = this.getAllDayOfWeek(2);
    this.wednesdays = this.getAllDayOfWeek(3);
    this.thursdays = this.getAllDayOfWeek(4);
    this.fridays = this.getAllDayOfWeek(5);
    this.saturdays = this.getAllDayOfWeek(6);
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      onEventClick: async args => {
        var idClass = args.e.data.idClass;
        if(this.getCookie("idRole") === ""){
          window.location.replace(this.eventAreaClickHref);
        }
        else {
          window.location.replace(this.eventAreaClickHref + idClass);
        }
      },
      onBeforeEventRender: (args) => {
        args.data.areas = [
          {
            width: 20,
            height: 50,
            visibility: "Hover",
            image: this.eventAreaImgHref
          },
        ];
      },
    };
    this.showMyClasses = this.showMyClasses.bind(this);
    this.showAllClasses = this.showAllClasses.bind(this);
  }

  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  getDays(date)
  {
    var d = new Date(date);
    var weekDay = d.getDay();
    switch (weekDay) {
      case 0:
        return this.sundays;
      case 1:
        return this.mondays;
      case 2:
        return this.tuesdays;
      case 3:
        return this.wednesdays;
      case 4:
        return this.thursdays;
      case 5:
        return this.fridays;
      case 6:
        return this.saturdays;
      default:
        break;
    }
  }

  getAllDayOfWeek(weekDay) {
    var d = new Date();
    var resultDays = [];
    for (var month = 0; month < 12; month++) {
      d.setMonth(month);
      d.setDate(1);

      // Get the first of selected weekday in the month
      while (d.getDay() !== weekDay) {
        d.setDate(d.getDate() + 1);
      }

      // Get all the selected days in the month
      while (d.getMonth() === month) {
        var dayStr = (d.getDate() < 10 ? "0" : "") + d.getDate();
        var monthStr = ((d.getMonth() + 1) < 10 ? "0" : "") + (d.getMonth() + 1);
        var dateStr = d.getFullYear() + "-" + monthStr + "-" + dayStr + "T";
        resultDays.push(dateStr);
        d.setDate(d.getDate() + 7);
      }
    }

    return resultDays;
  }

  filterCourse(course)
  {
    return true;
  }

  fetchCourses(uri) {
    var usernameStr = this.getCookie("username");
    var sessionKeyStr = this.getCookie("sessionKey");
    const data = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr
    };

    const coursesRequest = new Request(uri);
    fetch(coursesRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log("Server courses response received");
          var events = [];
          var listLen = (data.classes).length;
          var counter = 1;
          for (var i = 0; i < listLen; i++) {
            var course = data.classes[i];
            var shouldDisplay = this.filterCourse(course);
            if (!shouldDisplay)
            {
              continue;
            }
            if (course.id_type_of_classes == 1)
            {
              var days = this.getDays(course.class_date);
              for (var d = 0; d < days.length; d++)
              {
                var calendarEvent = {};
                calendarEvent.id = counter;
                calendarEvent.idClass = course.id_class;
                calendarEvent.text = course.type_of_dance + "\n instruktor: " + course.name + "\n poziom: " + course.dance_level;
                calendarEvent.start = days[d] + course.start_time + ":00";
                calendarEvent.end  = days[d] + course.end_time + ":00";
                var color = "";
                switch (course.type_of_dance) {
                  case "salsa":
                    color = "gold";
                    break;
                  case "bachata":
                    color = "greenyellow";
                    break;
                  case "breakdance":
                    color = "lightskyblue";
                    break;
                  case "taniec uzytkowy":
                    color = "orange";
                    break;
                  case "taniec ludowy":
                    color = "blueviolet";
                    break;
                  case "taniec towarzyski":
                    color = "aqua";
                    break;
                  case "tango argentino":
                    color = "crimson";
                    break;
                  case "flamenco":
                    color = "papayawhip";
                    break;
                  case "zajecia dla dzieci":
                    color = "hotpink";
                    break;
                }
                calendarEvent.backColor = color;
                events.push(calendarEvent);
                counter++;
              }
            }
            else
            {
              var calendarEvent = {};
              calendarEvent.id = counter;
              calendarEvent.idClass = course.id_class;
              calendarEvent.text = course.type_of_dance + "\n instruktor: " + course.name + "\n poziom: " + course.dance_level;
              calendarEvent.start = course.class_date + "T" + course.start_time + ":00";
              calendarEvent.end  = course.class_date + "T" + course.end_time + ":00";
              calendarEvent.price = "Cena: " + course.price
              var color = "";
              switch (course.type_of_dance) {
                case "salsa":
                  color = "gold";
                  break;
                case "bachata":
                  color = "greenyellow";
                  break;
                case "breakdance":
                  color = "lightskyblue";
                  break;
                case "taniec uzytkowy":
                  color = "orange";
                  break;
                case "taniec ludowy":
                  color = "blueviolet";
                  break;
                case "taniec towarzyski":
                  color = "aqua";
                  break;
                case "tango argentino":
                  color = "crimson";
                  break;
                case "flamenco":
                  color = "papayawhip";
                  break;
                case "zajecia dla dzieci":
                  color = "hotpink";
                  break;
              }
              calendarEvent.backColor = color;
              events.push(calendarEvent);
              counter++;
            }
          }
          const startDate = "2023-02-01";
          this.calendar.update({startDate, events});
        })
      }
      else
      {
        console.log("Error!");
      }
    })
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    this.calendarIsReady = true;
    this.fetchCourses("http://localhost:8888/schedule");
  }

  showAllClasses(event) {
    event.preventDefault();
    if (this.calendarIsReady)
    {
      this.fetchCourses("http://localhost:8888/schedule");
    }
  }

  showMyClasses(event) {
    event.preventDefault();
    if (this.calendarIsReady)
    {
      this.fetchCourses("http://localhost:8888/myclasses");
    }
  }

  render() {
    if (this.getCookie("sessionKey") === "")
    {
      return (
        <div style={styles.wrap}>
          <div style={styles.left}>
            <DayPilotNavigator
              selectMode={"week"}
              showMonths={2}
              skipMonths={2}
              startDate={"2022-12-07"}
              selectionDay={"2022-12-07"}
              onTimeRangeSelected={ args => {
                this.calendar.update({
                  startDate: args.day
                });
              }}
            />
          </div>
          <div style={styles.main}>
            <DayPilotCalendar
              {...this.state}
              ref={this.calendarRef}
            />
          </div>
        </div>
      )
    }
    else
    {
      if(this.getCookie("idRole") === "2") {
        return (
          <div>
            <div>
              <button className="btn btn-lg btn-info btn-block m-2" type="submit" onClick={this.showAllClasses}>Pokaż
                wszystkie
              </button>
              <button className="btn btn-lg btn-info btn-block m-2" type="submit" onClick={this.showMyClasses}>Pokaż
                moje
              </button>
            </div>
            <div style={styles.wrap}>
              <div style={styles.left}>
                <DayPilotNavigator
                  selectMode={"week"}
                  showMonths={2}
                  skipMonths={2}
                  startDate={"2022-12-07"}
                  selectionDay={"2022-12-07"}
                  onTimeRangeSelected={args => {
                    this.calendar.update({
                      startDate: args.day
                    });
                  }}
                />
              </div>
              <div style={styles.main}>
                <DayPilotCalendar
                  {...this.state}
                  ref={this.calendarRef}
                />
              </div>
            </div>
          </div>
        );
      }
      else{
        return (
          <div>
            <div>
              <a href="create_class.html" className="btn btn-lg btn-info btn-block m-2">Dodaj zajęcia</a>
            </div>
            <div style={styles.wrap}>
              <div style={styles.left}>
                <DayPilotNavigator
                  selectMode={"week"}
                  showMonths={2}
                  skipMonths={2}
                  startDate={"2022-12-07"}
                  selectionDay={"2022-12-07"}
                  onTimeRangeSelected={ args => {
                    this.calendar.update({
                      startDate: args.day
                    });
                  }}
                />
              </div>
              <div style={styles.main}>
                <DayPilotCalendar
                  {...this.state}
                  ref={this.calendarRef}
                />
              </div>
            </div>
          </div>
        );
      }
    }
  }
}
export default Calendar;

const domContainer = document.getElementById('schedule');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(Calendar);
root.render(element);
