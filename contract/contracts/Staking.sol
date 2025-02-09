// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    IERC20 public stakingToken;
    
    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 lockPeriod;
        uint256 rewardRate;
        bool withdrawn;
    }
    
    mapping(address => Stake[]) public stakes;
    
    uint256 public constant APY_1_MONTH = 5; // 5% APY
    uint256 public constant APY_3_MONTHS = 10; // 10% APY
    uint256 public constant APY_6_MONTHS = 15; // 15% APY
    uint256 public constant APY_12_MONTHS = 25; // 25% APY

    uint256 public constant SECONDS_IN_YEAR = 365 days;
    uint256 public constant SECONDS_IN_MONTH = 30 days;

    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC20(_stakingToken);
    }

    function stake(uint256 amount, uint256 lockPeriod) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            lockPeriod == 1 || lockPeriod == 3 || lockPeriod == 6 || lockPeriod == 12,
            "Invalid lock period"
        );
        
        uint256 rewardRate = getAPY(lockPeriod);
        
        stakingToken.transferFrom(msg.sender, address(this), amount);
        
        stakes[msg.sender].push(Stake({
            amount: amount,
            startTime: block.timestamp,
            lockPeriod: lockPeriod * SECONDS_IN_MONTH,
            rewardRate: rewardRate,
            withdrawn: false
        }));
    }

    function withdraw(uint256 index) external {
        require(index < stakes[msg.sender].length, "Invalid stake index");
        Stake storage stakeData = stakes[msg.sender][index];
        
        require(!stakeData.withdrawn, "Already withdrawn");
        require(block.timestamp >= stakeData.startTime + stakeData.lockPeriod, "Lock period not over");
        
        uint256 reward = calculateReward(stakeData.amount, stakeData.rewardRate, stakeData.lockPeriod);
        uint256 totalAmount = stakeData.amount + reward;
        stakeData.withdrawn = true;
        
        stakingToken.transfer(msg.sender, totalAmount);
    }

    function calculateReward(uint256 amount, uint256 apy, uint256 lockTime) internal pure returns (uint256) {
        return (amount * apy * lockTime) / (100 * SECONDS_IN_YEAR);
    }

    function getAPY(uint256 lockPeriod) internal pure returns (uint256) {
        if (lockPeriod == 1) return APY_1_MONTH;
        if (lockPeriod == 3) return APY_3_MONTHS;
        if (lockPeriod == 6) return APY_6_MONTHS;
        if (lockPeriod == 12) return APY_12_MONTHS;
        return 0;
    }
}
