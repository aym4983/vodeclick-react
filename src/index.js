$ = jQuery = require("jquery");
//var App = console.log("Browserify is fuckin working");

// import the libraries we need
var React = require("react");
var ReactDOM = require("react-dom");
var ReactCreateClass = require("create-react-class");

// reference homePage component
var Home = require('./js/components/home/HomePage.jsx');
var About = require('./js/components/about/AboutPage.jsx');

var App = ReactCreateClass({
  render : function(){
    var Child;
    switch(this.props.route){
      case "about": Child = About;
      break;
      default: Child = Home;
    }

    return (
      <div>
        <Child />
      </div>
    );
  }
});

function _routeMe () {
  // get the part of the URL after #
  var route = window.location.hash.substr(1);
  // rendering components
  ReactDOM.render(<App route={route} />, document.getElementById('app'));
}

window.addEventListener("hashchange", _routeMe);
_routeMe();

module.exports = App;
