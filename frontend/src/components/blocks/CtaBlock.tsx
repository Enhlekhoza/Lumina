// src/components/blocks/CtaBlock.tsx
import { Button } from "@/components/ui/button";

interface CtaBlockProps {
  blok: any;
}

const CtaBlock = ({ blok }: CtaBlockProps) => {
  const handleClick = () => {
    if (blok.url) window.location.href = blok.url;
  };

  return (
    <div className="my-6">
      <Button
        onClick={handleClick}
        className={blok.style === "primary" ? "bg-blue-600 text-white" : ""}
      >
        {blok.label || "Click Here"}
      </Button>
    </div>
  );
};

export default CtaBlock;