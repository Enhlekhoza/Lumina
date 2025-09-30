import { useParams } from "react-router-dom";
import useStoryblok from "@/hooks/useStoryblok";
import ContentCard from "@/components/ContentCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ContentListPage = () => {
  // Using a dynamic slug from the URL, e.g., /content/articles
  const { contentType } = useParams<{ contentType: string }>();
  
  // Fetch all stories of a certain content type
  const { story, loading, error } = useStoryblok(`stories?starts_with=${contentType}`, { version: "draft" });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading content...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;
  }

  const stories = story?.stories || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground capitalize">
            {contentType?.replace('-', ' ')}
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse the latest content and resources.
          </p>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((storyItem: any) => (
              <Link to={`/content/story/${storyItem.slug}`} key={storyItem.uuid}>
                <ContentCard
                  title={storyItem.content.title}
                  summary={storyItem.content.summary}
                  tags={storyItem.content.tags}
                  slug={storyItem.slug}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground">No content found.</h2>
            <p className="text-muted-foreground mt-2">
              There are no items to display in this section yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContentListPage;
