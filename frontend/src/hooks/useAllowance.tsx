import { useCallback, useState } from "react";
import { erc20Abi } from "viem";
import { sepolia } from "viem/chains";
import { readContract } from "@wagmi/core";

import { config } from "../Providers";
import { STAKING_ADDRESS, TOKEN_ADDRESS } from "../configs/Constants";
import { AddressString } from "../configs/Types";

export const useAllowance = () => {
    const [allowance, setAllowance] = useState(0)

    const getAllowance = useCallback(async (walletAddress: string) => {
        try {
            const data = await readContract(config,
                {
                    address: TOKEN_ADDRESS as AddressString,
                    abi: erc20Abi,
                    chainId: sepolia.id,
                    functionName: "allowance",
                    args: [walletAddress as AddressString, STAKING_ADDRESS],
                });
            setAllowance(Number(data));
        } catch (error) {
            console.error('Error fetching contract data:', error);
        }
    }, []);

    return { allowance, getAllowance }
}
