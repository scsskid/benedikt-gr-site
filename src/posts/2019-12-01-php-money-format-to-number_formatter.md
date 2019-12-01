---
title: PHP 7.4 money_format() To NumberFormatter Class
date: 2019-12-01
draft: false
---


{% intro "md" %}

_money_format()_ is deprecated starting with PHP 7.4. Use NumberFormatter Class instead.

{% endintro %}

I recently switched to an new machine 🔥, so I installed my local dev environment again. Brew provided 7.4, so I ran into a deprecation Error in an older poject.

The solution is fairly simple:

Rewrite the `money_format` function

```php
setlocale( LC_MONETARY, 'de_DE.UTF-8' );
$amount = money_format( '%!n €', 2499 );

return $amount;
// 2.499,00 €
```

to the `NumberFormatter` Class

```php
$amount = new \NumberFormatter( 'de_DE', \NumberFormatter::CURRENCY );

return $amount->format( 2499 );
// 2.499,00 €
```
Addionally I needed to maintain the amount's display without decimals so I had to rewrite

```php
setlocale( LC_MONETARY, 'de_DE.UTF-8' );
$amount = money_format( '%!n €', 2499 );

return preg_replace( '/[,]00/', '', strval( $amount ) );
// 2.499 €
```
to

```php
$amount = new \NumberFormatter( 'de_DE', \NumberFormatter::CURRENCY );
$amount->setAttribute( \NumberFormatter::MAX_FRACTION_DIGITS, 0 ) ;

return $amount->format(2499);
// 2.499 €
```