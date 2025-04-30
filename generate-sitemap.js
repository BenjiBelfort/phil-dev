import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const baseUrl = "https://www.bullet-art.com";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesJsonPath = path.join(__dirname, "src/data/images.json");
const images = JSON.parse(fs.readFileSync(imagesJsonPath, "utf-8"));

const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/</loc>
`;

const xmlFooter = `  </url>\n</urlset>`;

const imageXml = images.map(img => {
  return `    <image:image>
      <image:loc>${baseUrl}${img.path}</image:loc>
      <image:caption>${img.alt}</image:caption>
      <image:title>${img.alt}</image:title>
    </image:image>`;
}).join("\n");

const fullXml = xmlHeader + imageXml + "\n" + xmlFooter;

console.log("📄 XML généré :\n", fullXml);

fs.writeFileSync(path.join(__dirname, "dist/sitemap-images.xml"), fullXml);
console.log("✅ sitemap-images.xml généré !");
