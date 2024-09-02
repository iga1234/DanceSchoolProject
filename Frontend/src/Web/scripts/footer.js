import * as React from "react";
import ReactDOM from "react-dom/client";

class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span>W razie pytań zapraszamy do kontaktu:<br></br>
            e-mail: dance-studio@dance-studio.com<br></br>
            Tel.: (+48) 123 456 789<br></br>
            Instagram: @dance-studio<br></br>
            Facebook: xxxxxxxxxxxxxxxx</span>
    );
  }
}

export default Footer;
const domContainer = document.querySelector('#footer');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(Footer);
root.render(element);


