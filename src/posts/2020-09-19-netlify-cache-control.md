---
title: Curb your Netlify's Cache Control
date: 2020-09-19
draft: false
---

{% intro "md" %}

Since [Netlify](https://netlify.com/) doesn't deal with .htaccess files, you need special instructions to tune caching options.

{% endintro %}

I recently moved to self-hosting my webfonts for my personal site and encountered, that Chrome for Desktop would no longer cache webfont files even between subsequent page navigation.

Turned out Netflify [applies custom caching rules in their CDN](https://www.netlify.com/blog/2017/02/23/better-living-through-caching/).

They apparently set `cache-control: max-age=0` for most files but also keep possibility of caching without further configuration.

If you want to control the caching by yourself to can set some [Header Rules](https://docs.netlify.com/routing/headers/):

## Example 1:

Via netlify.toml file in Repo Root

```toml
[[headers]]
  for = "*.woff2"
  [headers.values]
    Cache-Control = "public, max-age=604800"
[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=604800"

```

## Example 2

Via \_headers file in published public directory

```text
/*.woff2
  Cache-Control: max-age=604800, public
/*.js
  Cache-Control: max-age=604800, public

```

More extensive examples:

- [netlify.toml examples](https://docs.netlify.com/configure-builds/file-based-configuration/#sample-file) (Netlify Docs)

- [\_headers examples (Robsons Gist)](https://gist.github.com/robsonsobral/5b8d1ff10a10dd35793a768f8531cc18)
