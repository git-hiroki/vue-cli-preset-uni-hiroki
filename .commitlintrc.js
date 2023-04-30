module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "long-chinese": [2, "always"]
  },
  plugins: [
    {
      rules: {
        "long-chinese": ({ raw }) => [
          /[\u4e00-\u9fa5]{6,}/g.test(raw),
          "请勿敷衍提交, 应当详细描述你的提交信息, 它将体现为 CHANGELOG 的一部分"
        ]
      }
    }
  ]
};