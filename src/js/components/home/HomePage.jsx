"use strict"

var React = require("react");
var ReactDOM = require("react-dom");
var createClass = require("create-react-class");

var Home = createClass({
  render : function(){
    return (
      <div className = "jumbotron">
        <h1>My Home Page</h1>
        <h2>We'll ajust as we build our app!</h2>
      </div>
    );
  }
});

module.exports = Home;
