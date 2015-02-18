# link-directories

Link your directories into `node_modules` so you dont have to do things like `require('../../../../foo')`

Basically this is what [@substack](https://github.com/substack) recommends in his [browserify-handbook](https://github.com/substack/browserify-handbook#avoiding-).

# usage

## Install it
~~~
npm i link-directories --save
~~~

## Add it to postinstall hook in your package.json 
Read more about postinstall here: https://docs.npmjs.com/misc/scripts

Let's say you want to require `foo.js` from lib directory (so basically `require('lib/foo.js')`), for this add a `link-directories` entry to your package.json.

~~~
{
  "name": "your-module",
  "dependencies": {
     "link-directories": "^1.0.0"
  },
  "scripts": {
    "postinstall": "link-directories"
  },
  "link-directories": [{
    "src": "lib",
    "dest": "node_modules/lib"
  }]
}
~~~

## Run `npm run postinstall`

# why postinstall?

Because if somebody starts to use your app/project they will `git clone your-repo && npm install`, so it will just work.

# format

currently this module expects an array which contains an object of `src` and `dest`.
later we should we should add option to use array of strings (which should be interpreted `src: <string>, dest: <string>`), or set cwd, etc. but first we need to add tests.

# license

MIT