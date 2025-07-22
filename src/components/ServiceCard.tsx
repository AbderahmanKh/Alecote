import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Heart, Sprout, LifeBuoy } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "compass":
        return <Compass className="h-10 w-10 text-primary" />;
      case "heart":
        return <Heart className="h-10 w-10 text-primary" />;
      case "sprout":
        return <Sprout className="h-10 w-10 text-primary" />;
      default:
        return <LifeBuoy className="h-10 w-10 text-primary" />;
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-border/50 h-full">
      <CardHeader className="pb-2">
        <div className="mb-4">{getIcon()}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;