import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Booking } from '@/lib/api';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { toast } from '../ui/use-toast';

interface Props {
  bookings: Booking[];
  onUpdateStatus: (bookingId: string, status: 'accepted' | 'declined') => void;
}

const BookingManagement = ({ bookings, onUpdateStatus }: Props) => {
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800">Declined</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to normalize ID - handles both ObjectId and string formats
  const normalizeId = (id: any): string => {
    if (typeof id === 'string') {
      return id;
    }
    if (id && typeof id === 'object' && id.$oid) {
      return id.$oid; // Handle MongoDB ObjectId format from Atlas
    }
    if (id && typeof id === 'object' && id.toString) {
      return id.toString(); // Handle ObjectId objects
    }
    return String(id);
  };

  const handleStatusUpdate = async (booking: Booking, status: 'accepted' | 'declined') => {
    const bookingId = normalizeId(booking._id);
    
    setUpdatingIds(prev => new Set(prev).add(bookingId));
    
    try {
      // This now sends { status } as the request body
      await onUpdateStatus(bookingId, status);
    } catch (error) {
      console.error('Error updating booking status:', {
        bookingId,
        error: error.response?.data || error.message
      });
      
      // Show error toast
      toast({
        title: "Update Failed",
        description: "Failed to update booking status",
        variant: "destructive",
      });
    } finally {
      setUpdatingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookingId);
        return newSet;
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Booking Management ({bookings.length} total)</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No bookings found.
            </p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const normalizedId = normalizeId(booking._id);
                const isUpdating = updatingIds.has(normalizedId);
                
                return (
                  <Card key={normalizedId} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{booking.fullName}</h3>
                        <p className="text-sm text-muted-foreground">{booking.email}</p>
                        <p className="text-sm text-muted-foreground">{booking.phone}</p>
                        <p className="text-sm">
                          Date: {new Date(booking.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {normalizedId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Raw ID: {JSON.stringify(booking._id)}
                        </p>
                        {booking.paymentProof && (
                          <a 
                            href={`http://localhost:5000/${booking.paymentProof}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            View Payment Proof
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(booking.status)}
                        {booking.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              disabled={isUpdating}
                              onClick={() => handleStatusUpdate(booking, 'accepted')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4" />
                              {isUpdating ? '...' : 'Accept'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              disabled={isUpdating}
                              onClick={() => handleStatusUpdate(booking, 'declined')}
                            >
                              <XCircle className="h-4 w-4" />
                              {isUpdating ? '...' : 'Decline'}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingManagement;