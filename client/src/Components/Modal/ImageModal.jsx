function ImageModal({ media, isopen, closeImage }) {
    if (!isopen || !media) return

    return (
        <div className="fixed top-0 left-0 z-30 w-full pt-16 bg-black/80 ">
            <div>
                <button
                    onClick={closeImage}
                    className="absolute top-0 right-0 btn btn-xl btn-circle btn-ghost text-white transition-all duration-500 border-none"
                >
                    ✕
                </button>

                <div className="pb-5 h-[90dvh] space-y-5 overflow-y-auto">
                    {media?.map((item, index) => (
                        item?.type === "image" ? (
                            <img src={item?.url} alt="" className=" w-[95%] max-h-[100%] sm:w-[90%] mx-auto rounded object-contain " />
                        ) : item?.type === "video" ? (
                            <video src={item?.url} controls className=" w-[95%] max-h-[100%] sm:w-[90%] mx-auto rounded object-contain" />
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageModal