import React from "react";
import { StoryblokComponent } from "@storyblok/react";

const Grid = ({ blok }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {blok.columns &&
        blok.columns.map((nestedBlok) => (
          <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
        ))}
    </div>
  );
};

export default Grid;