import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface AppProps {
    projectCount: number
    setProjectCount: Dispatch<SetStateAction<number>>
}

export const AppContext = createContext<AppProps | undefined>(undefined);

export const useAppContext = (): AppProps => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error(
            'useAppContext must be used within a AppContextProvider',
        )
    }
    return context
}

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projectCount, setProjectCount] = useState(0);

    return (
        <AppContext.Provider value={{
            projectCount,
            setProjectCount,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider