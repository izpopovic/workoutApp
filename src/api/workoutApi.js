import axios from "axios";
import { AsyncStorage, ActionSheetIOS } from "react-native";

const instance = axios.create({
  baseURL: "http://44eb8b6c.ngrok.io"
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
