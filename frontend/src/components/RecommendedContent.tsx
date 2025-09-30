import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Mock data for recommended content
const recommendations = [
  { slug: "getting-started-with-lumina", title: "Getting Started with Lumina", category: "Onboarding", summary: "Learn the basics of the Lumina platform in this introductory guide.", image: "/placeholder.svg" },
  { slug: "advanced-search-techniques", title: "Advanced Search Techniques", category: "Tutorial", summary: "Become a power user by mastering our advanced search features.", image: "/placeholder.svg" },
  { slug: "case-study-acme-corp", title: "Case Study: How Acme Corp Succeeded", category: "Success Story", summary: "Discover how Acme Corp leveraged Lumina to boost productivity.", image: "/placeholder.svg" },
  { slug: "understanding-your-dashboard", title: "Understanding Your Dashboard", category: "Guide", summary: "A deep dive into all the features and stats available to you.", image: "/placeholder.svg" },
];

const RecommendedContent = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <Link to={`/content/story/${item.slug}`} key={item.slug}>
            <Card className="hover:bg-accent transition-colors">
              <CardHeader>
                <Badge variant="secondary">{item.category}</Badge>
                <CardTitle className="mt-2">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.summary}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedContent;