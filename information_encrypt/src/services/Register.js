import axios from "axios";

let API_URL = "http://localhost:8080/user/register";

const register = async (emailP, passwordP) => {
  try {
    const response = await axios.post(API_URL, {
      email: emailP,
      password: passwordP,
    });
    return response;
  } catch (error) {
    return false;
  }
};

export default {
  register,
};
