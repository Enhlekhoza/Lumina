// src/storyblok.ts
import { storyblokInit, apiPlugin, StoryblokComponent } from "@storyblok/react";
import TextBlock from "@/components/blocks/TextBlock";
import CtaBlock from "@/components/blocks/CtaBlock";

export const components = {
  "text_block": TextBlock,
  "cta_block": CtaBlock,
};

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components,
});

export { StoryblokComponent };