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

  // Trim slashes to prevent /// in URL
  const slug = rawSlug?.trim().replace(/^\/+|\/+$/g, "");

  useEffect(() => {
    // Prevent fetching if the slug isn't ready
    if (!slug) {
      setLoading(false);
      return;
    }

    const token = version === "published"
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
const createMockupStory = (slug: string): StoryblokStory => {
  const title = slug.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Untitled Article";
  const loremIpsum = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p><p>Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede.</p><h3>Key Takeaways</h3><ul><li>Cras elementum ultrices diam.</li><li>Duis semper. Duis arcu massa, scelerisque vitae.</li><li>Ut in risus volutpat libero pharetra tempor.</li></ul><p>Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Proin sed enim sed nisi mollis accumsan.</p>";

  return {
    name: title,
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString(),
    id: 0,
    uuid: `mockup-${slug}`,
    slug,
    full_slug: slug,
    content: {
      component: "article",
      title: title,
      author: "Dr. Alex Chen",
      category: "Deep Dive",
      reading_time: "8 min",
      summary: "This is a detailed exploration of the key concepts and practical applications related to this topic.",
      body: [{ component: "text_block", content: loremIpsum }],
    },
  };
};

// ... (inside useStoryblok hook)
      } catch (err: any) {
        const is404 = err.message?.includes("404") || err.response?.status === 404;
        if (is404 && slug) {
          const mockupStory = createMockupStory(slug);
          setStory(mockupStory);
          setStoryJson(JSON.stringify(mockupStory, null, 2));
        } else {
          setError(err instanceof Error ? err : new Error("Unknown error fetching Storyblok story."));
          setStory(null);
          setStoryJson(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug, version]);

  return { story, storyJson, loading, error };
};

export default useStoryblok;