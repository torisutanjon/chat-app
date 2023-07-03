import axios from "axios";

const accountAPI = {
  createAccount: async (email: string, username: string, password: string) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: `http://localhost:5000/user/create`,
        data: {
          email,
          username,
          password,
        },
      });

      window.alert(res?.data?.message);
      window.location.href = "/login";
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        window.alert(error?.response?.data?.message);
      }
      window.location.reload();
    }
  },
  loginAccount: async (username: string, password: string) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: `http://localhost:5000/user/login`,
        data: {
          username,
          password,
        },
      });

      localStorage.setItem("userToken", res?.data?.token);

      window.alert(res?.data?.message);
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        window.alert(error?.response?.data?.message);
      }
      window.location.reload();
    }
  },
  sendVerification: async (userID: string, email: string) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: `http://localhost:5000/user/send-verification`,
        data: {
          userID,
          email,
        },
      });

      window.alert(res?.data?.message);
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        window.alert(error?.response?.data?.message);
      }
      window.location.reload();
    }
  },
  confirmVerification: async (idToken: string, userToken: string) => {
    try {
      const res = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: `http://localhost:5000/user/confirm-verification`,
        data: {
          idToken,
          userToken,
        },
      });

      window.alert(res?.data?.message);
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        window.alert(error?.response?.data?.message);
      }
      window.location.reload();
    }
  },
};

export default accountAPI;
