import React, { Component } from 'react';
import * as jsonStream from 'jsonstream2';
import { Readable } from 'stream';

import Map from './Components/Map';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stops: [] };
  }

  async componentWillMount() {
    const stops = [];
    const that = this;

    try {
      const fetchStream = (await fetch('http://localhost:4000/stops/NYC')).body.getReader();
      const stopsReader = new Readable({
        async read() {
          const { done, value } = await fetchStream.read();

          return done ? this.push(null) : this.push(value);
        },
      });

      stopsReader
        .pipe(jsonStream.parse())
        .on('data', stop => stops.push(stop))
        .on('end', () => that.setState({ stops }));
    } catch (error) {
      console.error('Sorry. Problem with our servers.');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NYC Stops</h1>
        </header>
        <Map stops={this.state.stops} />
      </div>
    );
  }
}

export default App;
