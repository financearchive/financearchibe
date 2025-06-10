const { getGraph } = require("../../helpers/linkUtils");
const { getFileTree } = require("../../helpers/filetreeUtils");
const { userComputed } = require("../../helpers/userUtils");

module.exports = {
  graph: async (data) => await getGraph(data),
  filetree: async (data) => await getFileTree(data),
  userComputed: async (data) => await userComputed(data),
};
