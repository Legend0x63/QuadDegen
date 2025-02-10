import { readContracts } from "@wagmi/core";
import { useCallback, useState } from "react";
import { config } from "../Providers";
import { STAKING_ADDRESS } from "../configs/Constants";
import { StakingABI } from "../configs/abi/StakingABI";
import { StakeInfo } from "../configs/Types";

export const useStakeList = () => {
    const [stakeList, setStakeList] = useState<StakeInfo[]>([])

    const handleStakeList = useCallback(async (count: number) => {
        let projectLists = []
        for (let i = 0; i < count; i++) {
            const project = {
                address: STAKING_ADDRESS as `0x${string}`,
                abi: StakingABI,
                functionName: "getStake",
                args: [BigInt(i + 1)]
            }
            projectLists.push(project)
        }

        try {
            const datas = await readContracts(config, {
                contracts: projectLists
            });

            const projectData = datas.map(data => {
                console.log("legend data = ", data)
                if (data.result) {
                    const result = data.result as unknown as [string, string, string, string, string, string, boolean];
                    return {
                        stakeId: result[0],
                        owner: result[1],
                        amount: result[2],
                        startTime: result[3],
                        lockPeriod: result[4],
                        rewardRate: result[5],
                        withdrawn: result[6]
                    }
                } else {
                    return {
                        stakeId: '',
                        owner: '',
                        amount: '',
                        startTime: '',
                        lockPeriod: '',
                        rewardRate: '',
                        withdrawn: false
                    }
                }
            })
            setStakeList(projectData)
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
        return false;
    }, []);

    return { stakeList, onStakeList: handleStakeList };
};