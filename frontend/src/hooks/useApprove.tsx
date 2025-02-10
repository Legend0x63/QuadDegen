import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { STAKING_ADDRESS, TOKEN_ADDRESS, TOKEN_DECIMALS } from "../configs/Constants";

export const useApprove = () => {
    const { data, isPending, writeContractAsync } = useWriteContract();

    const handleApprove = useCallback(async (amount: number) => {
        try {
            await writeContractAsync({
                address: TOKEN_ADDRESS,
                abi: erc20Abi,
                chainId: sepolia.id,
                functionName: "approve",
                args: [STAKING_ADDRESS, parseUnits(amount.toString(), TOKEN_DECIMALS)],
            })
        } catch (err) {
            console.log(err)
            return false
        }
    }, [])
    
    return { data: data, isApprovePending: isPending, onApprove: handleApprove }
}
