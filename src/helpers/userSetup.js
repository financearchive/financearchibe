const path = require("path");
const matter = require("gray-matter");
const fs = require("fs");

function userMarkdownSetup(md) {
  // Markdown-it plugins can be added here if needed
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
          return frontMatter.data["dg-publish"] === true; // Only include dg-publish: true
        } catch (e) {
          console.warn(`Error reading front matter for ${item.inputPath}: ${e.message}`);
          return false;
        }
      })
      .map((item, index) => {
        if (index === 0) { // Log only the first file
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
