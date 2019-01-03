"use strict";

// On créée un mock d'api
var recipes = require("./RecipeData").recipes;
var _ = require("lodash");

var _generateId = function(recipe){
  return recipe.category.toLowerCase() + "-" + recipe.recipeName.toLowerCase();
};

var _cloneMe = function(item){
  return JSON.parse(JSON.stringify(item));
};

var RecipeApi = {
  getAllRecipes : function(){
    return _cloneMe(recipes);
  },

  getRecipeById: function(id){
    var recipe = _.find(recipes, {id: id});
    return _cloneMe(recipe);
  },

  saveRecipe: function(recipe){
    console.log("AJAX call save recipe to  the _");

    if (recipe.id){
      var existingRecipeIndex = _.indexOf(recipes, _.find(recipes, {id: recipe.id}));
      recipes.splice(existingRecipeIndex, 1, recipe);
    }
    else {
      recipe.id = _generateId(recipe);
      recipes.push(_cloneMe(recipe));
    }
  },

  deleteRecipe : function(id){
    console.log("AJAX call to delete a recipe from the _");

    _.remove(recipes, {id: id});
  }
};

module.exports = RecipeApi;
