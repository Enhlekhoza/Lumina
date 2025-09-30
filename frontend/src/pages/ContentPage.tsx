import { useParams } from "react-router-dom";
import useStoryblok from "@/hooks/useStoryblok";
import { useBookmarks, Bookmark as BookmarkType } from "@/hooks/useBookmarks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, User, Bookmark } from "lucide-react";

const ContentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { story, loading, error } = useStoryblok(slug ? `articles/${slug}` : undefined, { version: "draft" });
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  if (loading) {
    return <div className="text-center p-8">Loading content...</div>;
  }

  if (error || !story) {
    return <div className="text-center p-8 text-destructive">Content not found for '{slug}'.</div>;
  }

  const { name, content, published_at } = story;
  const author = content?.author || "Unknown";
  const category = content?.category || "Uncategorized";
  const readingTime = content?.reading_time || "5 min";
  const summary = content?.summary || "No summary available.";

  const handleBookmarkToggle = () => {
    const bookmarkItem: BookmarkType = { slug: story.slug, title: name, summary };
    if (isBookmarked(story.slug)) {
      removeBookmark(story.slug);
    } else {
      addBookmark(bookmarkItem);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary">{category}</Badge>
            <Button variant="ghost" size="icon" onClick={handleBookmarkToggle}>
              <Bookmark className={`w-6 h-6 ${isBookmarked(story.slug) ? "text-primary fill-primary" : "text-muted-foreground"}`} />
            </Button>
          </div>
          <CardTitle className="text-4xl font-bold text-foreground">{name}</CardTitle>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Published on: {new Date(published_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>{readingTime} read</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 prose dark:prose-invert max-w-none">
          {/* This is a simplified renderer. For a real app, you'd use a proper Storyblok rich text renderer. */}
          {content?.body?.map((block: any, index: number) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: block.content }} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentPage;
