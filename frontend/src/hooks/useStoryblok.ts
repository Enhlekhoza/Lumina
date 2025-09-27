import { useState, useEffect } from "react";
import StoryblokClient, { StoryblokStory } from "storyblok-js-client";

interface UseStoryblokOptions {
  version: "draft" | "published";
}

const useStoryblok = (slug: string, options: UseStoryblokOptions) => {
  const [story, setStory] = useState<StoryblokStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const token = import.meta.env.VITE_STORYBLOK_CDN_TOKEN;

    if (!token) {
      setError(new Error("Storyblok CDN token not found in .env"));
      setLoading(false);
      return;
    }

    const client = new StoryblokClient({
      accessToken: token,
    });

    const fetchStory = async () => {
      setLoading(true);
      try {
        const { data } = await client.get(`cdn/stories/${slug}`, {
          version: options.version,
        });
        setStory(data.story);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug, options.version]);

  return { story, loading, error };
};

export default useStoryblok;