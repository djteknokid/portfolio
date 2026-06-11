interface Props {
  image: string;
  alt: string;
  caption?: string;
  children: React.ReactNode;
}

export default function SlideRow({ image, alt, caption, children }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: "var(--sp-6)",
        alignItems: "start",
        maxWidth: "1100px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "var(--sp-4)",
      }}
    >
      <div>{children}</div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingTop: "4px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          style={{
            width: "100%",
            display: "block",
            borderRadius: "4px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            background: "#ffffff",
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
              margin: 0,
            }}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
