function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}

function userEleventySetup(eleventyConfig) {
  // Define the 'note' collection
  eleventyConfig.addCollection("note", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/site/notes/**/*.md").map((item) => {
      console.log(`Processing note: ${item.url}, filePath: ${item.inputPath}`);
      return item;
    });
  });
}

exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
