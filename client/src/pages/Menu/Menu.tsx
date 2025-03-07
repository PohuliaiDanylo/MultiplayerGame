import { getAuthToken } from "../../utils/auth";

export default function Menu() {
    return <>{getAuthToken()}</>;
}
