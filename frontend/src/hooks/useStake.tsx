import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { STAKING_ADDRESS, TOKEN_DECIMALS } from "../configs/Constants";
import { AddressString } from "../configs/Types";
import { StakingABI } from "../configs/abi/StakingABI";
import { sepolia } from "viem/chains";

export const useStake = () => {
    const { data, isError, isPending, writeContract } = useWriteContract();

    const handleStake = useCallback((stakeAmount: number, period: number) => {
        try {
            writeContract({
                address: STAKING_ADDRESS as AddressString,
                abi: StakingABI,
                chainId: sepolia.id,
                functionName: "stake",
                args: [parseUnits(stakeAmount.toString(), TOKEN_DECIMALS), BigInt(period)]
            })
        } catch (error) {
            return false
        }
    }, [])
    return { stakeData: data, isStakeError: isError, isStakePending: isPending, onStake: handleStake }
}
