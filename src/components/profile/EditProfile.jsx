import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "../../context/FormContext";
import { updateProfile, updatePassword } from "../../api/auth_services";

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const {
    formData: profileFormData,
    updateField: updateProfileField,
    setFormData: setProfileFormData,
  } = useForm("editProfile");
  const {
    formData: passwordFormData,
    updateField: updatePasswordField,
    setFormData: setPasswordFormData,
    clearForm: clearPasswordForm,
  } = useForm("changePassword");

  const [editInfoMode, setEditInfoMode] = useState(false);

  // UI States
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize profile form
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

  return (
    <div className="space-y-6">
      {/* Edit Profile Section */}
      <div className="edit-profile-section max-w-2xl">
        {profileSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {profileSuccess}
          </div>
        )}
        {profileError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {profileError}
          </div>
        )}

        {editInfoMode ? (
          <form
            onSubmit={handleProfileSubmit}
            className="bg-white shadow-lg rounded-lg p-8 space-y-4"
          >
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <div className="form-group">
              <label className="block font-semibold mb-2">Nama</label>
              <input
                type="text"
                name="nama"
                value={profileFormData?.nama || ""}
                onChange={handleProfileInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profileFormData?.email || ""}
                onChange={handleProfileInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold mb-2">Nomor Telepon</label>
              <input
                type="tel"
                name="nomor_telepon"
                value={profileFormData?.nomor_telepon || ""}
                onChange={handleProfileInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold mb-2">Alamat</label>
              <textarea
                name="alamat"
                value={profileFormData?.alamat || ""}
                onChange={handleProfileInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={profileLoading}
                className="bg-org text-white px-8 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
              >
                {profileLoading ? "Menyimpan..." : "Simpan"}
              </button>
              <button
                type="button"
                onClick={() => setEditInfoMode(false)}
                className="bg-gray-300 text-black px-8 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Batal
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <div className="space-y-4 mb-6">
              <p>
                <span className="font-semibold">Nama:</span> {user?.nama}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-semibold">Nomor Telepon:</span>{" "}
                {user?.nomor_telepon || "-"}
              </p>
              <p>
                <span className="font-semibold">Alamat:</span>{" "}
                {user?.alamat || "-"}
              </p>
            </div>
            <button
              onClick={() => setEditInfoMode(true)}
              className="bg-org text-white px-8 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Change Password Section */}
      <div className="change-password-section max-w-2xl">
        {passwordSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {passwordSuccess}
          </div>
        )}
        {passwordError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {passwordError}
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Ubah Password</h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block font-semibold mb-2">
                Password Saat Ini
              </label>
              <input
                type="password"
                name="current_password"
                value={passwordFormData?.current_password || ""}
                onChange={handlePasswordInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold mb-2">Password Baru</label>
              <input
                type={showPassword ? "text" : "password"}
                name="new_password"
                value={passwordFormData?.new_password || ""}
                onChange={handlePasswordInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="form-group">
              <label className="block font-semibold mb-2">
                Konfirmasi Password Baru
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="new_password_confirmation"
                value={passwordFormData?.new_password_confirmation || ""}
                onChange={handlePasswordInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <span>Tampilkan password</span>
            </label>

            <button
              type="submit"
              disabled={passwordLoading}
              className="bg-org text-white px-8 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 w-full"
            >
              {passwordLoading ? "Mengubah..." : "Ubah Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}