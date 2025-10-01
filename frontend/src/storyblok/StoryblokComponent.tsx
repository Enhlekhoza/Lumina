// src/storyblok/StoryblokComponent.tsx
import React from "react";
import { richTextResolver } from "@storyblok/richtext";
import sanitizeHtml from "sanitize-html";

// Import other block components here if needed
// import CTA from "@/components/blocks/CTA";

interface StoryblokComponentProps {
  blok: any;
}

const StoryblokComponent: React.FC<StoryblokComponentProps> = ({ blok }) => {
  if (!blok) return null;

  switch (blok.component) {
    // Handle Rich Text / Text Block
    case "text_block":
      if (!blok.content) return null;
      const html = richTextResolver().render(blok.content);
      const sanitizedHtml = sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "title"],
          a: ["href", "target", "rel"],
        },
      });
      return <div className="prose mb-6" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;

    // Example for other components
    // case "cta":
    //   return <CTA blok={blok} />;

    default:
      return null;
  }
};

export default StoryblokComponent;