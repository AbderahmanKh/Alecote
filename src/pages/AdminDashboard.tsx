import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { apiService, Booking, AvailableDate, DashboardStats } from "@/lib/api";
import { Calendar, Users, Clock, CheckCircle, XCircle, Plus, Trash2, LogOut } from "lucide-react";
import BookingManagement from "@/components/admin/BookingManagement";
import DateManagement from "@/components/admin/DateManagement";
import DashboardOverview from "@/components/admin/DashboardOverview";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    declinedBookings: 0,
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    
    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    try {
      const [statsData, bookngsData, datesData] = await Promise.all([
        apiService.getDashboardStats(),
        apiService.getBookings(),
        apiService.getAvailableDates(),
      ]);
      
      setStats(statsData);
      setBookings(bookngsData);
      setAvailableDates(datesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateBookingStatus = async (bookingId: string, status: 'accepted' | 'declined') => {
    try {
      await apiService.updateBookingStatus(bookingId, status);
      await fetchDashboardData();
      
      toast({
        title: "Status Updated",
        description: `Booking has been ${status}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    }
  };

  const addAvailableDate = async (date: string) => {
    try {
      await apiService.addAvailableDate(date);
      await fetchDashboardData();
      
      toast({
        title: "Date Added",
        description: "New available date has been added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add available date",
        variant: "destructive",
      });
    }
  };

  const removeAvailableDate = async (dateId: string) => {
    try {
      await apiService.removeAvailableDate(dateId);
      await fetchDashboardData();
      
      toast({
        title: "Date Removed",
        description: "Available date has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove available date",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings and availability</p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="dates">Available Dates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview stats={stats} />
        </TabsContent>

        <TabsContent value="bookings">
          <BookingManagement 
            bookings={bookings} 
            onUpdateStatus={updateBookingStatus}
          />
        </TabsContent>

        <TabsContent value="dates">
          <DateManagement 
            availableDates={availableDates}
            onAddDate={addAvailableDate}
            onRemoveDate={removeAvailableDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;