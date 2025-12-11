import instance from "./api_instance";

export const getAllRecipes = async() =>{
    try {
        const response = await instance.get('/recipes');
        return response;
    } catch (err) {
        
    }
}

export const getRecipesByID = async ({ id }) =>{
    try {
        const response = await instance.get(`/recipes/${id}`);
        return response.data.data;
    } catch (err) {
        throw console.log(err)
    }
}