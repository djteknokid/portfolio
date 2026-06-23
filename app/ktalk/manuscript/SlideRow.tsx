interface Props {
  image: string;
  alt: string;
  caption?: string;
  children: React.ReactNode;
}

export default function SlideRow({ image, alt, caption, children }: Props) {
  return (
    <div style={{ maxWidth: "680px", marginLeft: "auto", marginRight: "auto", marginBottom: "var(--sp-6)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        style={{
          width: "100%",
          display: "block",
          borderRadius: "6px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          background: "#ffffff",
          marginBottom: caption ? "10px" : "var(--sp-5)",
        }}
      />
      {caption && (
        <p
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            color: "var(--ink-muted)",
            lineHeight: 1.5,
            letterSpacing: "0.01em",
            margin: "0 0 var(--sp-5)",
          }}
        >
          {caption}
        </p>
      )}
      <div>{children}</div>
    </div>
  );
}
