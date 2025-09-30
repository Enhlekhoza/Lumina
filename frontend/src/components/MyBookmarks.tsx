import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Bookmark, Trash2 } from "lucide-react";

const MyBookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-muted-foreground">You have no bookmarks yet.</p>
        <p className="text-sm text-muted-foreground">Click the bookmark icon on any article to save it.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Bookmark className="w-6 h-6 mr-2" />
        My Bookmarks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.slug} className="p-4 flex flex-col justify-between shadow-card">
            <div>
              <Link to={`/content/story/${bookmark.slug}`} className="font-semibold text-foreground hover:underline">
                {bookmark.title}
              </Link>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{bookmark.summary}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeBookmark(bookmark.slug)} className="mt-2 self-end">
              <Trash2 className="w-5 h-5 text-destructive" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookmarks;