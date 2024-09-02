import * as React from 'react';
import ReactDOM from "react-dom/client";

class UpdateClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idClass: '', classDate: '', startTime: '', endTime: '', danceLevel: '', price: '', idDance: '', idInstructor: '', instructorDisplay: [], instructors: [], displayInstructor: '',
      danceDisplay: [], dances: [], displayDance: '', typeOfDance: '', typeOfClass: ''
    };

    this.handleIdClassChange = this.handleIdClassChange.bind(this);
    this.handleClassDateChange = this.handleClassDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleDanceLevelChange = this.handleDanceLevelChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDanceChange = this.handleDanceChange.bind(this);
    this.handleInstructorChange = this.handleInstructorChange.bind(this);
    this.updateClass = this.updateClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
  }

  handleIdClassChange(event) {
    this.setState({idClass: event.target.value});
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


  fetchAllResources(idClass) {
    var usernameStr = this.getCookie("username");
    var sessionKeyStr = this.getCookie("sessionKey");

    const danceRequestData = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr
    };
    const danceRequest = new Request("http://localhost:8888/dances");

    const instructorRequestData = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr
    };
    const instructorRequest = new Request("http://localhost:8888/instructors");

    const danceClassRequestData = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr,
      "idClass": idClass
    };
    const danceClassRequest = new Request("http://localhost:8888/schedule");

    const fetchData = async () => {
      try {
        const responsesJSON = await Promise.all([
          fetch(danceRequest, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(danceRequestData)
          }),
          fetch(instructorRequest, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(instructorRequestData)
          }),
          fetch(danceClassRequest, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(danceClassRequestData)
          })
        ]);
        const [danceData, instructorData, danceClassData] = await Promise.all(responsesJSON.map(r => r.json()));

        var danDisplay = [];
        for (var i = 0; i < danceData.dances.length; i++) {
          danDisplay.push(danceData.dances[i].typeOfDance + ", " + danceData.dances[i].typeOfClass)
        }
        console.log(danceData.dances)
        console.log(danDisplay)
        this.setState({danceDisplay: danDisplay});
        this.setState({dances: danceData.dances});

        var instrDisplay = [];
        for (var i = 0; i < instructorData.instructors.length; i++) {
          instrDisplay.push(instructorData.instructors[i].name + " " + instructorData.instructors[i].surname)
        }
        this.setState({instructorDisplay: instrDisplay});
        this.setState({instructors: instructorData.instructors});

        this.setState({idClass: danceClassData.classes[0].id_class});
        this.setState({classDate: danceClassData.classes[0].class_date});
        this.setState({startTime: danceClassData.classes[0].start_time});
        this.setState({endTime: danceClassData.classes[0].end_time});
        this.setState({danceLevel: danceClassData.classes[0].dance_level});
        this.setState({price: danceClassData.classes[0].price});
        this.setState({idDance: danceClassData.classes[0].id_dance});
        this.setState({idInstructor: danceClassData.classes[0].id_instructor});

        this.setState({displayDance: danDisplay[danceClassData.classes[0].id_dance-1]});
        this.setState({displayInstructor: instrDisplay[danceClassData.classes[0].id_instructor-1]});

      } catch (err) {
        console.log("Error!");
        throw err;
      }
    }
    fetchData().then(() => {
      console.log("all data fetched");
    });
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    this.fetchAllResources(params.get("id"));
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
          <button className="btn btn-lg btn-warning btn-block me-5" type="submit" onClick={this.updateClass}>Zapisz zmiany
          </button>
          <button className="btn btn-lg btn-danger btn-block" type="submit" onClick={this.deleteClass}>Usuń zajęcia
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
    // if (this.state.price.length === 0 || !this.state.price.match(/^^\d+(?:\.\d{2})?$/i)) {
    //   document.getElementById("price").style.backgroundColor = 'tomato';
    //   isValid = false;
    // }
    // else{
    //   document.getElementById("price").style.backgroundColor = 'white';
    // }
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

  updateClass(event) {
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
      "idClass": this.state.idClass,
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
    const updateClassRequest = new Request("http://localhost:8888/adminclass");
    fetch(updateClassRequest, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Server response received")
      if (response.status === 200) {
        console.log("Update successful!")
        window.location.replace("http://localhost:8081/schedule.html");
      } else {
        console.log("Update failed!")
        window.alert("Podana nazwa użytkownika już istnieje.");
      }
    });
  }
  deleteClass(event) {
    event.preventDefault();
    // if (!this.validateField()) {
    //   return;
    // }
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
      "idClass": this.state.idClass
    };
    var body = JSON.stringify(data);
    console.log(body);
    const deleteClassRequest = new Request("http://localhost:8888/adminclass");
    fetch(deleteClassRequest, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Server response received")
      if (response.status === 200) {
        console.log("Delete successful!")
        window.location.replace("http://localhost:8081/schedule.html");
      } else {
        console.log("Delete failed!")
        window.alert("Podana nazwa użytkownika już istnieje.");
      }
    });
  }

}

const domContainer = document.querySelector('#updateClassComponent');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(UpdateClass);
root.render(element);

