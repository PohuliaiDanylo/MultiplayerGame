import { useParams } from "react-router";

export default function Game() {
    // add a check if player leave the page, reload or internet lost connection happend
    let params = useParams();

    return <p>{params.id}</p>;
}
