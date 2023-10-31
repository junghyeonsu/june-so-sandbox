# june-so-sandbox

> [june.so](https://www.june.so/) client for sandbox platform

you can use this client to send event to june.so in your sandbox platform (like figma plugin)

figma plugin has no `document.location`, so it can't set `cookie` because of sandbox limitation
but current june.so sdks need `cookie` to send event.
So this client just call june.so api directly use `fetch`.

- [june.so docs](https://www.june.so/docs/start-here)
- [june.so](https://www.june.so/)

## install

```bash
npm install june-so-sandbox-react
```

## react usage

```tsx
import { JuneProvider, useJune } from "june-so-client-react";

const App = ({ children }) => {
  return <JuneProvider writeKey={"%YOUR_WRITE_KEY%"}>{children}</JuneProvider>;
};

const Component = () => {
  const { track } = useJune();

  const onClick = () => {
    track({
      event: "%YOUR_EVENT_NAME%",
      timestamp: new Date(),
    });
  };

  return (
    <div>
      <button onClick={onClick}>click me</button>
    </div>
  );
};
```
