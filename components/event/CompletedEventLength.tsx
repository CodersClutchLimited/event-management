import React from 'react'
import StatsCard from '../StatsCard'
import { completedEventLength } from '@/lib/actions/event/GetAllEvent'
import { Timer } from 'lucide-react'

const CompletedEventLength = async () => {
    const upcomingEventsLength = await completedEventLength()
  return (
    <div>
       <StatsCard
             
              icon={<Timer className="w-3.5 h-5 text-green" />}
              title={"Upoming Events"}
              value={upcomingEventsLength.completedEvent}
              percentage={"+20.1% from last month"}
            />
    </div>
  )
}

export default CompletedEventLength
