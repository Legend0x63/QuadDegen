import { useEffect, useState } from "react"
import dayjs from 'dayjs';
import { useAccount } from "wagmi"
import { formatUnits } from "viem";

import { useTokenBalance } from "../../hooks/useTokenBalance"
import { localizedNumber } from "../../utils/Normal"
import { useStake } from "../../hooks/useStake";
import { useAllowance } from "../../hooks/useAllowance";
import { useApprove } from "../../hooks/useApprove";
import { TOKEN_DECIMALS } from "../../configs/Constants";
import { useRefreshContext } from "../../contexts/RefreshContext";

const Percents = [10, 25, 50, 75, 100]
const Durations = [1, 3, 6, 12]

const StakingBox = () => {
    const { address } = useAccount()
    const { balance, getBalance } = useTokenBalance()
    const { isStakePending, onStake } = useStake()
    const { fastRefresh } = useRefreshContext()

    const { allowance, getAllowance } = useAllowance()
    const { isApprovePending, onApprove } = useApprove()

    const [percent, setPercent] = useState(0)
    const [amount, setAmount] = useState(0)
    const [duration, setDuration] = useState(1)
    const [apr, setApr] = useState(12)
    const [isNeedApprove, setIsNeedApprove] = useState(false)

    useEffect(() => {
        if (address) {
            getBalance(address)
            getAllowance(address)
        }
    }, [address, fastRefresh])

    useEffect(() => {
        setAmount(Number(balance) * percent / 100)
    }, [balance, percent])

    useEffect(() => {
        if (duration == 1) {
            setApr(12)
        } else if (duration == 3) {
            setApr(24)
        } else if (duration == 6) {
            setApr(36)
        } else if (duration == 12) {
            setApr(48)
        }
    }, [duration])

    useEffect(() => {
        console.log("legend, allowance = ", allowance)
        if (amount > Number(formatUnits(BigInt(allowance), TOKEN_DECIMALS))) {
            setIsNeedApprove(true)
        } else {
            setIsNeedApprove(false)
        }
    }, [amount, allowance])

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value) {
            setAmount(parseFloat(e.target.value))
        } else {
            setAmount(0)
        }
    }

    const handleAction = () => {
        if (address) {
            if (amount > allowance) {
                onApprove(amount)
            } else {
                onStake(amount, duration)
            }
        }
    }

    const futureDate = dayjs().add(30 * duration, 'day');

    return (
        <div className="w-full max-w-4xl bg-[#1c1c1cc0] rounded-2xl p-8 mt-12">
            <div className="text-3xl font-semibold">QUAD-DEGEN-N1 Staking</div>
            <div className="w-full flex items-center justify-around bg-[#18d09a26] rounded-xl p-5 mt-4 gap-2">
                <div className="w-1/2 px-4 pr-8">
                    <div>Balance: <span className="text-xl">{localizedNumber(balance)} QUAD</span></div>
                    <div className="w-full flex items-start gap-2 mt-4">
                        <div className="mt-1 min-w-20">Amount:</div>
                        <div className="w-full">
                            <input className="w-full outline-none bg-transparent border border-[#18D09A] rounded p-1 px-2 text-right" placeholder="Input Stake Amount" value={amount} onChange={handleAmountChange} />
                            <div className="flex items-start justify-between gap-1 mt-2">
                                {Percents.map((percent, index) => {
                                    return (
                                        <div className={`border border-[#18D09A] min-w-12 rounded cursor-pointer hover:bg-[#18D09A40] hover:text-white`} onClick={() => setPercent(percent)} key={index}>{percent === 100 ? 'MAX' : percent}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center  gap-2 mt-2">
                        <div className="mt-1 min-w-20">Duration:</div>
                        <div className="w-full">
                            <div className="flex items-start justify-between gap-1 mt-2">
                                {Durations.map((item, index) => {
                                    return (
                                        <div className={`border border-[#18D09A] min-w-15 rounded cursor-pointer hover:bg-[#18D09A40] hover:text-white ${duration === item ? 'bg-[#18D09A40] text-white' : ''}`} onClick={() => setDuration(item)} key={index}>{item}M</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-0.25 h-48 bg-[#18D09A]" />
                <div className="w-1/2">
                    <div className="text-xl">Preview</div>
                    <div className="w-full flex items-center justify-around p-4">
                        <div className="w-1/2">
                            <div>Deposit Amount</div>
                            <div className="text-xl font-bold">{localizedNumber(amount)}</div>
                        </div>
                        <div className="w-1/2">
                            <div>Reward Rate</div>
                            <div className="text-xl font-bold">{localizedNumber(amount * apr / 100)}</div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-around p-4">
                        <div className="w-1/2">
                            <div>APY</div>
                            <div className="text-xl font-bold">{apr}%</div>
                        </div>
                        <div className="w-1/2">
                            <div>End Date</div>
                            <div className="text-xl font-bold">{futureDate.format('MM-DD-YYYY')}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mt-4">
                <button className="border border-[#18D09A] text-lg rounded-lg p-0.5 px-8 cursor-pointer hover:bg-[#18D09A40] hover:text-white" onClick={handleAction}>{isNeedApprove ? 'Approve' : isApprovePending ? 'Approving...' : isStakePending ? 'Staking...' : 'Stake'}</button>
            </div>
        </div>
    )
}

export default StakingBox