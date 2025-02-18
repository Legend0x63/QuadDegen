import { useCallback, useState } from "react";
import { erc20Abi, formatUnits } from "viem";
import { baseSepolia } from "viem/chains";
import { readContract } from "@wagmi/core";

import { config } from "../Providers";
import { AddressString } from "../configs/Types";
import { TOKEN_ADDRESS, TOKEN_DECIMALS } from "../configs/Constants";

export const useTokenBalance = () => {
    const [balance, setBalance] = useState('0')

    const getBalance = useCallback(async (walletAddress: string) => {
        if (walletAddress) {
            try {
                const data = await readContract(config,
                    {
                    address: TOKEN_ADDRESS as AddressString,
                    chainId: baseSepolia.id,
                    abi: erc20Abi,
                    functionName: 'balanceOf',
                    args: [walletAddress as AddressString],
                });
                setBalance(formatUnits(BigInt(data), TOKEN_DECIMALS));
            } catch (error) {
                console.error('Error fetching contract data:', error);
            }
        }
    }, []);

    return {balance, getBalance}
}