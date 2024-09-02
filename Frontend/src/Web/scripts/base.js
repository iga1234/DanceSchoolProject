import * as React from "react";
import ReactDOM from "react-dom/client";

class MyBase extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="logoutComponent"></div>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button text-bg-warning" type="button" data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                <div className="d-flex justify-content-end"> Menu </div>
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                 data-bs-parent="#accordionFlushExample">
              <div className="according-body text-bg-warning">
                <ul className="list-group">
                  <li><a className="list-group-item text-bg-dark" href="../index.html">Home</a></li>
                  <li><a className="list-group-item text-bg-dark" href="../about.html">O nas</a></li>
                  <li><a className="list-group-item text-bg-dark" href="../courses.html">Kursy</a></li>
                  <li><a className="list-group-item text-bg-dark" href="../instructors.html">Instruktorzy</a></li>
                  <li><a className="list-group-item text-bg-dark" href="../schedule.html">Grafik</a></li>
                  <li><a className="list-group-item text-bg-dark" href="../price_list.html">Cennik</a></li>
                  <li><a className="list-group-item text-bg-dark" href="../shop.html">Sklep</a></li>
                  <li><a className="list-group-item text-bg-dark" href="../gallery.html">Galeria</a></li>
                  <li><a className="list-group-item text-bg-warning" href="../contact.html">Kontakt</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MyBase;
const domContainer = document.querySelector('#base');
const root = ReactDOM.createRoot(domContainer);
const element = React.createElement(MyBase);
root.render(element);


