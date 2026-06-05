type LegalDocumentProps = {
  title: string;
  body: string;
};

type LegalBlock =
  | { type: "chapter" | "article" | "paragraph"; text: string }
  | { type: "list"; items: string[] };

const chapterPattern = /^第\s*\d+\s*章/;
const articlePattern = /^第\s*\d+\s*条/;

function normalizeLegalLine(line: string) {
  return line.replace(/\uFEFF/g, "").replace(/\s+/g, " ").trim();
}

function parseLegalBody(body: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: "list", items: currentList });
      currentList = [];
    }
  };

  for (const rawLine of body.split(/\r?\n/)) {
    const line = normalizeLegalLine(rawLine);

    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("・")) {
      currentList.push(line.replace(/^・\s*/, ""));
      continue;
    }

    flushList();

    if (chapterPattern.test(line) || line === "付則") {
      blocks.push({ type: "chapter", text: line });
      continue;
    }

    if (articlePattern.test(line)) {
      blocks.push({ type: "article", text: line });
      continue;
    }

    blocks.push({ type: "paragraph", text: line });
  }

  flushList();

  return blocks;
}

export function LegalDocument({ title, body }: LegalDocumentProps) {
  const blocks = parseLegalBody(body);

  return (
    <article className="space-y-5">
      <h1 className="mb-8 text-3xl font-bold tracking-normal md:text-4xl">
        {title}
      </h1>

      <div className="space-y-4 text-sm leading-8 text-muted-foreground md:text-base">
        {blocks.map((block, index) => {
          if (block.type === "chapter") {
            return (
              <h2
                key={`${block.type}-${index}`}
                className="pt-8 text-xl font-bold text-foreground md:text-2xl"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "article") {
            return (
              <h3
                key={`${block.type}-${index}`}
                className="pt-5 text-lg font-bold text-foreground"
              >
                {block.text}
              </h3>
            );
          }

          if (block.type === "list") {
            return (
              <ul
                key={`${block.type}-${index}`}
                className="space-y-2 pl-5"
              >
                {block.items.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          return <p key={`${block.type}-${index}`}>{block.text}</p>;
        })}
      </div>
    </article>
  );
}
