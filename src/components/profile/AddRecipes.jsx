import { useState, useEffect } from "react";
import { useForm } from "../../context/FormContext";
import { createRecipe } from "../../api/services";

export default function AddRecipe() {
    const { formData: recipeFormData, updateField: updateRecipeField, setFormData: setRecipeFormData } = useForm("addRecipe");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    // Local state untuk ingredients dan instructions
    const [ingredients, setIngredients] = useState(recipeFormData?.ingredients || []);
    const [instructions, setInstructions] = useState(recipeFormData?.instructions || []);
    const [newIngredient, setNewIngredient] = useState({ name: "", amount: "", unit: "", leftover: false });
    const [newInstruction, setNewInstruction] = useState("");
  
    // Initialize form data with defaults
    useEffect(() => {
      if (!recipeFormData || Object.keys(recipeFormData).length === 0) {
        setRecipeFormData({
          title: "",
          description: "",
          prep_time: "",
          cook_time: "",
          servings: "",
          difficulty: "mudah",
          category: "hidangan utama",
          image: "",
        });
      }
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      updateRecipeField(name, value);
    };
  
    const handleAddIngredient = () => {
      if (!newIngredient.name || !newIngredient.amount || !newIngredient.unit) {
        setError("Semua field bahan harus diisi");
        return;
      }
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ name: "", amount: "", unit: "", leftover: false });
      setError(null);
    };
  
    const handleRemoveIngredient = (index) => {
      setIngredients(ingredients.filter((_, i) => i !== index));
    };
  
    const handleAddInstruction = () => {
      if (!newInstruction.trim()) {
        setError("Langkah tidak boleh kosong");
        return;
      }
      setInstructions([...instructions, newInstruction]);
      setNewInstruction("");
      setError(null);
    };
  
    const handleRemoveInstruction = (index) => {
      setInstructions(instructions.filter((_, i) => i !== index));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);
  
      try {
        // Validation
        if (!recipeFormData?.title || !recipeFormData?.description) {
          throw new Error("Judul dan deskripsi harus diisi");
        }
        if (!recipeFormData?.prep_time || !recipeFormData?.cook_time || !recipeFormData?.servings) {
          throw new Error("Waktu dan porsi harus diisi");
        }
        if (ingredients.length === 0) {
          throw new Error("Minimal ada 1 bahan");
        }
        if (instructions.length === 0) {
          throw new Error("Minimal ada 1 langkah");
        }
  
        // Create recipe via API
        const response = await createRecipe({
          title: recipeFormData.title,
          description: recipeFormData.description,
          prep_time: parseInt(recipeFormData.prep_time),
          cook_time: parseInt(recipeFormData.cook_time),
          servings: parseInt(recipeFormData.servings),
          difficulty: recipeFormData.difficulty,
          category: recipeFormData.category,
          image: recipeFormData.image || null,
          ingredients,
          instructions,
        });
  
        setSuccess("Resep berhasil ditambahkan!");
        
        // Reset form
        setRecipeFormData({
          title: "",
          description: "",
          prep_time: "",
          cook_time: "",
          servings: "",
          difficulty: "mudah",
          category: "hidangan utama",
          image: "",
        });
        setIngredients([]);
        setInstructions([]);
        setNewIngredient({ name: "", amount: "", unit: "", leftover: false });
        setNewInstruction("");
        
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError(err.message || "Gagal menambah resep");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="add-recipe-section max-w-4xl">
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold mb-6">Tambah Resep Baru</h2>
  
          {/* Basic Info */}
          <div className="space-y-4 border-b pb-6">
            <h3 className="text-xl font-semibold">Informasi Dasar</h3>
  
            <div className="form-group">
              <label className="block font-semibold mb-2">Judul Resep *</label>
              <input
                type="text"
                name="title"
                placeholder="Masukkan judul resep"
                value={recipeFormData?.title || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
  
            <div className="form-group">
              <label className="block font-semibold mb-2">Deskripsi *</label>
              <textarea
                name="description"
                placeholder="Masukkan deskripsi resep"
                value={recipeFormData?.description || ""}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>
  
            <div className="form-group">
              <label className="block font-semibold mb-2">URL Gambar</label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={recipeFormData?.image || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
  
          {/* Time & Servings */}
          <div className="space-y-4 border-b pb-6">
            <h3 className="text-xl font-semibold">Waktu & Porsi</h3>
  
            <div className="grid grid-cols-3 gap-4">
              <div className="form-group">
                <label className="block font-semibold mb-2">Waktu Persiapan (menit) *</label>
                <input
                  type="number"
                  name="prep_time"
                  placeholder="0"
                  value={recipeFormData?.prep_time || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  min="0"
                  required
                />
              </div>
  
              <div className="form-group">
                <label className="block font-semibold mb-2">Waktu Memasak (menit) *</label>
                <input
                  type="number"
                  name="cook_time"
                  placeholder="0"
                  value={recipeFormData?.cook_time || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  min="0"
                  required
                />
              </div>
  
              <div className="form-group">
                <label className="block font-semibold mb-2">Jumlah Porsi *</label>
                <input
                  type="number"
                  name="servings"
                  placeholder="0"
                  value={recipeFormData?.servings || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>
  
          {/* Category & Difficulty */}
          <div className="space-y-4 border-b pb-6">
            <h3 className="text-xl font-semibold">Kategori & Kesulitan</h3>
  
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block font-semibold mb-2">Kategori *</label>
                <select
                  name="category"
                  value={recipeFormData?.category || "hidangan utama"}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                >
                  <option value="hidangan utama">Hidangan Utama</option>
                  <option value="camilan">Camilan</option>
                  <option value="dessert">Dessert</option>
                  <option value="minuman">Minuman</option>
                </select>
              </div>
  
              <div className="form-group">
                <label className="block font-semibold mb-2">Tingkat Kesulitan *</label>
                <select
                  name="difficulty"
                  value={recipeFormData?.difficulty || "mudah"}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                >
                  <option value="mudah">Mudah</option>
                  <option value="sedang">Sedang</option>
                  <option value="sulit">Sulit</option>
                </select>
              </div>
            </div>
          </div>
  
          {/* Ingredients */}
          <div className="space-y-4 border-b pb-6">
            <h3 className="text-xl font-semibold">Bahan-bahan *</h3>
  
            {ingredients.length > 0 && (
              <div className="space-y-2 mb-4">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                    <div>
                      <p className="font-semibold">
                        {ingredient.amount} {ingredient.unit} - {ingredient.name}
                      </p>
                      {ingredient.leftover && (
                        <p className="text-sm text-orange-600">🔄 Sisa makanan</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
  
            <div className="space-y-3 bg-gray-50 p-4 rounded">
              <input
                type="text"
                placeholder="Nama bahan"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
  
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Jumlah"
                  value={newIngredient.amount}
                  onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  min="0"
                />
                <input
                  type="text"
                  placeholder="Satuan (g, ml, butir, dll)"
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
  
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newIngredient.leftover}
                  onChange={(e) => setNewIngredient({ ...newIngredient, leftover: e.target.checked })}
                />
                <span>Ini adalah sisa makanan</span>
              </label>
  
              <button
                type="button"
                onClick={handleAddIngredient}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
              >
                + Tambah Bahan
              </button>
            </div>
          </div>
  
          {/* Instructions */}
          <div className="space-y-4 border-b pb-6">
            <h3 className="text-xl font-semibold">Langkah-langkah *</h3>
  
            {instructions.length > 0 && (
              <div className="space-y-2 mb-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex justify-between items-start bg-gray-100 p-3 rounded">
                    <div className="flex-1">
                      <p className="font-semibold">Langkah {index + 1}</p>
                      <p>{instruction}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(index)}
                      className="text-red-600 hover:text-red-800 font-bold ml-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
  
            <div className="space-y-3 bg-gray-50 p-4 rounded">
              <textarea
                placeholder="Masukkan langkah memasak"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
  
              <button
                type="button"
                onClick={handleAddInstruction}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
              >
                + Tambah Langkah
              </button>
            </div>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-org text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 font-semibold text-lg"
          >
            {loading ? "Menyimpan..." : "Simpan Resep"}
          </button>
        </form>
      </div>
    );
  }