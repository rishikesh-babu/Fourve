import React, { useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { toast } from 'react-toastify'

function CreatePost() {
    const [files, setFiles] = useState([])

    function handleFile(e) {
        const selectedFile = Array.from(e.target.files)
        setFiles(selectedFile)
    }

    function getFileType(file) {
        if (file.type.startsWith('image/')) return 'image'
        if (file.type.startsWith('video/')) return 'video'
        return 'others'
    }

    function uploadFile() {
        const formData = new FormData()

        for (const file of files) {
            formData.append('images', file)
        }

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/post/create-post',
                data: formData,
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)
                }),
            {
                pending: 'Uploading'
            }
        )

        setFiles([])
    }

    return (
        <div className='h-[87vh] pt-6 flex flex-col justify-between'>
            <div className='text-center text-3xl font-semibold '>
                Upload Image
            </div>

            <div className='overflow-x-auto whitespace-nowrap flex items-center'>  {/* How can i make this div center  */}
                <div className='mx-auto px-5 space-x-4'>
                    {files?.map((file, index) => {
                        const src = URL.createObjectURL(file)
                        const fileType = getFileType(file)

                        return (
                            <div key={index} className='size-[300px] inline-block'>
                                {fileType === 'image' ? (
                                    <img
                                        src={src}
                                        className='size-full object-cover border-2 border-blue-500 rounded-lg '
                                        alt=""
                                    />
                                ) : fileType === 'video' ? (
                                    <video
                                        src={src}
                                        className='size-full object-cover border-2 border-blue-500 rounded-lg '
                                        controls
                                    />
                                ) : (
                                    <p>
                                        Unsupported File
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className=" mx-auto mb-7 p-2 w-full max-w-xl shadow-md flex justify-between gap-1">
                <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFile}
                    className="block text-sm text-gray-700 border rounded-sm file:mr-4 file:py-3 file:px-5 file:rounded-ra file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700 transition ease-in-out duration-200"
                />
                <button
                    className="px-5 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition duration-200 border border-green-700 shadow"
                    onClick={uploadFile}
                >
                    Upload
                </button>
            </div>

        </div>
    )
}

export default CreatePost
