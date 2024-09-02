import * as React from 'react';
import ReactDOM from "react-dom/client";

class Logout extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  render() {
    if (this.getCookie("sessionKey") === "")
    {
      return (
        <div className="row">
          <div className="col">
            <a className="btn btn-dark" href="index.html">Dance Studio</a>
          </div>
          <div className="col d-flex justify-content-end">
            <a className="btn btn-dark float-right" href="../log.html">Logowanie/Rejestracja</a>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div className="row">
          <div className="col">
            <a className="btn btn-dark" href="index.html">Dance Studio</a>
          </div>
          <div className="col d-flex justify-content-end">
            <span className="p-2">Witaj {this.getCookie("username")}!  </span>
            <button className="btn btn-lg btn-dark btn-block" type="submit" onClick={this.logout}>Wyloguj</button>
          </div>
        </div>
      );
    }
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

  logout(event) {
    event.preventDefault();

    var usernameStr = this.getCookie("username");
    var sessionKeyStr = this.getCookie("sessionKey");
    if (usernameStr === "" || sessionKeyStr === "")
    {
      return;
    }

    const data = {
      "username": usernameStr,
      "sessionKey": sessionKeyStr
    };
    const logoutRequest = new Request("http://localhost:8888/logout");
    fetch(logoutRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Logout server response received")
      if (response.status === 200) {
        console.log("Logout successful!");
        this.setCookie("sessionKey", "", 1);
        this.setCookie("username", "", 1);
        this.setCookie("idRole", "", 1);
        window.location.replace("http://localhost:8081/log.html");
      } else {
        this.setCookie("sessionKey", "", 1);
        this.setCookie("username", "", 1);
        this.setCookie("idRole", "", 1);
        console.log("Logout failed!");
        window.alert("Logout failed!");
      }
    });
  }
}

const domContainer = document.querySelector('#logoutComponent');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(Logout);
root.render(element);

