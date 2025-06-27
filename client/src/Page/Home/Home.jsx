import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { FaAngleLeft, FaAngleRight, FaExpand, FaImages } from 'react-icons/fa';
import ImageModal from '../../Components/Modal/ImageModal';

function Home() {
    const [postData, setPostData] = useState([])
    const [filterMedia, setFilterMedia] = useState('all')
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isopen, setIsOpen] = useState(false)
    const [mediaIndex, setMediaIndex] = useState({})

    useEffect(() => {
        getAllPost()
    }, [])

    const filteredPostData = filterMedia === 'all' ? postData : postData?.map((post) => ({
        ...post,
        media: post.media.filter((item) => item.type === filterMedia)
    })).filter((post) => post.media.length > 0)

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

    function renderMedia(mediaItem) {
        if (!mediaItem) return null

        if (mediaItem?.type === 'image') {
            return (
                <img
                    src={mediaItem?.url}
                    className="size-full object-cover border-2 border-blue-500 rounded-lg"
                    alt=""
                />
            )
        }

        if (mediaItem?.type === 'video') {
            return (
                <video
                    src={mediaItem?.url}
                    className="size-full object-cover border-2 border-blue-500 rounded-lg"
                    controls
                />
            )
        }
    }

    function handleNext(postIndex, mediaLength) {
        setMediaIndex((pre) => ({
            ...pre,
            [postIndex]: ((pre[postIndex] || 0) + 1) % mediaLength
        }))
    }

    function handlePrev(postIndex, mediaLength) {
        setMediaIndex((pre) => ({
            ...pre,
            [postIndex]: ((pre[postIndex] || 0) - 1 + mediaLength) % mediaLength
        }))
    }

    return (
        <div className="min-h-[80vh] p-4 select-none">
            <div className=" pb-2 mb-8 text-center text-4xl font-bold border-b">Gallery</div>

            <select
                id="hotelSelect"
                className='w-full p-2.5 border border-gray-300 rounded-lg shadow-sm text-white text-lg sm:text-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={filterMedia}
                onChange={(e) => setFilterMedia(e.target.value)}
            >
                <option value="all">All</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
            </select>

            <div className='mt-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 '>
                {filteredPostData?.map((post, postIndex) => (
                    <div
                        key={postIndex}
                        className="relative aspect-[4/3] overflow-x-auto whitespace-nowrap"
                    >
                        {/* Top-left badge if multiple media */}
                        {post?.media?.length > 1 && (
                            <div className="absolute z-10 top-2 left-2 px-2 py-1 bg-black text-white text-xs rounded flex items-center gap-1"                                                          >
                                <FaImages className="text-lg" />
                                <span>{post.media.length}</span>
                            </div>
                        )}

                        {/* Left Arrow Icon */}
                        {post?.media?.length > 1 && (
                            <div
                                className="absolute top-1/2 left-2 -translate-y-1/2 p-2 z-10 bg-black opacity-70 hover:opacity-100 transition duration-200 rounded-full shadow-md cursor-pointer"
                                onClick={() => handlePrev(postIndex, post.media.length)}
                            >
                                <FaAngleLeft className=' text-white text-3xl' />
                            </div>
                        )}

                        {/* Right Arrow Icon */}
                        {post?.media?.length > 1 && (
                            <div
                                className='absolute top-1/2 right-2 -translate-y-1/2 p-2 z-10 bg-black opacity-70 hover:opacity-100 transition duration-200 rounded-full shadow-md cursor-pointer'
                                onClick={() => handleNext(postIndex, post.media.length)}
                            >
                                <FaAngleRight className='text-white text-3xl' />
                            </div>
                        )}

                        {/* Expand Icon */}
                        {post?.media && (
                            <div
                                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-2 opacity-70 hover:opacity-100 transition duration-200 shadow-md cursor-pointer'
                                onClick={() => openImage(post.media)}
                            >
                                <FaExpand className='text-white text-3xl' />
                            </div>
                        )}

                        {/* Image Index icon */}
                        {post?.media?.length > 1 && (
                            <div className='absolute bottom-3 left-1/2 -translate-x-1/2 px-5 py-3 text-2xl text-white/80 font-semibold tracking-[5px] bg-black/60 rounded-full'>
                                {(mediaIndex[postIndex] || 0) + 1} / {post?.media.length}
                            </div>
                        )}

                        {/* Media Display */}
                        {renderMedia(post?.media[mediaIndex[postIndex] || 0])}



                    </div>
                ))}
            </div>

            <ImageModal isopen={isopen} closeImage={closeImage} media={selectedMedia} />
        </div>
    )
}

export default Home