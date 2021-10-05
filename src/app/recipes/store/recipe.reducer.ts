import {Recipe} from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import {act} from "@ngrx/effects";

export interface State {
  recipe: Recipe[];
}

const initialState: State = {
  recipe: []
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipe: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipe: [...state.recipe, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updateRecipe = {
        ...state.recipe [action.payload.index],
        ...action.payload.newRecipe
      };

      const updateRecipes = [...state.recipe];

      updateRecipes[action.payload.index] = updateRecipe;

      return {
        ...state,
        recipes: updateRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipe.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
