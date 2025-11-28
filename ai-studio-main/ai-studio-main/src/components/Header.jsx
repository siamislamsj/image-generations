import React from 'react'
import logo from '../assets/logo.svg'

const Header = ({ setRoute }) => {
    return (
        <header className="flex items-center mb-12 justify-between">
            <div className="flex items-center">
                {/* <img src={logo} alt='logo' className="h-10" /> */}
            </div>
            <ul className="ml-4 text-sm text-zinc-400 flex gap-8">
                <a className="hover:text-zinc-200 font-medium text-zinc-200 cursor-pointer transition-all" onClick={() => setRoute('create')}>Create Image</a>
                <a className="hover:text-zinc-200 cursor-pointer transition-all" onClick={() => setRoute('download')}>Downloaded</a>
            </ul>
        </header>
    )
}

export default Header