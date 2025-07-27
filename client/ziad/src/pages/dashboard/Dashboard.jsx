import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Clock from '../../components/dashboard/clock/Clock'
import DateC from '../../components/dashboard/date/DateC'
import "./dashboard.css"
import LogoClock from "../../assets/icons/time.svg"
const Dashboard = () => {
  return (
    <div className='flex flex-row-reverse h-[100%]'>
        <div className='w-[200px]'>
                <SideBar />
        </div>

        <div className='flex flex-col w-full'>
            <div className='title'>
                <div className='title-1'>Tableau De Bord</div>
            </div>
 <div className='flex  justify-center items-center '>


            <div className='time w-[50%] h-96'>
                
                    <div className='text-[24pt] text-[#DDB660]  pt-[20px] text-center '> L'Inspecteur  </div><div className='flex justify-center'><div className='text-center text-[28pt] text-[#DDB660] pb-[20px]'>ZIAD Abderrahmane <br/> Aziz</div> </div>
                    <div className='w-full flex justify-center items-center'>
                    <div className='barre-time'></div>
                   </div>
                    <div className='time-time '>
                        <div className='time-clock'><Clock  color="#DDB660" fontSize="30pt" fontWeight="Bold" fontFamily="monospace"/></div>
                        <div className='time-icon'><img src={LogoClock} className='logoClock'/></div>
                    </div>
                    <div className='time-date'><DateC color="#DDB660" fontSize="26pt" /></div>

            </div>

        </div>
    </div>
      
    </div>
  )
}

export default Dashboard
