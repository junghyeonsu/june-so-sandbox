# june-so-sandbox

> [june.so](https://www.june.so/) client for sandbox platform

you can use this client to send event to june.so in your sandbox platform (like figma plugin)

figma plugin has no `document.location`, so it can't set `cookie` because of sandbox limitation
but current june.so sdks need `cookie` to send event.
So this client just call june.so api directly use `fetch`.

- [june.so docs](https://www.june.so/docs/start-here)
- [june.so](https://www.june.so/)

## framework support

- [x] [react](/packages/react/README.md)
- [x] [preact](/packages/preact/README.md) (you can use with [create-figma-plugin](https://yuanqing.github.io/create-figma-plugin/))
