import React from 'react'

const Search = () => {
    return (
        <div
            className="relative mb-8 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/10 backdrop-blur-sm">
            <div className="flex items-center">
                <div className="pl-5 pr-2">
                    <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input type="text" placeholder="Create with Prompts"
                    className="outline-none w-full py-4 px-2 bg-transparent text-white placeholder-zinc-400 text-lg" />
                <button className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-4 mr-1 rounded-full">
                    <svg className="w-6 h-6 text-white transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Search