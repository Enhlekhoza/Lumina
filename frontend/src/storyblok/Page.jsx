import React from "react";
import { StoryblokComponent } from "@storyblok/react";

const Page = ({ blok }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {blok.Body &&
        blok.Body.map((nestedBlok) => (
          <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
        ))}
    </div>
  );
};

export default Page;