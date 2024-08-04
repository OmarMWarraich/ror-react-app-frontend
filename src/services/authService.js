import { API_URL } from "../../constants";

export const login = async (userInfo, setCurrUser) => {
  const url = `${API_URL}/login`;
  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();
    console.log(data.data);
    if (!response.ok) throw data.error;

    localStorage.setItem("token", response.headers.get("Authorization"));
    localStorage.setItem("user", JSON.stringify(data.data));
    window.location.reload();
  } catch (error) {
    console.log("error", error);
  }
};

export const logout = async (setCurrUser) => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    if (!response.ok) throw data.error;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrUser(null);
  } catch (error) {
    console.log("error", error);
  }
};

export const signup = async (userInfo, setCurrUser) => {
  const url = `${API_URL}/signup`;
  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();
    if (!response.ok) throw data.error;

    localStorage.setItem("token", response.headers.get("Authorization"));
    setCurrUser(data);
  } catch (error) {
    console.log("error", error);
  }
};
