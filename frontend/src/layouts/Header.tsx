import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <nav className="w-full h-20 max-w-6xl m-auto flex items-center justify-between">
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <img src="/images/lock.png" alt="lock" className="h-12" />
                        <div className="text-3xl uppercase font-bold">Staking</div>
                    </div>
                </Link>
                <div className="flex items-center justify-center gap-12">
                    <Link to="/" className="text-xl hover:text-white">Home</Link>
                    <Link to="/staking" className="text-xl hover:text-white">Staking</Link>
                </div>
                <button className="bg-[#18d09a33] text-[#18D09A] py-3 px-4 font-semibold rounded-xl cursor-pointer">Connect Wallet</button>
            </nav>
        </header>
    )
}

export default Header