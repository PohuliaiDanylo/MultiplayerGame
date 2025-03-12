import { getAuthToken } from "./auth";

import Cookies from "js-cookie";

export function getUserData(setFunction: (username: string) => void) {
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    fetch(`${API_URL}/api/user/getData`, {
        method: "GET",
        headers: { Authorization: `Bearer ${getAuthToken()}` },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
                Cookies.remove("token");
                return;
            }
            setFunction(data.username);
        })
        .catch((err) => console.log(err));
}
