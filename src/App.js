import React, { Component } from 'react';
import Datatable from './Datatable';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-md-offset-4">
             <h3>Hyfn8 React Front End Challenge</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
           <Datatable />
          </div>
        </div>
       
      </div>
    );
  }
}


export default App;
