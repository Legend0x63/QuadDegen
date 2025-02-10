import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'

import Header from "./layouts/Header"
import Home from "./views/Home"
import Staking from "./views/Staking"
import Hero from "./layouts/Hero"
import { useRefreshContext } from "./contexts/RefreshContext"

function App() {
    const { startRefresh } = useRefreshContext()

    startRefresh()

    return (
        <BrowserRouter>
            <Header />
            <Hero />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/staking" element={<Staking />} />
            </Routes>
        </BrowserRouter >
    )
}

export default App
