import React from 'react'

const Feedback = () => {
  return (
    <div>
        <div class="max-w-md py-3 px-3 my-8 sm:mx-auto">
  <div class="flex flex-col rounded-xl bg-slate-200 shadow-lg">
    <div class="px-12 py-5">
      <h2 class="whitespace-nowrap text-center font-semibold text-gray-800 sm:text-xl">Your opinion matters to us!</h2>
    </div>
    <div class="flex w-full flex-col items-center bg-[#fdfeff]">
      <div class="flex flex-col items-center space-y-3 py-6">
        <span class="text-lg font-medium text-gray-500">How was your experience?</span>
        
      </div>
      <div class="flex w-3/4 flex-col">
        <textarea rows="3" class="resize-none rounded-xl bg-gray-100 p-4 text-gray-500 outline-none focus:ring" placeholder="Leave a message, if you want"></textarea>
        <button class="my-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 py-3 text-base text-white">Sent now</button>
      </div>
    </div>
    <div class="flex items-center justify-center py-5">
      <a href="#" class="text-sm text-gray-600">Maybe later</a>
    </div>
  </div>
</div>




    </div>
  )
}

export default Feedback