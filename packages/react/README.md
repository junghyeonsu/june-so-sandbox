# june-so-sandbox-react

## install

```bash
npm install june-so-sandbox-react
```

## react usage

```tsx
import { JuneProvider, useJune } from "june-so-sandbox-react";

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
