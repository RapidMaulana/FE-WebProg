import instance from "./api_instance";

export const getAllRecipes = async () => {
  try {
    const response = await instance.get("/recipes");
    return response;
  } catch (err) {}
};

export const getRecipesByID = async ({ id }) => {
  try {
    const response = await instance.get(`/recipes/${id}`);
    return response.data.data;
  } catch (err) {
    throw console.log(err);
  }
};

export const filterRecipesByCategory = async ({ category }) => {
  try {
    const response = await instance.get(`/recipes/category/${category}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const filterRecipesByDifficulty = async ({ difficulty }) => {
  try {
    const response = await instance.get(`/recipes/difficulty/${difficulty}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const searchRecipes = async ({ query }) => {
  try {
    const response = await instance.get("/recipes/search", {
      params: { q: query },
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createRecipe = async ({
  title,
  description,
  prep_time,
  cook_time,
  servings,
  difficulty,
  category,
  image,
  ingredients,
  instructions,
}) => {
  try {
    // Validasi di client
    if (!difficulty || difficulty.trim() === "") {
      throw new Error("Tingkat kesulitan harus dipilih");
    }
    if (!category || category.trim() === "") {
      throw new Error("Kategori harus dipilih");
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      prep_time: parseInt(prep_time) || 0,
      cook_time: parseInt(cook_time) || 0,
      servings: parseInt(servings) || 1,
      difficulty: difficulty.trim(),
      category: category.trim(),
      image: image?.trim() || null,
      ingredients: ingredients.map((ing) => ({
        name: ing.name.trim(),
        amount: parseFloat(ing.amount) || 0,
        unit: ing.unit.trim(),
        leftover: Boolean(ing.leftover),
      })),
      instructions: instructions.map((step, index) => step.trim()),
    };

    console.log("Sending payload:", payload); // Debug log

    const response = await instance.post("/recipes", payload);
    return response.data.data;
  } catch (err) {
    console.error(
      "Create recipe error:",
      err.response?.data?.errors || err.message
    );
    throw err;
  }
};

export const getAllWishlists = async () => {
  try {
    const response = await instance.get("/wishlists");
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getWishlistRecipes = async () => {
  try {
    const response = await instance.get("/wishlists/recipes");
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const checkWishlist = async ({ recipeId }) => {
  try {
    const response = await instance.get(`/wishlists/check/${recipeId}`);
    return response.data.data.in_wishlist;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addToWishlist = async ({ recipe_id }) => {
  try {
    const response = await instance.post("/wishlists", {
      recipe_id,
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const removeFromWishlist = async ({ recipeId }) => {
  try {
    const response = await instance.delete(`/wishlists/${recipeId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
