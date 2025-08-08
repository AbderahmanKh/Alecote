import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { apiService, AvailableDate } from "@/lib/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  date: z.string({
    required_error: "Please select a date for your session.",
  }),
  paymentProof: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Please upload your payment proof.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const BookingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const fetchAvailableDates = async () => {
    try {
      const dates = await apiService.getAvailableDates();
      setAvailableDates(dates.filter(date => date.isAvailable));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load available dates",
        variant: "destructive",
      });
    } finally {
      setLoadingDates(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('date', data.date);
      formData.append('paymentProof', data.paymentProof[0]);

      await apiService.createBooking(formData);
      
      setIsSuccess(true);
      toast({
        title: "Booking Successful!",
        description: "We've received your booking request. You'll hear from us soon!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4 animate-fade-in">
        <div className="bg-card rounded-lg p-8 shadow-sm border text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground mb-6">
            Your booking request has been submitted successfully. I'll review your request and get back to you within 24 hours.
          </p>
          <Button asChild className="rounded-full">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-3xl font-bold">Book Your Session</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to schedule your personal guidance session
        </p>
      </div>

      <div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border animate-slide-up stagger-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Dates</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={loadingDates ? "Loading dates..." : "Select an available date"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableDates.map((dateObj) => (
                        <SelectItem key={dateObj._id} value={dateObj.date}>
                          {new Date(dateObj.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Only dates made available by the advisor are shown.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentProof"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Payment Proof</FormLabel>
                  <FormControl>
                    <div className="grid w-full items-center gap-1.5">
                      <label
                        htmlFor="payment-proof"
                        className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-muted-foreground/25 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </div>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG or PDF (max. 5MB)
                          </p>
                        </div>
                        <input
                          id="payment-proof"
                          type="file"
                          className="sr-only"
                          accept="image/png,image/jpeg,application/pdf"
                          onChange={(e) => {
                            onChange(e.target.files);
                          }}
                          {...rest}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Please upload a screenshot or photo of your payment confirmation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={isSubmitting || loadingDates}
            >
              {isSubmitting ? "Processing..." : "Submit Booking Request"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingPage;