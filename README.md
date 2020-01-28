# web-pdftk
NodeJS pdftk Web Service

The service is accessible at https://web-pdftk.herokuapp.com/
Called with no parameter, this help is displayed.

## Inputs

The `inputs` parameter is used to specify input files by their URL. To work with
multiple input files, URLs must be [encoded](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/encodeURIComponent)
& comma-separated.

## Operations

Chosen operation can be specified using the `operation` parameter. Currently
supported operations are:
  * cat
More operations may work, yet I haven't tested them.

### Chaining

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

## Credits

This service relies on [pdftk](https://www.pdflabs.com/tools/pdftk-server/)
(obviously!), the [pdftk buildpack for Heroku](https://github.com/Aesthetikx/heroku-pdftk-buildpack),
and the [node-pdftk NPM package](https://www.npmjs.com/package/node-pdftk)
