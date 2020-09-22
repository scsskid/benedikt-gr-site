---
title: Improve *.local DNS Lookup Time On Mac
date: 2019-12-08
draft: false
---

{% intro %}

If you experience slow host resolving for \*.local domains you can set an IPv6 entry in your `/etc/hosts`.

{% endintro %}

Initial page load is really slow, when using \*.local domains if only an entry for IPv4 is set.

I usually use [automatic vhosts resolving](https://www.sitepoint.com/set-automatic-virtual-hosts-nginx-apache/) with `*.local.benedikt.gr` resolving to directories in my `~/www/*`, but I ran into problems when using subdomain based Worpress Multisite installations, so I created explicit hosts entries like `*.local` and `de.*.local`.

But initial page load was really slow, being stuck at resolving the host. Setting IPv6 entries (`::1`) solved this issue.

All credits go to [Peter Bengtsson](https://twitter.com/peterbe) who figured this out. Not much explanation is given in [his article](https://www.peterbe.com/plog/make-.local-domains-not-slow-in-macos), but MacOS bonjour could be the reason, since Macs use the \*.local for connecting machines in you local network.
