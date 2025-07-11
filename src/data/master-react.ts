import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHTML } from "@/data/blog";

export async function getMasterReactPosts() {
  const dir = path.join(process.cwd(), "content", "master-react");
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) => {
      const slug = path.basename(file, ".mdx");
      const filePath = path.join(dir, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { content: rawContent, data: metadata } = matter(source);
      const content = await markdownToHTML(rawContent);
      return {
        source: content,
        metadata,
        slug,
      };
    }),
  );
}
