---
title: The joy postCSS
date: '2019-11-19'
draft: false
---
I used to love SASS (because of it I choose my suername: scsskid) and I think it pushed the standards teams and browser vendors to implement new features like custom porperties more rapidly.

It has been more that a year that I started a new project with SASS for preprocessing my css.



I like the philosphy of postCSS to look at the specicification and encourages you to write standard css syntax, even if it's in an early stage and maybe only impemented in nightly browser builds.

It's a similar approach like babel.js just for css.

Like babel-preset-env, there is a postcss-preset-env, which convieniently lets you polyfill missing css browser features.

Maybe it's old news for you, but it came to as a surpirse but this is actually modern css as intended by the [CSS Working Group](https://www.w3.org/Style/CSS/members.en):


```
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