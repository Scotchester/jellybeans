---
lolwut?: Jekyll requires some front matter to process variables from _config.yml
---

importScripts( '{{ site.url }}/cache-polyfill.js' );

var filesToCache = [

  // root
  '{{ site.url }}/',
  '{{ site.url }}/index.html',

  // css
  '{{ site.url }}/assets/css/main.css',
  '{{ site.url }}/assets/css/normalize.css',
  '{{ site.url }}/assets/css/syntax.css',

  // images
  '{{ site.url }}/static/img/hug.jpg',

  // pages
  {% for page in site.pages %}'{{ site.url }}{{ page.url }}',
  {% endfor %}

  // posts
  {% for post in site.posts %}'{{ site.url }}{{ post.url }}',
  {% endfor %}

];

self.addEventListener( 'install', function( e ) {
  e.waitUntil(
    caches.open( '{{ site.cache_name }}' )
      .then( function( cache ) {
        return cache.addAll( filesToCache );
    })
  );
});

self.addEventListener( 'fetch', function( event ) {
  event.respondWith(
    caches.match( event.request ).then( function( response ) {
      return response || fetch( event.request );
    })
  );
});
