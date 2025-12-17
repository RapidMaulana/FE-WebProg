import instance from "./api_instance";

export const getAllRecipes = async() =>{
    try {
        const response = await instance.get('/recipes');
        return response;
    } catch (err) {
        
    }
};

export const getRecipesByID = async ({ id }) =>{
    try {
        const response = await instance.get(`/recipes/${id}`);
        return response.data.data;
    } catch (err) {
        throw console.log(err)
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