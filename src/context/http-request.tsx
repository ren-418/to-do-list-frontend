import axios from "axios";
import config from "../config/config";

axios.defaults.baseURL = config.BACKEND_URL + '/api/v1';

const restApi = {
    postRequest: async (url: string, data?: any) => {
      // handle every post request
        const result = await axios.post(url, data)
        return result.data
    },
    setAuthToken: (token: string) => {
      // set auth header with token
        if (token) {
            axios.defaults.headers.common['Authorization'] =  token;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    },

    loginStatus: async (authToken: any) => {
        const result = await axios.post("user/getData", {}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization':  authToken
          }
        })    

        return result.data
      },
}

export { restApi };