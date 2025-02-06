const Percents = [10, 25, 50, 75, 100]
const Durations = [1, 3, 6, 12]

const StakingBox = () => {
    return (
        <div className="w-full max-w-4xl bg-[#1c1c1cc0] rounded-2xl p-8 mt-12">
            <div className="text-3xl font-semibold">QUAD-DEGEN-N1 Staking</div>
            <div className="w-full flex items-center justify-around bg-[#18d09a26] rounded-xl p-5 mt-4 gap-2">
                <div className="w-1/2 px-4 pr-8">
                    <div>Balance: <span className="text-xl">3540.264 QUAD</span></div>
                    <div className="w-full flex items-start gap-2 mt-4">
                        <div className="mt-1 min-w-20">Amount:</div>
                        <div className="w-full">
                            <input className="w-full outline-none bg-transparent border border-[#18D09A] rounded p-1 px-2 text-right" placeholder="Input Stake Amount" />
                            <div className="flex items-start justify-between gap-1 mt-2">
                                {Percents.map((percent, index) => {
                                    return (
                                        <div className={`border border-[#18D09A] min-w-12 rounded cursor-pointer`} key={index}>{percent === 100 ? 'MAX' : percent}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center  gap-2 mt-2">
                        <div className="mt-1 min-w-20">Duration:</div>
                        <div className="w-full">
                            <div className="flex items-start justify-between gap-1 mt-2">
                                {Durations.map((duration, index) => {
                                    return (
                                        <div className={`border border-[#18D09A] min-w-15 rounded cursor-pointer`} key={index}>{duration}M</div>
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
                            <div className="text-xl font-bold">12313.45</div>
                        </div>
                        <div className="w-1/2">
                            <div>Reward Rate</div>
                            <div className="text-xl font-bold">12313.2</div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-around p-4">
                        <div className="w-1/2">
                            <div>APY</div>
                            <div className="text-xl font-bold">12%</div>
                        </div>
                        <div className="w-1/2">
                            <div>End Date</div>
                            <div className="text-xl font-bold">25.02.2025</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mt-4">
                <button className="bg-[#18D09A] text-white text-lg rounded p-0.5 px-8 cursor-pointer">Stake</button>
            </div>
        </div>
    )
}

export default StakingBox