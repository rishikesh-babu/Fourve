import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { FaImages } from 'react-icons/fa';
import ImageModal from '../../Components/Modal/ImageModal';

function Home() {
    const [postData, setPostData] = useState([])
    const [filterMedia, setFilterMedia] = useState('all')
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isopen, setIsOpen] = useState(false)

    useEffect(() => {
        getAllPost()
    }, [])

    const filteredPostData = filterMedia === 'all' ? postData : postData?.map((post) => ({
        ...post,
        media: post.media.filter((item) => item.type === filterMedia)
    }))

    function getAllPost() {
        axiosInstance({
            method: 'GET',
            url: '/post/get-all-post'
        })
            .then((res) => {
                console.log('res :>> ', res);
                setPostData(res?.data?.data)
            })
    }

    function openImage(media) {
        setSelectedMedia(media);
        setIsOpen(true)
        document.getElementById('imageModel').showModal()
    }

    function closeImage() {
        setSelectedMedia(null)
        setIsOpen(false)
    }
    return (
        <div className="min-h-[80vh] p-4">
            <div className=" pb-2 mb-8 text-center text-4xl font-bold border-b">Gallery</div>

            <select
                id="hotelSelect"
                className='w-full p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm text-lg sm:text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={filterMedia}
                onChange={(e) => setFilterMedia(e.target.value)}
            >
                <option value="all">All</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
            </select>

            <div className='mt-10 w-fit mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 '>
                {filteredPostData?.map((post, postIndex) => (
                    <div
                        onClick={() => openImage(post.media)}
                        key={postIndex}
                        className="relative overflow-x-auto whitespace-nowrap hover:cursor-pointer"
                    >
                        {/* Preview Container */}
                        <div className="relative size-full ">
                            {/* Top-left badge if multiple media */}
                            {post?.media?.length > 1 && (
                                <div className="absolute z-10 top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                    <FaImages className="text-sm" />
                                    <span>{post.media.length}</span>
                                </div>
                            )}

                            {/* Media Display */}
                            {post?.media[0]?.type === 'image' ? (
                                <img
                                    src={post.media[0]?.url}
                                    className="size-full object-cover border-2 border-blue-500 rounded-lg"
                                    alt=""
                                />
                            ) : post?.media[0]?.type === 'video' ? (
                                <video
                                    src={post.media[0]?.url}
                                    className="size-full object-cover border-2 border-blue-500 rounded-lg"
                                    controls
                                />
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>

            <ImageModal isopen={isopen} closeImage={closeImage} media={selectedMedia} />
        </div>
    )
}

export default Home

{/* <div className="space-y-8">
    {postData?.map((item, index) => (
        <div key={index} className="p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{item?.title}</h2>

            <div className="flex gap-4 overflow-x-auto p-2">
                {item?.media?.map((mediaItem, mediaIndex) => (
                    <div
                        key={mediaIndex}
                        className="w-[250px] h-64 flex-shrink-0 rounded shadow overflow-hidden"
                    >
                        {mediaItem?.type === 'image' ? (
                            <img
                                src={mediaItem?.url}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <video
                                src={mediaItem?.url}
                                controls
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>


            <p className="text-base">{item?.description}</p>
        </div>
    ))}
</div> */}

{/* <div>
    {postData?.map((post, postIndex) => (
        <div key={postIndex} className='overflow-x-auto whitespace-nowrap'>
            {post?.media?.length > 2 ? (
                <div className='size-[300px] sm:size-[300px]'>
                    {post?.media[0].type === 'image' ? (
                        <img
                            src={post?.media[0]?.url}
                            className='size-full object-cover border-2 border-blue-500 rounded-lg '
                            alt=""
                        />
                    ) : post?.media[0] === 'video' ? (
                        <video
                            src={post?.media[0]?.url}
                            className='size-full object-cover border-2 border-blue-500 rounded-lg '
                            controls
                        />
                    ) : null}
                </div>
            ) : (
                <div className='size-[200px] sm:size-[300px] '>
                    {post?.media[0].type === 'image' ? (
                        <img
                            src={post?.media[0]?.url}
                            className='size-full object-cover border-2 border-blue-500 rounded-lg '
                            alt=""
                        />
                    ) : post?.media[0] === 'video' ? (
                        <video
                            src={post?.media[0]?.url}
                            className='size-full object-cover border-2 border-blue-500 rounded-lg '
                            controls
                        />
                    ) : null}
                </div>
            )}

        </div>
    ))}
</div> */}