import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import SocialMedia from "@/components/SocialMedia";

const LandingPage = () => {
  const services = [
    {
      id: 1,
      title: "Life Guidance",
      description: "Navigate life's challenges with personalized advice and actionable strategies tailored to your unique situation.",
      icon: "compass"
    },
    {
      id: 2,
      title: "Relationship Coaching",
      description: "Strengthen connections, improve communication, and build healthier relationships with expert guidance.",
      icon: "heart"
    },
    {
      id: 3,
      title: "Personal Growth",
      description: "Discover your potential and develop a roadmap for achieving your goals with supportive, insightful coaching.",
      icon: "sprout"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex flex-col space-y-4 md:w-1/2 animate-slide-in">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Find Your Path with Alecote
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Personalized guidance for life's journey. One-on-one sessions to help you navigate relationships, career decisions, and personal growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/book">Book a Session</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="https://picsum.photos/id/1011/800/1000"
                  alt="Alecote"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 bg-secondary/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              How Our Services Work
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px]">
              Personalized guidance tailored to your unique journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {services.map((service, index) => (
              <div key={service.id} className={`animate-slide-up stagger-${index + 1}`}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Connect With Me
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px]">
              Follow my journey and get inspired through social media
            </p>
          </div>
          <div className="mt-12 animate-slide-up stagger-1">
            <SocialMedia />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-accent">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to Transform Your Life?
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-[700px]">
              Book a session today and take the first step towards a better tomorrow
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full">
              <Link to="/book">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;