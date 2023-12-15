import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike, BiSolidMessageAltDots } from 'react-icons/bi'

const TopBar = ({ liked, disliked, setLiked, setDisliked }) => {
    
    return (
        <div className='h-[140px]'>
            <div className='fixed top-0 max-w-[500px] w-full bg-white'>
                <p className='text-gray-500 text-center p-5'>Chat with us!</p>
                <hr />
                <div>
                    {/*  */}
                    <div className='flex justify-between px-8 py-3'>
                        <div className='w-[50px] h-[50px] rounded-full border flex justify-center items-center border-gray-300'>
                            <BiSolidMessageAltDots color='#2563eb' size={23} />
                        </div>
                        <div>
                            <p className='text-gray-500 text-center '>Beck Fitzgerald</p>
                            <p className='text-gray-400 text-center -mt-1'>Support Agent</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <p onClick={() => {
                                setLiked(!liked)
                                setDisliked(false)
                            }}>
                            {
                                liked ? <BiSolidLike color='#4b5563' size={30}/> :
                                    <BiLike  color='#4b5563' size={30} />
                            }

                            </p>
                            <p onClick={() => {
                                setDisliked(!disliked)
                                setLiked(false)
                            }}>

                            {
                                disliked ? <BiSolidDislike color='#4b5563' size={30}/> :
                                <BiDislike color='#4b5563' size={30} />
                            }
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default TopBar