import instance from "./api_instance";

export const register = async ({
  nama,
  email,
  password,
  password_confirmation,
  nomor_telepon,
  alamat,
}) => {
  try {
    const response = await instance.post("/auth/register", {
      nama,
      email,
      password,
      password_confirmation,
      nomor_telepon,
      alamat,
    });

    // Simpan token ke localStorage
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.token}`;
    }

    return response.data.data.user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await instance.post("/auth/login", {
      email,
      password,
    });

    // Simpan token ke localStorage
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.data.token}`;
    }

    return response.data.data.user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getProfile = async () => {
  try {
    const response = await instance.get("/auth/profile");
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateProfile = async ({ nama, email, nomor_telepon, alamat }) => {
  try {
    const response = await instance.put("/auth/profile", {
      nama,
      email,
      nomor_telepon,
      alamat,
    });
    return response.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updatePassword = async ({
  current_password,
  new_password,
  new_password_confirmation,
}) => {
  try {
    const response = await instance.put("/auth/password", {
      current_password,
      new_password,
      new_password_confirmation,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await instance.post("/auth/logout");

    // Hapus token dari localStorage
    localStorage.removeItem("token");
    delete instance.defaults.headers.common["Authorization"];

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete instance.defaults.headers.common["Authorization"];
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();
  };