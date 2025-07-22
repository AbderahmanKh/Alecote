import { Link } from "react-router-dom";
import { Instagram, Music, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-secondary/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Alecote</h3>
            <p className="text-sm text-muted-foreground">
              Personal guidance for life's journey. One-on-one sessions to help you navigate relationships and personal growth.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link to="/book" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Book a Session
              </Link>
            </nav>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:contact@alecote.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@alecote.com
              </a>
              <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <div className="flex space-x-3 pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Music className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} Alecote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;