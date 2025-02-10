export type AddressString = `0x${string}`;

export type StakeInfo = {
    stakeId: string,
    owner: string,
    amount: string,
    startTime: string,
    lockPeriod: string,
    rewardRate: string,
    withdrawn: boolean
}