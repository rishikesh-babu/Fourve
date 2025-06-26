function ImageModal({ media }) {
    return (
        <dialog id="imageModel" className="modal">
            <div className="modal-box max-w-full  ">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost text-2xl absolute right-2 top-2">
                        ✕
                    </button>
                </form>

                <div className="mt-5 mx-auto w-fit space-y-2">
                    {media?.map((item, index) => (
                        item?.type === "image" ? (
                            <img src={item?.url} alt="" className="size-[300px] sm:size-[500px] md:size-[600px] object-cover " />
                        ) : item?.type === "video" ? (
                            <video src={item?.url} controls className="size-[300px] sm:size-[500px] md:size-[600px] object-cover" />
                        ) : null
                    ))}
                </div>
            </div>
        </dialog>
    );
};

export default ImageModal