import React from "react";
import { useLocation } from "react-router-dom";
import { StoryblokComponent, useStoryblokBridge } from "@storyblok/react";

const Story = ({ story }) => {
  useStoryblokBridge(story, (updatedStory) => {
    story = updatedStory;
  });

  return <StoryblokComponent blok={story.content} />;
};

const App = () => {
  const location = useLocation();
  const slug = location.pathname === "/" ? "home" : location.pathname.slice(1);
  const [story, setStory] = React.useState(null);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;
      try {
        const res = await fetch(
          `https://api.storyblok.com/v2/cdn/stories/${slug}?version=${import.meta.env.VITE_STORYBLOK_VERSION}&token=${import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN}`
        );
        const data = await res.json();
        if (data.story) {
          setStory(data.story);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Storyblok fetch error:", err);
        setError(true);
      }
    };
    fetchStory();
  }, [slug]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        404 - Story not found
      </div>
    );

  if (!story)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return <Story story={story} />;
};

export default App;