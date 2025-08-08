import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AvailableDate } from "@/lib/api";
import { Plus, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateManagementProps {
  availableDates: AvailableDate[];
  onAddDate: (date: string) => void;
  onRemoveDate: (dateId: string) => void;
}

const DateManagement = ({ availableDates, onAddDate, onRemoveDate }: DateManagementProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isAddingDate, setIsAddingDate] = useState(false);

  const handleAddDate = async () => {
    if (!selectedDate) return;
    
    setIsAddingDate(true);
    try {
      await onAddDate(selectedDate.toISOString());
      setSelectedDate(undefined);
    } finally {
      setIsAddingDate(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sortedDates = [...availableDates].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Available Date</CardTitle>
          <CardDescription>
            Select dates when you're available for sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button 
              onClick={handleAddDate} 
              disabled={!selectedDate || isAddingDate}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {isAddingDate ? "Adding..." : "Add Date"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Dates</CardTitle>
          <CardDescription>
            Manage your available dates for client bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedDates.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No available dates set.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add dates above to allow clients to book sessions.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedDates.map((dateObj) => (
                <div key={dateObj._id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{formatDate(dateObj.date)}</p>
                    <p className="text-sm text-muted-foreground">
                      {dateObj.isAvailable ? "Available for booking" : "Not available"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveDate(dateObj._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DateManagement;