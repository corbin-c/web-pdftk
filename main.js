const PORT = process.env.PORT || 5000
const http = require("http");
const pdftk = require("node-pdftk");
const fetch = require("node-fetch");
const fs = require("fs");

let errorHandler = (err,response) => {
  response.writeHead(500);
  response.write("Oops, something went wrong... "+err);
  response.end();
}

let getFile = (path,bin=false) => {
  return new Promise((resolve,reject) => {
    fs.readFile(path,(bin)?null:"utf8",(error,data) => {
      if (error) { reject(error); }
      resolve(data);
    });
  });
};

let getDistantFile = async (url) => {
  url = decodeURIComponent(url);
  url = await fetch(url);
  if (url.ok) {
    url = await url.buffer();
    return url;
  } else {
    return false;
  }
}

let server = http.createServer(async function(req, res) {
  let page = new URL("http://dummy.com"+req.url);
  if ((page.searchParams.get("inputs") === null) 
  || (page.searchParams.get("operation") === null)) {
    res.writeHead(200);
    res.write(await getFile("README.md"));
    res.end();
  } else {
    let inputs = page.searchParams.get("inputs").split(",");
    inputs = await Promise.all(inputs.map(e => getDistantFile(e)));
    let operation = page.searchParams.get("operation");
    let options = (page.searchParams.get("options") || "");
    let outmime = (options.indexOf("dump") >= 0)?"application/pdf":"text/plain";
    pdftk.input(inputs)[operation](options)
      .output()
      .then(buffer => {
        res.writeHead(200,{"Content-Type":"application/pdf"});
        res.write(buffer);
        res.end();
      })
      .catch(err => { errorHandler(err,res) });
  }
});

server.listen(PORT);
