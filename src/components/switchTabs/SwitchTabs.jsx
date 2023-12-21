import React, { useState } from 'react'
import './switchTab.scss'

const SwitchTabs = ({ data, onTabChange, size }) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const activeTab = (tab, index) => {
        setLeft(index * parseInt(size))
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab, index)
    }

    return (
        <div className='switchingTabs h-[34px] bg-white rounded-full p-[2px] '>
            <div className="tabItems flex items-center h-[30px] relative ">
                {data.map((tab, index) => (
                    <span 
                    key={index} 
                    className={`tabItem ${selectedTab === index ? 'active' : ''}  h-full flex items-center justify-center w-[${size}] text-black text-[14px] relative z-10 cursor-pointer `}
                    onClick={() => activeTab(tab, index)}>
                        {tab}
                    </span>
                ))}
                <span 
                    className={`movingBg h-[30px] w-[${size}] rounded-full absolute left-0 bg-gradient-to-r from-orange to-pink `} 
                    style={{left}} 
                />
            </div>
        </div>
    )
}

export default SwitchTabs