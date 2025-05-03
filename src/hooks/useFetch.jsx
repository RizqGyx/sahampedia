import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const request = async (method, url, body = null, headers = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers,
      });
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const get = (url, headers = {}) => {
    return request("GET", url, null, headers);
  };

  const post = (url, body, headers = {}) => {
    return request("POST", url, body, headers);
  };

  const put = (url, body, headers = {}) => {
    return request("PUT", url, body, headers);
  };

  const deleteRequest = (url, headers = {}) => {
    return request("DELETE", url, null, headers);
  };

  return { data, loading, error, get, post, put, deleteRequest };
};

export default useFetch;
