"use strict";

var React = require("react");
var CreateClass = require("create-react-class");
var RecipeApi = require("../../../api/RecipeApi");

var Recipes = CreateClass({

  getInitialState : function(){
    return {
      recipes: []
    };
  },

  componentWillMount : function(){
    this.setState({
      recipes : RecipeApi.getAllRecipes()
    });
  },

  render: function(){

    var createRecipeRow = function(recipe){
      return (
        <tr key={recipe.id}>
          <td><a href={"/#recipe/" + recipe.id}>{recipe.id}</a></td>
          <td><a href={"/#recipe/" + recipe.id}>{recipe.recipeName}</a></td>
        </tr>
      )
    };

    return (
      <div>
        <h1>Our recipe</h1>
        <table className="table table-hover">
          <thead>
            <th>ID</th>
            <th>Recipe name</th>
          </thead>
          <tbody>
            {this.state.recipes.map(createRecipeRow, this)}
          </tbody>
        </table>
      </div>
    )

  }
});

module.exports = Recipes;
