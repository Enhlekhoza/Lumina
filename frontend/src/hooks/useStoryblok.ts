// src/hooks/useStoryblok.ts
import { useState, useEffect } from "react";
import StoryblokClient, { StoryblokStory } from "storyblok-js-client";

interface UseStoryblokOptions {
  version?: "draft" | "published";
}

interface UseStoryblokReturn {
  story: StoryblokStory | null;
  storyJson: string | null;
  loading: boolean;
  error: Error | null;
}

const useStoryblok = (rawSlug?: string, options: UseStoryblokOptions = {}): UseStoryblokReturn => {
  const [story, setStory] = useState<StoryblokStory | null>(null);
  const [storyJson, setStoryJson] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const version = options.version || import.meta.env.VITE_STORYBLOK_VERSION || "draft";
  const slug = rawSlug?.split("?")[0]?.trim().replace(/\/$/, "");

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError(new Error("No valid slug provided."));
      return;
    }

    const token =
      version === "published"
        ? import.meta.env.VITE_STORYBLOK_PUBLIC_TOKEN
        : import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN;

    if (!token) {
      setError(new Error(`Storyblok token not found for ${version} version.`));
      setLoading(false);
      return;
    }

    const client = new StoryblokClient({ accessToken: token });

    const fetchStory = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await client.get(`cdn/stories/${slug}`, { version });

        if (!data.story) {
          const placeholder: StoryblokStory = {
            name: slug,
            created_at: new Date().toISOString(),
            published_at: null,
            id: 0,
            uuid: "placeholder",
            slug,
            full_slug: slug,
            content: { component: "placeholder", title: "Missing story", body: [] },
          };
          setStory(placeholder);
          setStoryJson(JSON.stringify(placeholder, null, 2));
        } else {
          setStory(data.story);
          setStoryJson(JSON.stringify(data.story, null, 2));
        }
      } catch (err: any) {
        setError(err instanceof Error ? err : new Error("Unknown error fetching Storyblok story."));
        setStory(null);
        setStoryJson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug, version]);

  return { story, storyJson, loading, error };
};

export default useStoryblok;