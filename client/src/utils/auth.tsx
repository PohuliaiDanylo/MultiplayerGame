import Cookies from "js-cookie";

export const saveAuthData = (
    token: string,
    user: { id: string; username: string }
) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
};

export const getAuthToken = () => {
    return Cookies.get("token");
};
