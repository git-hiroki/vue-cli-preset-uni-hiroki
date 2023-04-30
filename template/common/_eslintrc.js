/**
 * @desc ESLint 配置文件
 * @see https://eslint.org/docs/user-guide/configuring
 * @see https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
 * 🚨 禁止非经授权改动此规则文件, 编码时请严格遵循规范, 否则打回处理
 * @author Hiroki
 * @version 2.0.0
 */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    uni: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
    plus: true,
    ROUTES: true
  },
  extends: [
    "plugin:vue/strongly-recommended",
    "eslint:recommended"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false
    },
    allowImportExportEverywhere: true
  },
  rules: {
    // ---------- Possible Errors 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
    ... {
      // 阻止出现console调用
      "no-console": [
        "warn",
        {
          // 排除warn 和error
          allow: ["warn", "error"]
        }
      ],
      // 生产环境禁用 debugger
      "no-debugger": "production" === process.env.NODE_ENV ? "warn" : "off",
      // 不要使用不必要的括号
      "no-extra-parens": "error",
      // 避免在常规字符串中出现模板字面量占位符语法
      "no-template-curly-in-string": "error"
    },
    // ---------- Best Practices 这些规则是关于最佳实践的, 帮助你避免一些问题
    ... {
      // 强制getter和setter在对象中成对出现
      "accessor-pairs": "error",
      // 指定程序中允许的最大环路复杂度
      "complexity": ["error", 7],
      // 要求遵循大括号约定
      "curly": "error",
      // 强制在点号之前或之后换行
      "dot-location": ["error", "property"],
      // 强制尽可能地使用点号
      "dot-notation": "error",
      // 禁用 Alert、Confirm 和 Prompt
      "no-alert": "error",
      // 禁止出现空函数
      "no-empty-function": "warn",
      // 不要使用空的解构模式
      "no-empty-pattern": "error",
      // 禁止直接调用eval
      "no-eval": [
        "error",
        { allowIndirect: true }
      ],
      // 禁止扩展原生类型
      "no-extend-native": "error",
      // 禁止在全局范围使用变量和函数声明
      "no-implicit-globals": "error",
      // 禁止 this 关键字在类或类对象之外出现
      "no-invalid-this": "error",
      // 禁用迭代器
      "no-iterator": "error",
      // 消除脚本顶部或其它块中不必要的和潜在的令人困惑的代码块
      "no-lone-blocks": "error",
      // 除了缩进, 不要使用多个空格
      "no-multi-spaces": "error",
      // 禁止使用 new 关键字调用构造函数但却不将结果赋值给一个变量来保持一致性和约定
      "no-new": "error",
      // 禁用包装实例
      "no-new-wrappers": "error",
      // 禁止在返回语句中赋值
      "no-return-assign": "error",
      // 禁用不必要的 return await
      "no-return-await": "error",
      // 禁用 Script URL
      "no-script-url": "error",
      // 避免将变量与自己进行比较操作
      "no-self-compare": "error",
      // 限制可以被抛出的异常
      "no-throw-literal": "error",
      // 禁用一成不变的循环条件
      "no-unmodified-loop-condition": "error",
      // 禁用不必要的 .call() 和 .apply()
      "no-useless-call": "error",
      // 不禁用不必要的转义字符
      "no-useless-escape": "off",
      // 对不包含 await 表达式的 async 函数发出警告
      "require-await": "error",
      // 要求将变量声明放在它们作用域的顶部
      "vars-on-top": "error",
      // 强制Yoda条件
      "yoda": [
        "error",
        "always",
        { onlyEquality: true }
      ]
    },
    // ---------- Strict Mode 该规则与使用严格模式和严格模式指令有关
    ... {},
    // ---------- Variables 这些规则与变量声明有关
    ... {
      // 禁用特定的全局变量
      "no-restricted-globals": "error",
      // 检测变量未定义
      "no-undef": [
        "error",
        { typeof: true }
      ],
      // 不允许初始化变量值为 undefined
      "no-undef-init": "error",
      // 允许未使用过的变量
      "no-unused-vars": "off"
    },
    // ---------- Node.js and CommonJS 这些规则是关于Node.js 或 在浏览器中使用CommonJS 的
    ... {},
    // ---------- Stylistic Issues 这些规则是关于风格指南的, 而且是非常主观的
    ... {
      // 保持数组开括号后和闭括号前换行一致性
      "array-bracket-newline": ["error", "consistent"],
      // 保持数组元素间换行一致性
      "array-element-newline": ["error", "consistent"],
      // 禁止或强制在代码块中开括号前和闭括号后有空格
      "block-spacing": "error",
      // 大括号风格与缩进风格 使用Stroustrup风格 禁止写到一行里
      "brace-style": [
        "error", "stroustrup", { allowSingleLine: false }
      ],
      // 不允许有多余的行末逗号
      "comma-dangle": "error",
      // 逗号前无空格 逗号后空格
      "comma-spacing": [
        "error",
        { before: false, after: true }
      ],
      // 始终将逗号置于行末
      "comma-style": "error",
      // 禁止在计算属性中使用空格
      "computed-property-spacing": "error",
      // 禁止文件末尾保留一行空行
      "eol-last": ["warn", "never"],
      // 禁止在函数标识符和其调用之间有空格
      "func-call-spacing": ["error", "never"],
      // 要求函数名与赋值给它们的变量名或属性名相匹配
      "func-name-matching": "error",
      // 强制在函数括号内使用一致的换行
      "function-paren-newline": ["error", "multiline-arguments"],
      // 强制隐式返回的箭头函数体的位置
      "implicit-arrow-linebreak": ["error", "beside"],
      // 强制使用一致的缩进风格
      "indent": ["error", 2, { SwitchCase: 1 }],
      // 强制在 JSX 属性中使用一致的单引号
      "jsx-quotes": ["error", "prefer-single"],
      // 键值对当中冒号与值之间要留空白
      "key-spacing": "error",
      // 强制关键字周围空格的一致性
      "keyword-spacing": [
        "warn",
        {
          before: true,
          after: true,
          overrides: {
            catch: { before: false, after: false },
            for: { before: false, after: false },
            if: { before: false, after: false },
            switch: { before: false, after: false },
            while: { before: false, after: false }
          }
        }
      ],
      // 强制使用一致的换行符风格
      "linebreak-style": ["error", "unix"],
      // 禁止在类成员之间出现空行
      "lines-between-class-members": ["error", "never"],
      // 强制块语句的最大可嵌套深度
      "max-depth": ["error", 5],
      // 限制最大列数
      "max-len": [
        "error",
        {
          code: 200,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true
        }
      ],
      // 限制最大行数
      "max-lines": [
        "warn",
        {
          max: 800,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      // 强制函数最大行数
      "max-lines-per-function": [
        "error",
        {
          max: 50,
          skipBlankLines: true,
          skipComments: true
        }
      ],
      // 强制回调函数最大嵌套深度
      "max-nested-callbacks": "error",
      // 限制函数定义中最大参数个数
      "max-params": "error",
      // 强制每一行中所允许的最大语句数量
      "max-statements-per-line": "error",
      // 要求调用无参构造函数时带括号
      "new-parens": "error",
      // 禁止使用 Array 构造函数
      "no-array-constructor": "error",
      // 禁止使用按位操作符
      "no-bitwise": "error",
      // 禁用 continue
      "no-continue": "error",
      // 禁止连续赋值
      "no-multi-assign": "error",
      // 最大空行数
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 1
        }
      ],
      // 禁用tab
      "no-tabs": "error",
      // 行末不留空格
      "no-trailing-spaces": "error",
      // 如果有更好的实现, 尽量不要使用三元表达式
      "no-unneeded-ternary": "error",
      // 属性前面不要加空格
      "no-whitespace-before-property": "error",
      // 强制在大括号中使用一致的空格
      "object-curly-spacing": ["error", "always"],
      // 每个作用域允许出现多个变量声明, 但对连续的变量声明要求合并为单个声明
      "one-var": ["error", "consecutive"],
      // 强制操作符使用一致的换行符风格
      "operator-linebreak": "error",
      // 代码块中避免多余留白
      "padded-blocks": ["error", "never"],
      // 禁止使用以对象字面量作为第一个参数的 Object.assign, 优先使用对象扩展
      "prefer-object-spread": "error",
      // 如果有属性名称要求使用引号, 则所有的属性名称都要使用引号;否则, 禁止所有的属性名称使用引号
      "quote-props": [
        "error",
        "consistent-as-needed"
      ],
      // 强制使用一致的双引号
      "quotes": [ "error", "double"],
      // 不使用自动分号插入 (ASI),强制使用一致的分号
      "semi": [
        "error",
        "always"
      ],
      // 强制分号后有空格
      "semi-spacing": [
        "error",
        {
          before: false,
          after: true
        }
      ],
      // 强制分号的位置
      "semi-style": ["error", "last"],
      // 要求对象属性按序排列 (临时使用)
      // "sort-keys": "warn",
      // 块前面不留空格
      "space-before-blocks": ["error", "never"],
      // 禁止函数圆括号之前有一个空格
      "space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          named: "never",
          asyncArrow: "always"
        }
      ],
      // 圆括号内不留空格
      "space-in-parens": "error",
      // 操作符前后空格
      "space-infix-ops": "error",
      // 要求或禁止在一元操作符之前或之后存在空格
      "space-unary-ops": [
        "error",
        {
          words: true,
          nonwords: false,
          overrides: { void: false }
        }
      ],
      // 要求在注释前有空白
      "spaced-comment": "warn",
      // 强制在 switch 的冒号左右有空格
      "switch-colon-spacing": "error",
      // 要求或禁止在模板标记和它们的字面量之间有空格
      "template-tag-spacing": ["error", "always"],
      // 禁止BOM头
      "unicode-bom": "error"
    },
    // ---------- ECMAScript 6 这些规则只与 ES6 有关, 即通常所说的 ES2015
    ... {
      // 要求箭头函数体只在需要的时候使用大括号
      "arrow-body-style": ["error", "as-needed"],
      // 强制省略只有一个参数的箭头函数括号
      "arrow-parens": ["error", "as-needed"],
      // 要求箭头函数的箭头前后有空格
      "arrow-spacing": "error",
      // 同一模块有多个导入时一次性写完
      "no-duplicate-imports": "error",
      // 禁止在对象中使用不必要的计算属性
      "no-useless-computed-key": "error",
      // import, export 和解构操作中, 禁止赋值到同名变量
      "no-useless-rename": "error",
      // 阻止 var 的使用,推荐使用 const 或 let
      "no-var": "error",
      // 要求对象字面量简写语法
      "object-shorthand": "error",
      // 要求回调函数使用箭头函数
      "prefer-arrow-callback": "error",
      // 要求使用 const 声明那些声明后不再被修改的变量
      "prefer-const": [
        "error",
        {
          destructuring: "all",
          ignoreReadBeforeAssign: true
        }
      ],
      // 建议使用剩余参数(...rest)代替 arguments
      "prefer-rest-params": "error",
      // 建议使用扩展语法而非.apply()
      "prefer-spread": "error",
      // 建议使用模板字面量而非字符串连接
      "prefer-template": "error",
      // 强制剩余和扩展运算符及其表达式之间有空格
      "rest-spread-spacing": ["error", "always"],
      // import 排序 默认规则
      "sort-imports": [
        "error", {
          // 不忽略 import 语句本地名称的大小写
          ignoreCase: false,
          // 忽略 import 声明语句的排序
          ignoreDeclarationSort: true,
          // 不忽略有多个成员的 import 声明的排序
          ignoreMemberSort: false,
          memberSyntaxSortOrder: [
            // import 没有输出绑定的模块
            "none",
            // import 所有经输出绑定的成员
            "all",
            // import 多个成员
            "multiple",
            // import 单个成员
            "single"
          ]
        }
      ],
      // 要求 symbol 描述
      "symbol-description": "error",
      // 模板字符串中变量前后不加空格
      "template-curly-spacing": "error",
      // 强制在 yield* 表达式中 * 前使用空格
      "yield-star-spacing": [
        "error", { before: true, after: false }
      ]
    },
    // ---------- eslint-plugin-vue Vue.js的官方ESLint插件规则
    ... {
      // 在插值中强制实施统一间距
      "vue/mustache-interpolation-spacing": ["warn", "never"],
      // 关闭props强制默认值
      "vue/require-default-prop": "off",
      // 闭合单标签
      "vue/html-self-closing": "off"
    }
  }
};