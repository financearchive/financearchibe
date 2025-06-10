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

    const collection = collectionApi.getFilteredByGlob("src/site/notes/**/*.md").map((item, index) => {
      if (index < 10) { // 처음 10개 파일만 로깅
        console.log(`Processing note: ${item.url}, filePath: ${item.inputPath}`);
      }
      return item;
    });

    console.log(`Found ${collection.length} markdown files`);
    if (collection.length === 0) {
      console.warn("No notes found in src/site/notes/**/*.md");
    }
    return collection;
  });
}

exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
