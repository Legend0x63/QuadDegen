import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { baseSepolia } from "viem/chains";
import { STAKING_ADDRESS } from "../configs/Constants";
import { AddressString } from "../configs/Types";
import { StakingABI } from "../configs/abi/StakingABI";

export const useWithdraw = () => {
    const { data, isError, isPending, writeContract } = useWriteContract();

    const handleWithdraw = useCallback((index: number) => {
        try {
            writeContract({
                address: STAKING_ADDRESS as AddressString,
                abi: StakingABI,
                chainId: baseSepolia.id,
                functionName: "withdraw",
                args: [BigInt(index)]
            })
        } catch (error) {
            return false
        }
    }, [])
    return { withdrawData: data, isWithdrawError: isError, isWithdrawPending: isPending, onWithdraw: handleWithdraw }
}
