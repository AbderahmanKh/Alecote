import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Music } from "lucide-react";

const SocialMedia = () => {
  return (
    <Tabs defaultValue="instagram" className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            Instagram
          </TabsTrigger>
          <TabsTrigger value="spotify" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            Spotify
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="instagram" className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="overflow-hidden border-0 shadow-none">
              <CardContent className="p-0">
                <a href="#" className="block relative aspect-square overflow-hidden rounded-md">
                  <img
                    src={`https://picsum.photos/id/${1020 + item}/400/400`}
                    alt={`Instagram post ${item}`}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Follow on Instagram
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </div>
      </TabsContent>
      
      <TabsContent value="spotify" className="space-y-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="aspect-[16/9] overflow-hidden rounded-md bg-muted">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd"
                width="100%"
                height="380"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="flex justify-center mt-6">
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
              >
                Follow on Spotify
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SocialMedia;