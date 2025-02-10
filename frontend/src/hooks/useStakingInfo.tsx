import { readContracts } from "@wagmi/core";
import { useCallback, useState } from "react";
import { config } from "../Providers";
import { STAKING_ADDRESS } from "../configs/Constants";
import { StakingABI } from "../configs/abi/StakingABI";


export const useStakingInfo = () => {
    const [totalProject, setTotalProject] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleStakingInfo = useCallback(async () => {
        try {
            const data = await readContracts(config, {
                contracts: [
                    {
                        address: STAKING_ADDRESS as `0x${string}`,
                        abi: StakingABI,
                        functionName: "totalStakeItems",
                    },
                    {
                        address: STAKING_ADDRESS as `0x${string}`,
                        abi: StakingABI,
                        functionName: "totalStakedAmount",
                    },
                ],
            });
            setTotalProject(Number(data[0].result));
            setTotalAmount(Number(data[1].result));
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
        return false;
    }, []);

    return { totalProject, totalAmount, onStakingInfo: handleStakingInfo };
};