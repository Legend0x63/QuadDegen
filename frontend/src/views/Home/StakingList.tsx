import { useEffect } from "react"
import { useStakeList } from "../../hooks/useStakeList"
import { useAppContext } from "../../contexts/AppContext"
import { localizedNumber, shortenAddress } from "../../utils/Normal"
import { formatUnits } from "viem"
import { TOKEN_DECIMALS } from "../../configs/Constants"
import dayjs from "dayjs"

const StakingList = () => {
    const { projectCount } = useAppContext()
    const { stakeList, onStakeList } = useStakeList()

    useEffect(() => {
        if (projectCount) {
            onStakeList(projectCount)
        }
    }, [projectCount])

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
                                            <button>Withdraw</button>
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