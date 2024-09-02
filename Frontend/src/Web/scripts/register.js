import * as React from 'react';
import ReactDOM from "react-dom/client";

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '', email: '', name: '', surname: '', phone: '', password: '', password2: '', addRecord: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordChange2 = this.handlePasswordChange2.bind(this);
    this.register = this.register.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSurnameChange(event) {
    this.setState({surname: event.target.value});
  }

  handlePhoneChange(event) {
    this.setState({phone: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handlePasswordChange2(event) {
    this.setState({password2: event.target.value});
  }

  render() {
    return (
      <div>
        <label htmlFor="username" className="sr-only">Nazwa użytkownika</label>
        <input value={this.state.username} onChange={this.handleUsernameChange} type="text" id="username"
               className="form-control" placeholder="Nazwa użytkownika"></input>
        <label htmlFor="email" className="sr-only">Adres e-mail</label>
        <input value={this.state.email} onChange={this.handleEmailChange} type="email" id="email"
               className="form-control" placeholder="Adres e-mail"/>
        <label htmlFor="name" className="sr-only">Imię</label>
        <input value={this.state.name} onChange={this.handleNameChange} type="text" id="name" className="form-control"
               placeholder="Podaj imię"/>
        <label htmlFor="surname" className="sr-only">Nazwisko</label>
        <input value={this.state.surname} onChange={this.handleSurnameChange} type="text" id="surname"
               className="form-control" placeholder="Podaj nazwisko"/>
        <label htmlFor="phone" className="sr-only">Nr telefonu</label>
        <input value={this.state.phone} onChange={this.handlePhoneChange} type="int" id="phone"
               className="form-control" placeholder="Telefon:(xxxxxxxxx)"/>
        <label htmlFor="password" className="sr-only">Hasło</label>
        <input value={this.state.password} onChange={this.handlePasswordChange} type="password" id="password"
               className="form-control" placeholder="Hasło (min 6 znaków)"></input>
        <label htmlFor="password2" className="sr-only">Powtórz hasło</label>
        <input value={this.state.password2} onChange={this.handlePasswordChange2} type="password" id="password2"
               className="form-control" placeholder="Powtórz hasło"/>
        <div className="container py-5">
          <button className="btn btn-lg btn-warning btn-block" type="submit" onClick={this.register}>Zarejestruj się
          </button>
        </div>
      </div>
    )
      ;
  }

  validateField() {
    var isValid = true;
    if (this.state.username.length === 0 || !this.state.username.match(/^[a-zA-Z0-9_\-.]+$/i)) {
      document.getElementById("username").style.backgroundColor = 'tomato'
      isValid = false;
    }
    else {
      document.getElementById("surname").style.backgroundColor = 'white'
    }
    if (this.state.email.length === 0 || !this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      document.getElementById("email").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("email").style.backgroundColor = 'white';
    }
    if (this.state.name.length === 0 || !this.state.name.match(/^[A-Z]{1}[a-z]{2,30}$/i)) {
      document.getElementById("name").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("name").style.backgroundColor = 'white';
    }
    if (this.state.surname.length === 0 || !this.state.surname.match(/^[A-Z]{1}[a-z]{2,30}$/i)) {
      document.getElementById("surname").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("surname").style.backgroundColor = 'white';
    }
    if (this.state.phone.length === 0 || !this.state.phone.match(/^[1-9]{1}[0-9]{8}$/i)) {
      document.getElementById("phone").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("phone").style.backgroundColor = 'white';
    }
    if (this.state.password.length === 0 || !this.state.password.match(/^.{6,}$/i)) {
      var checkPassword = this.state.password
      document.getElementById("password").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("password").style.backgroundColor = 'white';
    }
    if (this.state.password2.length === 0 || this.state.password2 !== this.state.password) {
      document.getElementById("password2").style.backgroundColor = 'tomato';
      isValid = false;
    }
    else{
      document.getElementById("password2").style.backgroundColor = 'white';
    }
    return isValid;
  }

  register(event) {
    event.preventDefault();
    if (!this.validateField()) {
      return;
    }
    const data = {
      "username": this.state.username,
      "email": this.state.email,
      "name": this.state.name,
      "surname": this.state.surname,
      "phone": this.state.phone,
      "password": this.state.password
    };
    const registerRequest = new Request("http://localhost:8888/register");
    fetch(registerRequest, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log("Server response received")
      if (response.status === 200) {
        console.log("Registration successful!")
        window.location.replace("http://localhost:8081/index.html");
      } else {
        console.log("Registration failed!")
        window.alert("Podana nazwa użytkownika już istnieje.");
      }
    });
  }
}

const domContainer = document.querySelector('#registerComponent');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(Register);
root.render(element);

