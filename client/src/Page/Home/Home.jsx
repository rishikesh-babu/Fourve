import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'

function Home() {
    const [postData, setPostData] = useState([])

    useEffect(() => {
        getAllPost()
    }, [])

    function getAllPost() {
        axiosInstance({
            method: 'GET',
            url: 'post/get-all-post'
        })
            .then((res) => {
                console.log('res :>> ', res);
                setPostData(res?.data?.data)
            })
    }
    return (
        <div className="min-h-[80vh] p-4">
            <div className="text-center text-4xl font-bold mb-8 border-b pb-2">Gallery</div>

            <div className="space-y-8">
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
            </div>
        </div>

    )
}

export default Home
