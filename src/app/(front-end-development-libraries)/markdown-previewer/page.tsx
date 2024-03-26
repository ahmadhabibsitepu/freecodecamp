"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const initialMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

declare const marked: any;

const createHtml = (raw: string) => {
  const option = { gfm: true, breaks: true };

  const html = marked.parse(raw, option);

  return html;
};

export default function Home() {
  const [markdown, setMarkdown] = useState({ raw: "", html: "" });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);

    const markdown = createHtml(event.target.value);
    setMarkdown({ raw: event.target.value, html: markdown });
  };

  useEffect(() => {
    setMarkdown({
      raw: initialMarkdown,
      html: createHtml(initialMarkdown),
    });
  }, []);

  return (
    <>
      <main className="flex h-screen justify-center p-8">
        <div className="flex h-full w-full max-w-prose flex-col gap-8">
          <Textarea
            id="editor"
            className="h-1/2"
            onChange={handleChange}
            value={markdown.raw}
          ></Textarea>
          <Card
            className="prose prose-zinc h-1/2 w-full overflow-y-scroll p-2"
            id="preview"
            dangerouslySetInnerHTML={{ __html: markdown.html }}
          />
        </div>
      </main>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.1/marked.min.js"
        integrity="sha512-pSeTnZAQF/RHxb0ysMoYQI/BRZsa5XuklcrgFfU3YZIdnD3LvkkqzrIeHxzFi6gKtI8Cpq2DEWdZjMTcNVhUYA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        defer
      />
    </>
  );
}
