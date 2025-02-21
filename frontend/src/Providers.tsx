import { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi'
import { base, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';
import RefreshProvider from './contexts/RefreshContext';
import AppProvider from './contexts/AppContext';

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'd435f16be793d3db0463773854f4ddf3'

export const config = getDefaultConfig({
    appName: 'Quad Degen',
    projectId: projectId,
    chains: [base, baseSepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()} modalSize='compact' >
                    <AppProvider>
                        <RefreshProvider>
                            {children}
                        </RefreshProvider>
                    </AppProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default Providers