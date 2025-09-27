import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ContentCardProps {
  title: string;
  summary: string;
  tags?: string[];
  // Assuming a simple slug for navigation for now
  slug: string; 
}

const ContentCard = ({ title, summary, tags, slug }: ContentCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 text-sm">{summary}</p>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <div className="p-6 pt-0 mt-auto">
        <div className="flex items-center text-primary font-semibold">
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Card>
  );
};

export default ContentCard;
