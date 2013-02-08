# Chai Plugin for trap

This plugin enables the use of the Chai assertion library within trap.

## Getting Started

If you're on node >= v0.18, just

    npm install trap-chai

If you're below that, you'll need to install the peer dependencies manually:

    npm install trap@">=0.4"
    npm install chai@1.x
    npm install trap-chai

Then, edit (or create) your `trap.config.js` file in your `test` directory to have the following line:

```js
require('trap-chai').init();
```

That's it! now you can use chai like you normally would!

## Examples

Check out the examples folder, where I have copied the latest tests for Chai and converted them to trap. Be sure to
take a look at `trap.config.js`.