import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import RecipeBox from './components/RecipeBox';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <RecipeBox />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("app"));
