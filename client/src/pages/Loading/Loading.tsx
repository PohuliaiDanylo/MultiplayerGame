export default function Loading() {
    return (
        <div className=" flex flex-col items-center">
            <img
                className="w-20 animate-spin grayscale"
                src="public/loadicon.png"
                alt="load icon"
            />
            <p className=" animate-pulse text-(length:--big-fs) text-(--text-clr)">
                Loading...
            </p>
        </div>
    );
}
