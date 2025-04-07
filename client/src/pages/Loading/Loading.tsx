import loadIcon from "../../assets/images/loadIcon.png";

export default function Loading() {
    return (
        <main className=" flex flex-col items-center">
            <img
                className="w-20 animate-spin grayscale"
                src={loadIcon}
                alt="load icon"
            />
            <p className=" animate-pulse text-(length:--big-fs) text-(--text-clr)">
                Loading...
            </p>
        </main>
    );
}
