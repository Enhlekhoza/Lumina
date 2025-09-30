import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

const FeaturedContent = () => {
  const featured = [
    {
      slug: "advanced-search-techniques",
      title: "Advanced Search Techniques",
      category: "Productivity",
    },
    {
      slug: "data-visualization-principles",
      title: "Data Visualization Principles",
      category: "Data Science",
    },
    {
      slug: "introduction-to-machine-learning",
      title: "Intro to Machine Learning",
      category: "AI",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="w-5 h-5 mr-2 text-blue-500" />
          Featured Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel>
          <CarouselContent>
            {featured.map((item) => (
              <CarouselItem key={item.slug}>
                <Link to={`/content/${item.slug}`}>
                  <div className="p-4 border rounded-lg hover:bg-accent">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default FeaturedContent;
