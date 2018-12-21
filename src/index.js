$ = jQuery = require("jquery");
//var App = console.log("Browserify is fuckin working");

// import the libraries we need
var React = require("react");
var ReactDOM = require("react-dom");

// reference homePage component
var Home = require('./js/components/home/HomePage.jsx');

// rendering components
ReactDOM.render(<Home />, document.getElementById('app'));

module.exports = App;
