import * as React from 'react';
import ReactDOM from "react-dom/client";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div>
        <label htmlFor="username" className="sr-only">Nazwa użytkownika</label>
        <input value = {this.state.username} onChange={this.handleUsernameChange} type="text" id="username" className="form-control" placeholder="Nazwa użytkownika" required></input>
        <label htmlFor="password" className="sr-only">Hasło</label>
        <input value = {this.state.password} onChange={this.handlePasswordChange} type="password" id="password" className="form-control" placeholder="Hasło" required></input>
        <div className="container py-3">
          <a href="register.html" className="btn btn-link">Zarejestruj się</a>
          <button className="btn btn-lg btn-warning btn-block" type="submit" onClick={this.login}>Zaloguj</button>
        </div>
      </div>
    );
  }

  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  login(event) {
    event.preventDefault();
    const data = {
      "username": this.state.username,
      "password": this.state.password
    };
    const loginRequest = new Request("http://localhost:8888/login");
    fetch(loginRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Server response received")
      if (response.status === 200) {
        console.log("Login successful!")
        response.json().then((data) => {
          console.log('Success:', data);
          console.log("sessionkey: ", data.sessionKey);
          this.setCookie("sessionKey", data.sessionKey, 1);
          this.setCookie("username", this.state.username, 1);
          // idRole jest tylko client-side, dla widokow, nie zwieksza uprawnien po stronie backendu
          this.setCookie("idRole", data.idRole, 1);
          window.location.replace("http://localhost:8081/index.html");
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      } else {
        console.log("Login failed!")
        window.alert("Zły login lub hasło! Spróbuj ponownie :)");
      }
    });
  }
}

const domContainer = document.querySelector('#loginComponent');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(Login);
root.render(element);

