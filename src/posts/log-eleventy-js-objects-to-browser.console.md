---
title: Log eleventy.js objects to browser console
date: 2019-10-15 19:00:00
draft: true
---

```
  // .eleventy.js
  eleventyConfig.addFilter('console', function(value) {
    const output = stringify(value, null, '\t', { maxDepth: 2 })
    return `<script>console.log(${output})</script>`
  })

```

example usage in a nunjucks template (*.njk)
```
{{ post | console | safe }}
```

