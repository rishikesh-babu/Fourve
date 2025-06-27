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
        return

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
        <div className='pt-6 px-1 h-full flex flex-col justify-between'>
            <div className='text-center text-3xl font-semibold '>
                Upload Image
            </div>

            <div className='overflow-x-auto whitespace-nowrap flex items-center'>
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
{/* 
            <div className=" mx-auto mb-7 p-2 w-full max-w-xl shadow-md flex justify-between">
                <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFile}
                    className="shrink block text-sm text-gray-700 border rounded-sm file:mr-4 file:py-3 file:px-5 file:rounded-ra file:border-0 file:text-sm file:font-semibold file:bg-blue-800 file:text-white hover:file:bg-blue-700 transition ease-in-out duration-200"
                />
                <button
                    className="px-5 py-2 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition duration-200 border border-green-700 shadow"
                    onClick={uploadFile}
                >
                    Upload
                </button>
            </div>


            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-white rounded-lg shadow-md w-full max-w-xl mx-auto">
                <label className="flex flex-col items-center justify-center w-full sm:w-auto px-4 py-3 bg-blue-50 text-blue-700 border-2 border-blue-500 border-dashed rounded-lg cursor-pointer hover:bg-blue-100 transition">
                    <span className="font-medium text-sm">Select Files</span>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFile}
                        className="hidden"
                    />
                </label>

                <button
                    onClick={uploadFile}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition w-full sm:w-auto"
                >
                    Upload
                </button>
            </div> */}



            <div className='p-6 my-6 mx-auto w-full max-w-xl rounded-lg shadow-[0px_0px_5px_0px_gray] flex flex-col items-center gap-4'>
                <label className=' py-3 w-full text-center text-blue-800 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-700 rounded-lg '>
                    <span className=" font-medium text-sm">Select Files</span>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={handleFile}
                        className="hidden"
                    />
                </label>

                <button
                    onClick={uploadFile}
                    className='px-6 py-3 w-full text-white font-semibold border rounded-lg bg-blue-600 hover:bg-blue-700'
                >
                    Upload
                </button>
            </div>

        </div>
    )
}

export default CreatePost
