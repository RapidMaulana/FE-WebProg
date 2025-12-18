import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "../../context/FormContext";
import { useNavigate } from "react-router-dom";
import { getWishlistRecipes, removeFromWishlist } from "../../api/services";
import { updatePassword, updateProfile } from "../../api/auth_services";

import RecipeCard from "../../components/RecipesCard";

import AddRecipe from "../../components/profile/AddRecipes";
import EditProfile from "../../components/profile/EditProfile";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, setUser } = useAuth();
  const {
    formData: profileFormData,
    updateField: updateProfileField,
    setFormData: setProfileFormData,
    clearForm: clearProfileForm,
  } = useForm("editProfile");
  const {
    formData: passwordFormData,
    updateField: updatePasswordField,
    setFormData: setPasswordFormData,
    clearForm: clearPasswordForm,
  } = useForm("changePassword");

  const [menuState, setMenuState] = useState(0);

  // Informasi State
  const [editInfoMode, setEditInfoMode] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState(null);

  // UI State
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Initialize profile form from user data
  useEffect(() => {
    if (user && Object.keys(profileFormData).length === 0) {
      setProfileFormData({
        nama: user.nama || "",
        email: user.email || "",
        nomor_telepon: user.nomor_telepon || "",
        alamat: user.alamat || "",
      });
    }
  }, [user]);

  // Initialize password form
  useEffect(() => {
    if (Object.keys(passwordFormData).length === 0) {
      setPasswordFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    }
  }, []);

  // Load wishlist when tab 3 is selected
  useEffect(() => {
    if (menuState === 3) {
      loadWishlist();
    }
  }, [menuState]);

  const loadWishlist = async () => {
    try {
      setWishlistLoading(true);
      setWishlistError(null);
      const data = await getWishlistRecipes();
      setWishlist(data);
    } catch (err) {
      setWishlistError("Gagal load wishlist");
      console.error(err);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    updateProfileField(name, value);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      const updatedUser = await updateProfile({
        nama: profileFormData?.nama,
        email: profileFormData?.email,
        nomor_telepon: profileFormData?.nomor_telepon,
        alamat: profileFormData?.alamat,
      });
      setUser(updatedUser);
      setProfileSuccess("Profile berhasil diperbarui!");
      setEditInfoMode(false);
      setTimeout(() => setProfileSuccess(null), 3000);
    } catch (err) {
      setProfileError(err.response?.data?.message || "Gagal update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    updatePasswordField(name, value);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    try {
      await updatePassword({
        current_password: passwordFormData?.current_password,
        new_password: passwordFormData?.new_password,
        new_password_confirmation: passwordFormData?.new_password_confirmation,
      });
      setPasswordSuccess("Password berhasil diubah!");
      clearPasswordForm();
      setTimeout(() => setPasswordSuccess(null), 3000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Gagal update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (recipeId) => {
    try {
      await removeFromWishlist({ recipeId });
      setWishlist(wishlist.filter((r) => r.id !== recipeId));
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const menuItems = ["Informasi", "Edit Profile", "Tambah Resep", "Wishlist"];

  const renderContent = () => {
    switch (menuState) {
      case 0:
        // Informasi
        return (
          <div className="info-section max-w-2xl">
            <div className="bg-white shadow-lg rounded-lg p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 font-semibold">Nama</p>
                  <p className="text-2xl font-bold">{user?.nama || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Email</p>
                  <p className="text-2xl font-bold">{user?.email || "-"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 font-semibold">Nomor Telepon</p>
                  <p className="text-2xl font-bold">
                    {user?.nomor_telepon || "Belum diisi"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Alamat</p>
                  <p className="text-2xl font-bold">
                    {user?.alamat || "Belum diisi"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 font-semibold">Bergabung sejak</p>
                <p className="text-2xl font-bold">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("id-ID")
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        );

      case 1:
        // Edit Profile
        return <EditProfile />;

      case 2:
        // Tambah Resep
        return <AddRecipe />;

      case 3:
        // Wishlist
        return (
          <div className="wishlist-section">
            {wishlistLoading && <p>Loading wishlist...</p>}
            {wishlistError && <p className="text-red-600">{wishlistError}</p>}
            {wishlist.length === 0 ? (
              <p className="text-gray-600">Wishlist kosong</p>
            ) : (
              <div className="items-wrapper flex flex-row flex-wrap mt-5 gap-10 justify-center items-center">
                {wishlist.map((recipe) => (
                  <RecipeCard {...recipe} />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (authLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <>
      {/* HEADER */}
      <div
        className="header h-[60vh] w-full"
        style={{
          backgroundImage: "url(/images/header/RecipesPage.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "0 75%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative flex flex-col items-center justify-center gap-4 bg-black/45 w-full h-full text-white text-center">
          <div className="absolute bottom-[-20%] left-[5%] shadow-lg profile-picture w-[300px] h-[300px] rounded-[200px] bg-org flex items-center justify-center text-6xl font-bold">
            {user?.nama?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs font-semibold text-3xl border-b-2 border-org flex flex-row mt-20 px-10 gap-4 overflow-x-auto">
        {menuItems.map((v, i) => (
          <button
            key={i}
            onClick={() => setMenuState(i)}
            className={`px-10 py-4 transition whitespace-nowrap
                ${
                  menuState === i
                    ? "border-b-4 border-org text-org"
                    : "hover:bg-org/30 text-black"
                }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content px-10 py-10 w-screen">{renderContent()}</div>
    </>
  );
}
