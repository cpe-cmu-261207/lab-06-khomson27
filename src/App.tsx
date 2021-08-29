import React from 'react';
import Navbar from './components/Navbar';
import Aboutme from './components/Aboutme'
import Current from './components/Current'
import Select from './components/history/select'
import Result from './components/history/result'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
        <Route path = '/' exact>
        <Current/>
        </Route>

        <Route path = '/current'>
        <Current/>
        </Route>

        <Route path = '/history/select'>
        <Select/>
        </Route>

        <Route path = '/history/result'>
        <Result/>
        </Route>

        <Route path = '/aboutme'>
        <Aboutme/>
        </Route>

        </Switch>
      

    </Router>
  );
}

export default App;

