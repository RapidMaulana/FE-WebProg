import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "../../context/FormContext";
import Navbar from "../../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { formData, updateField, setFormData, clearForm } = useForm("login");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form data dengan proper default
  useEffect(() => {
    // Cek jika formData kosong atau undefined
    if (!formData || Object.keys(formData).length === 0) {
      setFormData({
        email: "",
        password: "",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email tidak boleh kosong");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Format email tidak valid");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password tidak boleh kosong");
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
      await login(formData.email, formData.password);
      // Redirect ke home setelah login berhasil
      navigate("/");
      clearForm(); // Clear form data setelah login berhasil
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login gagal. Silahkan cek email dan password anda.";
      setError(errorMessage);
      console.error("Login error:", err);
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
          backgroundImage: "url(/images/header/LogIn.jpg)",
          width: "100vw",
          height: "100vh",
          backgroundSize: "110%",
          backgroundPosition: "-180% 0%",
        }}
      >
        <div className="wrapper w-[50%] h-screen bg-white shadow-2xl flex flex-col justify-center items-center gap-3">
          <img className="w-[55%]" src="/favicon.png" alt="Logo" />
          <div className="header text-center">
            <h1 className="text-6xl font-bold">Selamat Datang!</h1>
            <p className="text-4xl">Masuk ke akun anda</p>
          </div>

          {error && (
            <div className="w-[90%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="form-wrapper flex flex-col w-[90%] gap-4"
          >
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

            <button
              type="submit"
              disabled={loading}
              className="bg-org text-white py-2.5 px-10 shadow-xl hover:shadow-2xl text-2xl font-semibold rounded-2xl transition-all ease-in-out duration-500 align-middle disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div className="bottom-text-wrapper">
            <p className="text-xl">
              Belum punya akun?{" "}
              <Link to={"/auth/register"} className="text-org font-semibold hover:underline">
                Daftar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}