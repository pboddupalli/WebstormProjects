'use strict';

import fetch from 'node-fetch'

/*
 * fetchUrls returns a promise, which when resolved returns the array of bodies
 */
function fetchUrls(urls)
{
  let bodies = []
  function fetchOne(url) {
    return fetch(url)
        .then(response => response.text())
        .then(body => {console.log('adding one body'); bodies.push(body)})
        .catch(error => {console.log(error)})
  }
  let p = Promise.resolve(undefined)
  for (const url of urls) {
    p = p.then(() => fetchOne(url))
  }

  // return a Promise
  return p.then(() => bodies)
}

function fetchUrls2(urls, bodies)
{
  if (urls.length === 0) {
    return bodies
  }
  return fetch(urls[0])
      .then(response => response.text())
      .then(body => bodies.push(body))
      .then(() => fetchUrls2(urls.slice(1), bodies))
      .catch(error => console.log("failed to fetch url...", urls[0], error))
      .then(() => bodies)
}

// this is the main function. I will do something with the bodies that I receive
// from fetchUrls

// fetchUrls(['https://amazon.in']).then(bodies => console.log(bodies))

// 'https://amazon.in'
fetchUrls2(['https://amazon.in'], []).then(bodies => console.log(bodies.length))
