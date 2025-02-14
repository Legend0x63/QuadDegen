import { useEffect } from "react"
import { formatUnits } from "viem"
import dayjs from "dayjs"

import { useStakeList } from "../../hooks/useStakeList"
import { useAppContext } from "../../contexts/AppContext"
import { localizedNumber, shortenAddress } from "../../utils/Normal"
import { TOKEN_DECIMALS } from "../../configs/Constants"
import { useWithdraw } from "../../hooks/useWithdraw"

const StakingList = () => {
    const { projectCount } = useAppContext()
    const { stakeList, onStakeList } = useStakeList()
    const { isWithdrawPending, onWithdraw } = useWithdraw()

    useEffect(() => {
        if (projectCount) {
            onStakeList(projectCount)
        }
    }, [projectCount])

    const handleWithdraw = (id: number) => {
        onWithdraw(id)
    }

    return (
        <div className="w-full max-w-4xl bg-[#1c1c1cc0] rounded-2xl p-8 mt-12 max-h-[600px] overflow-y-auto">
            <table className="w-full">
                <thead className="">
                    <tr className="font-semibold text-left">
                        <th className="bg-[#18d09a12] p-4 rounded-l-lg">Owner</th>
                        <th className="bg-[#18d09a12]">Stake</th>
                        <th className="bg-[#18d09a12]">Reward</th>
                        <th className="bg-[#18d09a12]">Duration</th>
                        <th className="bg-[#18d09a12]">Unlock Date</th>
                        <th className="bg-[#18d09a12] rounded-r-lg">Status</th>
                    </tr>
                </thead>
                <tbody className="">
                    {stakeList.map((stake, index) => {
                        console.log("legend, now = ", Date.now())
                        const nowTime = Date.now() / 1000
                        const unlockTime = Number(stake.lockPeriod) + Number(stake.startTime)

                        return (
                            <tr className="text-white text-left" key={index}>
                                <th scope="row" className="p-4 font-semibold">{shortenAddress(stake.owner)}</th>
                                <td>{localizedNumber(formatUnits(BigInt(stake.amount), TOKEN_DECIMALS))}</td>
                                <td>{localizedNumber(Number(formatUnits(BigInt(stake.amount), TOKEN_DECIMALS)) * Number(stake.rewardRate) / 100)}</td>
                                <td>{Number(stake.lockPeriod) / 3600 / 24} Days</td>
                                <td>{dayjs.unix(unlockTime).format('DD.MM.YYYY')}</td>
                                <td>
                                    {nowTime > unlockTime ?
                                        (stake.withdrawn ?
                                            'Closed'
                                            :
                                            <button disabled={isWithdrawPending} className="border border-[#18D09A] text-lg rounded-lg p-0.5 px-8 cursor-pointer hover:bg-[#18D09A40] hover:text-white disabled:opacity-30" onClick={() => handleWithdraw(Number(stake.stakeId))}>{isWithdrawPending ? 'Unstaking...' : 'Unstake'}</button>
                                        )
                                        :
                                        'Locked'}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StakingList