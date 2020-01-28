# web-pdftk
NodeJS pdftk Web Service

The service is accessible at https://web-pdftk.herokuapp.com/
Called with no parameter, this help is displayed.

## Inputs

The `inputs` parameter is used to specify input files by their URL. To work with
multiple input files, URLs must be [encoded](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/encodeURIComponent)
& comma-separated.

## Operations

Chosen operation can be specified using the `operation` parameter.

## Options

A facultative `options` parameter may be provided to pass options to the chosen
operation.

## Chaining

Chaining operations is not supported. Proceed with successive calls to achieve.
Giving the service a web-pdftk URL, creating nested queries, is a great way to
achieve chaining.

## Output

This service doesn't give control over outputs. Output is always served, never
stored.

## Sample query

In order to concatenate 2 PDFs from http://www.web.com/file1.pdf &
http://www.web.com/file2.pdf, the following URL must be called:
https://web-pdftk.herokuapp.com/?inputs=http://www.web.com/file1.pdf,http://www.web.com/file2.pdf&operation=cat

### Real-life example

Let's say we want to merge these two PDF files from Wikimedia Commons:

https://upload.wikimedia.org/wikipedia/commons/a/a3/JUA0680291.pdf & https://upload.wikimedia.org/wikipedia/commons/7/79/Bell76.pdf

Yet, to make it more interesting, we also want the first page of each PDF removed.
Just resolve the following URL to do the job:

https://web-pdftk.herokuapp.com/?inputs=https%3A%2F%2Fweb-pdftk.herokuapp.com%2F%3Finputs%3Dhttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F95%2FJua0680504.pdf%26operation%3Dcat%26options%3D2-end,https%3A%2F%2Fweb-pdftk.herokuapp.com%2F%3Finputs%3Dhttps%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F7%2F79%2FBell76.pdf%26operation%3Dcat%26options%3D2-end&operation=cat

This is the kind of nested queries mentionned earlier: the main request will
merge the PDFs (cat called without options), being given as inputs the products
of two "subrequests", which will strip the first page off each file. 

## Credits

This service relies on [pdftk](https://www.pdflabs.com/tools/pdftk-server/)
(obviously!), the [pdftk buildpack for Heroku](https://github.com/Aesthetikx/heroku-pdftk-buildpack),
and the [node-pdftk NPM package](https://www.npmjs.com/package/node-pdftk)
