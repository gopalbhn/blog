import { X } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const WriteSuggestion = ({
  open,close
}) => {
  const [reviewText,setReviewText] = useState('')

  async function handleSendReview(){
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({reviewText}),
      credentials:'include'
    })
    if(res.ok){
      toast.success("Review Sent Successfully")
    }else{
      toast.error("Unable to send RReview")
    }
  }

  if(!open) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'>
            
              <div className="w-full max-w-lg rounded-xl bg-white shadow-xl flex flex-col justify-center">
                <button
                        onClick={close}
                        className="absolute right-4 top-4 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={18} />
                    </button>
        <h1 className='text-title font-bold my-2 text-center'>Write Your Review Here</h1>
              <textarea
            rows={7}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-[90%] mx-auto resize-none rounded-xl border border-gray-300 p-4 text-gray-700 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 "
          />
         <div className="mt-6 flex justify-end gap-3 pr-10 mb-2">
                        <button
                            onClick={close}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-[var(--color-secondary)] transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onclick={handleSendReview}
                            className="rounded-lg bg-[var(--color-primary)] px-5 py-2.5 font-medium text-white transition hover:bg-[var(--color-primary-hover)]"
                        >
                            Continue
                        </button>
                    </div>
    </div>
    </div>

  )
}

export default WriteSuggestion