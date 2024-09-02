import * as React from 'react';
import ReactDOM from "react-dom/client";

class CreateClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classDate: '', startTime: '', endTime: '', danceLevel: '', price: '', idDance: '', idInstructor: '', instructorDisplay: [], instructors: [], displayInstructor: '',
      danceDisplay: [], dances: [], displayDance: '', typeOfDance: '', typeOfClass: ''
    };

    this.handleClassDateChange = this.handleClassDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleDanceLevelChange = this.handleDanceLevelChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDanceChange = this.handleDanceChange.bind(this);
    this.handleInstructorChange = this.handleInstructorChange.bind(this);
    this.createClass = this.createClass.bind(this);
  }

  handleClassDateChange(event) {
    this.setState({classDate: event.target.value});
  }

  handleStartTimeChange(event) {
    this.setState({startTime: event.target.value});
  }

  handleEndTimeChange(event) {
    this.setState({endTime: event.target.value});
  }

  handleDanceLevelChange(event) {
    this.setState({danceLevel: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleDanceChange(event) {
    this.setState({displayDance: event.target.value});
    this.setState({idDance: this.state.dances[event.target.selectedIndex-1].idDance});
  }

  handleInstructorChange(event)
  {
    this.setState({displayInstructor: event.target.value});
    this.setState({idInstructor: this.state.instructors[event.target.selectedIndex-1].idInstructor});
  }

  fetchDances(uri) {
    var usernameStr = this.getCookie("username");
    var sessionKeyStr = this.getCookie("sessionKey");
    const data = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr
    };

    const danceRequest = new Request(uri);
    fetch(danceRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log("Dances response received");
          var danDisplay = [];
          for (var i = 0; i < data.dances.length; i++){
            danDisplay.push(data.dances[i].typeOfDance + ", " + data.dances[i].typeOfClass)
          }
          console.log(data.dances)
          console.log(danDisplay)
          this.setState({danceDisplay: danDisplay});
          this.setState({dances: data.dances});
        })
      }
      else
      {
        console.log("Error!");
      }
    })
  }

  fetchInstructors(uri) {
    var usernameStr = this.getCookie("username");
    var sessionKeyStr = this.getCookie("sessionKey");
    const data = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr
    };

    const instructorRequest = new Request(uri);
    fetch(instructorRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          console.log("Instructors response received");
          var instrDisplay = [];
          for (var i = 0; i < data.instructors.length; i++){
            instrDisplay.push(data.instructors[i].name + " " + data.instructors[i].surname)
          }
          console.log(data.instructors)
          console.log(instrDisplay)
          this.setState({instructorDisplay: instrDisplay});
          this.setState({instructors: data.instructors});
        })
      }
      else
      {
        console.log("Error!");
      }
    })
  }

  componentDidMount() {
    this.fetchInstructors("http://localhost:8888/instructors");
    this.fetchDances("http://localhost:8888/dances");
  }


  render() {
    return (
      <div>
        <label htmlFor="classDate" className="sr-only">Data</label>
        <input value={this.state.classDate} onChange={this.handleClassDateChange} type="text" id="classDate"
               className="form-control" placeholder="rrrr-mm-dd"></input>
        <label htmlFor="startTime" className="sr-only">Godzina rozpoczęcia</label>
        <input value={this.state.startTime} onChange={this.handleStartTimeChange} type="time" id="startTime"
               className="form-control" placeholder="hh:mm:ss"/>
        <label htmlFor="endTime" className="sr-only">Godzina zakończenia</label>
        <input value={this.state.endTime} onChange={this.handleEndTimeChange} type="time" id="endTime" className="form-control"
               placeholder="hh:mm:ss"/>
        <label htmlFor="danceLevel" className="sr-only">Poziom zajęć</label>
        <input value={this.state.danceLevel} onChange={this.handleDanceLevelChange} type="text" id="danceLevel"
               className="form-control" placeholder="Poziom zajęć np. p3"/>
        <label htmlFor="price" className="sr-only">Cena</label>
        <input value={this.state.price} onChange={this.handlePriceChange} type="number" id="price"
               className="form-control" placeholder="Cena"/>
        <label htmlFor="dance" className="sr-only">Rodzaj zajęć</label>
        <select value={this.state.displayDance} onChange={this.handleDanceChange} id="dance" className="form-control">
          <option disabled={true} value="">
            -- Wybierz rodzaj zajęć --
          </option>
          {this.state.danceDisplay.map((optn, i) => (
            <option key={i}>{optn}</option>
          ))}
        </select>
        <label htmlFor="instructor" className="sr-only">Instruktor</label>
        <select value={this.state.displayInstructor} onChange={this.handleInstructorChange} id="instructor" className="form-control">
          <option disabled={true} value="">
            -- Wybierz instruktora --
          </option>
          {this.state.instructorDisplay.map((optn, i) => (
            <option key={i}>{optn}</option>
          ))}
        </select>
        <div className="container py-5">
          <button className="btn btn-lg btn-warning btn-block" type="submit" onClick={this.createClass}>Dodaj zajęcia
          </button>
        </div>
      </div>
    )
      ;
  }

  validateField() {

    var isValid = true;
    if (this.state.classDate.length === 0 || !this.state.classDate.match(/^\d{4}-\d{2}-\d{2}$/i)) {
      document.getElementById("classDate").style.backgroundColor = 'tomato'
      isValid = false;
    }
    else {
      document.getElementById("classDate").style.backgroundColor = 'white'
    }
    if (this.state.startTime.length === 0 || !this.state.startTime.match(/^(?:[01]\d|2[0-3]):[0-5]\d$/i)) {
      document.getElementById("startTime").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("startTime").style.backgroundColor = 'white';
    }
    if (this.state.endTime.length === 0 || !this.state.endTime.match(/^(?:[01]\d|2[0-3]):[0-5]\d$/i)) {
      document.getElementById("endTime").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("endTime").style.backgroundColor = 'white';
    }
    if (this.state.danceLevel.length === 0 || !this.state.danceLevel.match(/[ps][0-3]/i)) {
      document.getElementById("danceLevel").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("danceLevel").style.backgroundColor = 'white';
    }
    if (this.state.price.length === 0 || !this.state.price.match(/^^\d+(?:\.\d{2})?$/i)) {
      document.getElementById("price").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("price").style.backgroundColor = 'white';
    }
    return isValid;
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

  createClass(event) {
    event.preventDefault();
    if (!this.validateField()) {
      return;
    }
    var usernameStr = this.getCookie("username");
    var sessionKeyStr = this.getCookie("sessionKey");
    console.log(usernameStr, sessionKeyStr);
    if (usernameStr === "" || sessionKeyStr === "")
    {
      return;
    }
    const data = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr,
      "classDate": this.state.classDate,
      "startTime": this.state.startTime,
      "endTime": this.state.endTime,
      "danceLevel": this.state.danceLevel,
      "price": this.state.price,
      "idDance": this.state.idDance,
      "idInstructor": this.state.idInstructor
    };
    var body = JSON.stringify(data);
    console.log(body);
    const createClassRequest = new Request("http://localhost:8888/adminclass");
    fetch(createClassRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Server response received")
      if (response.status === 200) {
        console.log("Create successful!")
        window.location.replace("http://localhost:8081/schedule.html");
      } else {
        console.log("Create failed!")
        window.alert("Podana nazwa użytkownika już istnieje.");
      }
    });
  }
}

const domContainer = document.querySelector('#createClassComponent');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(CreateClass);
root.render(element);

