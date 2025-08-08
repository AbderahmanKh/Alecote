import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/lib/api";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

interface DashboardOverviewProps {
  stats: DashboardStats;
}

const DashboardOverview = ({ stats }: DashboardOverviewProps) => {
  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      description: "All booking requests",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingBookings,
      description: "Awaiting your response",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Confirmed Sessions",
      value: stats.acceptedBookings,
      description: "Accepted bookings",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Declined Requests",
      value: stats.declinedBookings,
      description: "Rejected bookings",
      icon: XCircle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="animate-slide-up stagger-1">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you might want to perform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Manage Bookings</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Review and respond to booking requests from clients.
              </p>
              <p className="text-sm font-medium text-primary">
                {stats.pendingBookings} pending requests
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Update Availability</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Add or remove available dates for new bookings.
              </p>
              <p className="text-sm font-medium text-primary">
                Manage your schedule
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;