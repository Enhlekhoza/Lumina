// src/pages/ArticlePage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StoryblokComponent } from "@/storyblok";
import useStoryblok from "@/hooks/useStoryblok";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { story, loading, error } = useStoryblok(`articles/${slug}`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading article...
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 text-lg mb-4">
          {error?.message || "Article not found."}
        </p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Article title and subtitle */}
      <h1 className="text-4xl font-bold mb-2">{story.content.title}</h1>
      {story.content.subtitle && (
        <p className="text-gray-500 mb-4">{story.content.subtitle}</p>
      )}

      {/* Storyblok content blocks */}
      {story.content.body?.map((blok: any, idx: number) => (
        <StoryblokComponent blok={blok} key={idx} />
      ))}

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
