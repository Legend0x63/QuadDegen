const Hero = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center mt-12'>
            <div className="w-full max-w-3xl flex items-center justify-around text-white">
                <div className="flex items-center">
                    <div className="size-24 flex items-center justify-center bg-[#1c1c1c] rounded-full">
                        <img src="/images/lock.png" alt="lock" />
                    </div>
                    <div className="flex flex-col items-start bg-[#1c1c1c] p-2 px-6 -ml-3 rounded-r-3xl">
                        <div>$24546523.24</div>
                        <div>Total Locked</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="size-24 flex items-center justify-center bg-[#1c1c1c] rounded-full">
                        <img src="/images/work.png" alt="lock" />
                    </div>
                    <div className="flex flex-col items-start bg-[#1c1c1c] p-2 px-6 -ml-3 rounded-r-3xl">
                        <div>1542</div>
                        <div>Total Projects</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero