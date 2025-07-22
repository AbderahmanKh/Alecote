import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Since react-day-picker is missing, let's create a simplified calendar component
type CalendarProps = {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  initialFocus?: boolean
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  disabled,
  ...props
}: CalendarProps) {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  
  const [viewMonth, setViewMonth] = React.useState(currentMonth)
  const [viewYear, setViewYear] = React.useState(currentYear)
  
  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }
  
  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }
  
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }
  
  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }
  
  const isSelected = (date: Date) => {
    if (!selected) return false
    
    if (selected instanceof Date) {
      return date.toDateString() === selected.toDateString()
    }
    
    return false
  }
  
  const isDisabled = (date: Date) => {
    if (disabled) return disabled(date)
    return false
  }
  
  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return
    if (onSelect) onSelect(date)
  }
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  
  const daysInMonth = getDaysInMonth(viewMonth, viewYear)
  const firstDayOfMonth = getFirstDayOfMonth(viewMonth, viewYear)
  
  const renderDays = () => {
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-9 w-9 p-0 text-center text-sm relative opacity-50"></div>
      )
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewYear, viewMonth, day)
      const isToday = date.toDateString() === today.toDateString()
      
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => handleDateClick(date)}
          disabled={isDisabled(date)}
          className={cn(
            "h-9 w-9 p-0 font-normal rounded-md",
            isToday && "bg-accent text-accent-foreground",
            isSelected(date) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            isDisabled(date) && "text-muted-foreground opacity-50",
            !isSelected(date) && !isDisabled(date) && !isToday && "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {day}
        </button>
      )
    }
    
    return days
  }
  
  return (
    <div className={cn("p-3", className)}>
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center pt-1 relative items-center">
          <div className="text-sm font-medium">
            {monthNames[viewMonth]} {viewYear}
          </div>
          <div className="space-x-1 flex items-center absolute right-1">
            <button
              onClick={handlePrevMonth}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {dayNames.map((day) => (
            <div key={day} className="text-muted-foreground text-center text-xs">
              {day}
            </div>
          ))}
          {renderDays()}
        </div>
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }