let urlip = "http://39.97.182.42:80/api/twe";
function postDate(url, data) {
  let urlfetch = urlip + url;
  return fetch(urlfetch, {
    body: JSON.stringify(data),
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer"
  })
    .then(Response => Response.json())
    .catch(error => console.error("error", error));
}
function getData(url) {
  let urlfetch = urlip + url;
  return fetch(urlfetch, {
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json"
    },
    method: "get",
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer"
  }).then(Response => Response.json()).catch(error => console.error("error", error));
}

export {postDate,getData }
