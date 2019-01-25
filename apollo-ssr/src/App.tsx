import React from 'react';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import './App.css';
import Book from './Book';
import Home from './Home';

const App = () => (
  <div>
    <Link to="/">
      Home
    </Link>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/books/:bookId" component={Book} />
    </Switch>
  </div>
);

export default App;
