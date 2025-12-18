import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { register as registerService } from "../../api/auth_services";
import { useForm } from "../../context/FormContext";
import Navbar from "../../components/Navbar"; 

export default function Register() {
  const navigate = useNavigate();
  const { formData, updateField, setFormData, clearForm } = useForm("register");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize form data dengan proper default
  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0) {
      setFormData({
        nama: "",
        email: "",
        password: "",
        password_confirmation: "",
        nomor_telepon: "",
        alamat: "",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const validateForm = () => {
    if (!formData.nama.trim()) {
      setError("Nama tidak boleh kosong");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email tidak boleh kosong");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Format email tidak valid");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password minimal 8 karakter");
      return false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError("Password dan konfirmasi password tidak sama");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await registerService({
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        nomor_telepon: formData.nomor_telepon || null,
        alamat: formData.alamat || null,
      });

      // Redirect ke home setelah register berhasil
      navigate("/");
      clearForm(); // Clear form data setelah register berhasil
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        "Registrasi gagal. Silahkan coba lagi.";
      setError(errorMessage);
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="content"
        style={{
          backgroundImage: "url(/images/header/SignUp.jpg)",
          width: "100vw",
          height: "100vh",
          backgroundSize: "110%",
          backgroundPosition: "-180% 0%",
        }}
      >
        <div className="wrapper w-[50%] h-screen bg-white shadow-2xl flex flex-col justify-center items-center gap-3 overflow-y-auto">
          <img className="w-[55%]" src="/favicon.png" alt="Logo" />
          <div className="header text-center">
            <h1 className="text-6xl font-bold">Halo!</h1>
            <p className="text-4xl">Daftar menjadi anggota</p>
          </div>

          {error && (
            <div className="w-[90%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="form-wrapper flex flex-col w-[90%] gap-3"
          >
            <div className="form-group">
              <label htmlFor="nama" className="block font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                placeholder="Binus Keren"
                value={formData?.nama || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData?.email || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="block font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="*****"
                  value={formData?.password || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-600"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation" className="block font-semibold mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="*****"
                  value={formData?.password_confirmation || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-600"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nomor_telepon" className="block font-semibold mb-2">
                Nomor Telepon (Opsional)
              </label>
              <input
                type="tel"
                id="nomor_telepon"
                name="nomor_telepon"
                placeholder="081234567890"
                value={formData?.nomor_telepon || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="alamat" className="block font-semibold mb-2">
                Alamat (Opsional)
              </label>
              <textarea
                id="alamat"
                name="alamat"
                placeholder="Jl. Merdeka No. 1"
                value={formData?.alamat || ""}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-org text-white py-2.5 px-10 shadow-xl hover:shadow-2xl text-2xl font-semibold rounded-2xl transition-all ease-in-out duration-500 align-middle disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>
          </form>

          <div className="bottom-text-wrapper">
            <p className="text-xl">
              Sudah Punya akun?{" "}
              <Link to={"/auth/login"} className="text-org font-semibold hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}