import React, { createContext, useContext, useState } from "react";

interface RefreshContextProps {
    fastRefresh: number
    slowRefresh: number
    startRefresh: () => void
}

export const RefreshContext = createContext<RefreshContextProps>({
    fastRefresh: 0,
    slowRefresh: 0,
    startRefresh: () => { }
});

export const useRefreshContext = () => useContext(RefreshContext)

const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fastRefresh, setFastRefresh] = useState(0);
    const [slowRefresh, setSlowRefresh] = useState(0);

    const tick = () => {
        const timestamp = Date.now()
        setFastRefresh(Math.floor(timestamp / 2000))
        setSlowRefresh(Math.floor(timestamp / 6000))
    }

    const startRefresh = () => {
        setInterval(() => {
            tick()
        }, 6000);
    }

    return (
        <RefreshContext.Provider value={{ fastRefresh, slowRefresh, startRefresh }}>
            {children}
        </RefreshContext.Provider>
    );
};

export default RefreshProvider