import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"
import { EndDate, StartDate } from "@/types/generics"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"

interface RangeSelectorProps {
  startDate?: Date,
  endDate?: Date,
}

export default function RangeSelector({ startDate, endDate }: RangeSelectorProps) {

  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: startDate ?? StartDate.toDate(),
    to: endDate ?? EndDate.toDate(),
  })

  return (
    <Popover open={open}>
      <PopoverTrigger>
        <div className="w-6 p-2" onClick={() => setOpen(!open)}>
          <p>Date</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="bg-popover">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
