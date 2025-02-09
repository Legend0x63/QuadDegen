import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const StakingModule = buildModule("Staking", (m) => {
  const stakingToken = "0xYourTokenAddressHere"; // Replace with your token address
  const stakingContract = m.contract("Staking", [stakingToken]);

  return { stakingContract };
});

export default StakingModule