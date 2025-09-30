// src/pages/ContentListPage.tsx
import { useParams, Link } from "react-router-dom";
import useStoryblok from "@/hooks/useStoryblok";
import { StoryblokComponent } from "@/storyblok";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface StoryItem {
  uuid: string;
  slug: string;
  content: {
    title: string;
    subtitle?: string;
    summary?: string;
    tags?: string[];
    featured_image?: { filename: string; alt?: string };
  };
}

const ContentListPage = () => {
  const { contentType } = useParams<{ contentType: string }>();

  // Fetch all stories under this content type
  const { story, loading, error } = useStoryblok(`/${contentType}`, { version: "draft" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  // Storyblok returns an array of stories in story.content.body
  const stories: StoryItem[] = story?.content?.body || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent">
      {/* Header */}
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
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground capitalize">
            {contentType?.replace("-", " ")}
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse the latest content and resources.
          </p>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((storyItem: any) => {
              const featuredImage = storyItem.content.featured_image?.filename;

              return (
                <Link to={`/articles/${storyItem.slug}`} key={storyItem.uuid}>
                  <div className="bg-card shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    {/* Featured image */}
                    {featuredImage && (
                      <img
                        src={featuredImage}
                        alt={storyItem.content.featured_image?.alt || ""}
                        className="w-full h-48 object-cover"
                      />
                    )}

                    {/* Card content */}
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">
                        {storyItem.content.title}
                      </h2>
                      {storyItem.content.subtitle && (
                        <p className="text-gray-500 mb-2">{storyItem.content.subtitle}</p>
                      )}
                      {storyItem.content.summary && (
                        <p className="text-gray-600 text-sm mb-2">{storyItem.content.summary}</p>
                      )}

                      {/* Tags */}
                      {storyItem.content.tags && storyItem.content.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {storyItem.content.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground">
              No content found.
            </h2>
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