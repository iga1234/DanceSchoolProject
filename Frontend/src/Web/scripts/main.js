import * as React from 'react';
import ReactDOM from "react-dom/client";

const HealthStatus = {
  Healthy: 'Healthy',
  Unhealthy: 'Unhealthy',
  Undefined: 'Undefined'
};

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.healthCheck = this.healthCheck.bind(this);
    this.state = { healthy: HealthStatus.Undefined };
  }

  render() {
    return (
      <button type="button" className="btn btn-warning position-absolute end-0" onClick={this.healthCheck}> Health Check</button>
    );
  }

  healthCheck() {
    const healthRequest = new Request("http://localhost:8888/health");
    fetch(healthRequest, {
        method: "GET"
        }).then((response) => {
        console.log("Server health check response received")
        if (response.status === 200) {
          console.log("Server is healthy!")
          this.setState({healthy: HealthStatus.Healthy});
        }
        else
        {
          console.log("Server is unhealthy!")
          this.setState({healthy: HealthStatus.Unhealthy});
        }
      });
  }
}

const domContainer = document.querySelector('#healthcheck_button_container');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(Main);
root.render(element);

