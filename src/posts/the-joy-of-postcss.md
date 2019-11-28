---
title: The Joy Of postCSS
date: '2019-11-19'
draft: false
---
{% intro "md" %}

It has been more that a year that I started a new project with SASS for preprocessing my css. At one time I wanted to try how far you can take it with vanilla modern CSS these days. 

{% endintro %}

My experience: Pretty far, but then there are real world problems like backwards compatibility.

I used to love SASS.  I think it pushed the standards teams and browser vendors to implement new features like _custom properties_ or _css grid_ more rapidly.

I like the philosphy of postCSS to honor the w3c specicifications and to encourage you to write standard css syntax, even if the specific syntaxes are an early stage and are maybe going to be only implemented in nightly browser builds for now.


```css
@custom-media --viewport-medium (width <= 50rem);
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

:root {
  --mainColor: #12345678;
}

body {
  color: var(--mainColor);
  font-family: system-ui;
  overflow-wrap: break-word;
}

:--heading {
  background-image: image-set(url(img/heading.png) 1x, url(img/heading@2x.png) 2x);

  @media (--viewport-medium) {
    margin-block: 0;
  }
}

a {
  color: rgb(0 0 100% / 90%);

  &:hover {
    color: rebeccapurple;
  }
}
```
<small>Source: [https://github.com/csstools/postcss-preset-env](https://github.com/csstools/postcss-preset-env)</small>

It's a similar approach like writing modern javascript for the browser.

Like [@babel/preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html), there is a [postcss-preset-env](https://github.com/csstools/postcss-preset-env), which convieniently lets you polyfill missing css browser features, without having to put too much though into which single features you want to use. You also can use a [browserslist](https://github.com/browserslist/browserslist) query to let postcss-preset-env figure out how to transform the css for backwards compatibility.

Maybe it's old news for you, but it came to me as a surprise: The code above is actually modern css as intended by the [CSS Working Group](https://www.w3.org/Style/CSS/members.en).

