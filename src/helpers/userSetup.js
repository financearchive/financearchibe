const fs = require("fs");
const path = require("path");

function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}

function userEleventySetup(eleventyConfig) {
  // Define the 'note' collection
  eleventyConfig.addCollection("note", function (collectionApi) {
    const notesDir = path.resolve("src/site/notes");
    console.log(`Scanning notes directory: ${notesDir}`);
    
    // Verify directory exists
    if (!fs.existsSync(notesDir)) {
      console.error(`Notes directory does not exist: ${notesDir}`);
      return [];
    }

    const files = fs.readdirSync(notesDir, { recursive: true, withFileTypes: true })
      .filter(file => file.isFile() && file.name.endsWith(".md"))
      .map(file => path.join(file.parentPath, file.name));
    console.log(`Found ${files.length} markdown files:`, files);

    const collection = collectionApi.getFilteredByGlob("src/site/notes/**/*.md").map((item) => {
      console.log(`Processing note: ${item.url}, filePath: ${item.inputPath}`);
      return item;
    });

    if (collection.length === 0) {
      console.warn("No notes found in src/site/notes/**/*.md");
    }
    return collection;
  });
}

exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
