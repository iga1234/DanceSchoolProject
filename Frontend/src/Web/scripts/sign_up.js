import * as React from 'react';
import ReactDOM from "react-dom/client";

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      idClass: '', classDate: '', startTime: '', endTime: '', danceLevel: '', price: '', idDance: '', idInstructor: '', instructorDisplay: [], instructors: [], displayInstructor: '',
      danceDisplay: [], dances: [], displayDance: '', typeOfDance: '', typeOfClass: '', attendance: false
    };

    this.signUp = this.signUp.bind(this);
    this.signOff = this.signOff.bind(this);

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

    const attendanceRequestData = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr,
      "idClass": idClass
    };
    const attendanceRequest = new Request("http://localhost:8888/attendance");

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
          }),
          fetch(attendanceRequest, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(attendanceRequestData)
          })
        ]);
        const [danceData, instructorData, danceClassData, attendanceData] = await Promise.all(responsesJSON.map(r => r.json()));

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
        console.log(attendanceData.attendance)
        this.setState({attendance: attendanceData.attendance});


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
    if(this.state.attendance === false) {
      return (
        <div>
          <h1 className="h3 mb-3 font-weight-normal text-bg-dark">Zapisy na zajęcia</h1>
          <label htmlFor="classDate" className="sr-only">Data</label>
          <input value={this.state.classDate} type="text" id="classDate" className="form-control"></input>
          <label htmlFor="startTime" className="sr-only">Godzina rozpoczęcia</label>
          <input value={this.state.startTime} type="time" id="startTime" className="form-control"/>
          <label htmlFor="endTime" className="sr-only">Godzina zakończenia</label>
          <input value={this.state.endTime} type="time" id="endTime" className="form-control"/>
          <label htmlFor="danceLevel" className="sr-only">Poziom zajęć</label>
          <input value={this.state.danceLevel} type="text" className="form-control"/>
          <label htmlFor="price" className="sr-only">Cena</label>
          <input value={this.state.price} type="number" id="price"
                 className="form-control"/>
          <label htmlFor="dance" className="sr-only">Rodzaj zajęć</label>
          <input value={this.state.displayDance} id="dance" className="form-control"/>
          <label htmlFor="instructor" className="sr-only">Instruktor</label>
          <input value={this.state.displayInstructor} id="instructor" className="form-control"/>
          <div className="container py-5">
            <button className="btn btn-lg btn-warning btn-block me-5" type="submit" onClick={this.signUp}>Zapisz się!
            </button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <h1 className="h3 mb-3 font-weight-normal text-bg-dark">Rezygnacja z zajęć</h1>
          <label htmlFor="classDate" className="sr-only">Data</label>
          <input value={this.state.classDate} type="text" id="classDate" className="form-control"></input>
          <label htmlFor="startTime" className="sr-only">Godzina rozpoczęcia</label>
          <input value={this.state.startTime} type="time" id="startTime" className="form-control"/>
          <label htmlFor="endTime" className="sr-only">Godzina zakończenia</label>
          <input value={this.state.endTime} type="time" id="endTime" className="form-control"/>
          <label htmlFor="danceLevel" className="sr-only">Poziom zajęć</label>
          <input value={this.state.danceLevel} type="text" className="form-control"/>
          <label htmlFor="price" className="sr-only">Cena</label>
          <input value={this.state.price} type="number" id="price"
                 className="form-control"/>
          <label htmlFor="dance" className="sr-only">Rodzaj zajęć</label>
          <input value={this.state.displayDance} id="dance" className="form-control"/>
          <label htmlFor="instructor" className="sr-only">Instruktor</label>
          <input value={this.state.displayInstructor} id="instructor" className="form-control"/>
          <div className="container py-5">
            <button className="btn btn-lg btn-warning btn-block me-5" type="submit" onClick={this.signOff}>Wypisz się :(
            </button>
          </div>
        </div>
      );
    }
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

  signUp(event) {
    event.preventDefault();
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
    };
    var body = JSON.stringify(data);
    console.log(body);
    const updateClassRequest = new Request("http://localhost:8888/signup");
    fetch(updateClassRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Server response received")
      if (response.status === 200) {
        console.log("Sign up successful!")
        window.location.replace("http://localhost:8081/schedule.html");
      } else {
        console.log("Sign up failed!")
        window.alert("Jesteś już zapisany na te zajęcia.");
      }
    });
  }
  signOff(event) {
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
    const deleteClassRequest = new Request("http://localhost:8888/signoff");
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
    console.log("Wróć do nas!")
  }

}

const domContainer = document.querySelector('#signUpComponent');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(SignUp);
root.render(element);
