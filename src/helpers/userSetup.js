const path = require("path");
const matter = require("gray-matter");
const fs = require("fs");

function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}

function userEleventySetup(eleventyConfig) {
  // Define the 'note' collection
  eleventyConfig.addCollection("note", function (collectionApi) {
    const notesDir = path.resolve("src/site/notes");
    console.log(`Scanning notes directory: ${notesDir}`);

    const collection = collectionApi.getFilteredByGlob("src/site/notes/**/*.md")
      .filter((item) => {
        try {
          const fileContent = fs.readFileSync(item.inputPath, "utf8");
          const frontMatter = matter(fileContent);
          return frontMatter.data["dg-publish"] === true; // dg-publish: true인 파일만 포함
        } catch (e) {
          console.warn(`Error reading front matter for ${item.inputPath}: ${e.message}`);
          return false;
        }
      })
      .map((item, index) => {
        if (index === 0) { // 첫 파일만 로깅
          console.log(`Sample note: ${item.url}, filePath: ${item.inputPath}`);
        }
        return item;
      });

    console.log(`Found ${collection.length} publishable markdown files`);
    if (collection.length === 0) {
      console.warn("No publishable notes found in src/site/notes/**/*.md");
    }
    return collection;
  });
}

exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
