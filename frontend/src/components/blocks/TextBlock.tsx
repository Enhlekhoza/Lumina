// src/components/blocks/TextBlock.tsx
interface TextBlockProps {
  blok: any;
}

const TextBlock = ({ blok }: TextBlockProps) => {
  return (
    <div className="prose mb-6">
      {blok.title && <h3>{blok.title}</h3>}

      {/* Rich text / HTML content */}
      {blok.text && (
        <div dangerouslySetInnerHTML={{ __html: blok.text }} />
      )}

      {/* Render image if provided */}
      {blok.image && (
        <img
          src={blok.image.filename || blok.image}
          alt={blok.image.alt || ""}
          className="my-4 rounded-lg"
        />
      )}
    </div>
  );
};

export default TextBlock;