import Cookies from "js-cookie";

export const saveAuthData = (token: string) => {
    Cookies.set("token", token, { expires: 7 });
};

export const getAuthToken = () => {
    return Cookies.get("token");
};

export const signOut = () => {
    window.location.reload();
    Cookies.remove("token");
    return;
};
