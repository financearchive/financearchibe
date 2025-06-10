module.exports = {
  eleventyComputed: {
    graph: async function() {
      const nodes = {};
      const templates = this.templates; // 또는 eleventy.getTemplates()와 같은 방법으로 템플릿 가져오기
      for (const template of templates) {
        const content = await template.read();
        // 내용 처리 (예: 노드 생성 등)
      }
      // 계산된 그래프 반환
      return { graph: nodes };
    }
  }
};
