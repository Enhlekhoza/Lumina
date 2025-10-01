// src/pages/ArticlePage.tsx
import { useParams, Link } from "react-router-dom";
import StoryblokComponent from "@/storyblok/StoryblokComponent";
import useStoryblok from "@/hooks/useStoryblok";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { story, loading, error } = useStoryblok(`articles/${slug}`, { version: "published" });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading article...</div>;
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 text-lg mb-4">{error?.message || "Article not found."}</p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const { title, subtitle, featured_image, author, publish_date, excerpt, body } = story.content;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title & subtitle */}
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-gray-500 mb-2">{subtitle}</p>}

      {/* Author & publish date */}
      <p className="text-gray-400 text-sm mb-4">
        {author && <>By {author}</>} {publish_date && <>• {new Date(publish_date).toLocaleDateString()}</>}
      </p>

      {/* Featured image */}
      {featured_image && (
        <img
          src={featured_image.filename || featured_image}
          alt={title}
          className="mb-6 w-full rounded-lg"
        />
      )}

      {/* Excerpt */}
      {excerpt && <p className="text-gray-600 italic mb-6">{excerpt}</p>}

      {/* Body blocks */}
      {body?.map((blok: any, idx: number) => (
        <StoryblokComponent blok={blok} key={idx} />
      ))}

      {/* Back button */}
      <div className="mt-8">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;