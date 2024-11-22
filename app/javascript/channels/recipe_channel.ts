
import { store } from "../store/store"
import { recipeUpdated } from "../store/recipesSlice"
import consumer from "./consumer"

consumer.subscriptions.create("RecipeChannel", {
  connected() {
    console.log("Connected to RecipeChannel")
  },

  disconnected() {
    console.log("Disconnected from RecipeChannel")
  },

  received(data) {
    if (data.type === 'RECIPE_UPDATED') {
      console.log("Received recipe update:", data.recipe)
      store.dispatch(recipeUpdated(data.recipe))
    }
  }
})
