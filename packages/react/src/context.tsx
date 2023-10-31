import * as React from "react";
import { IdentifyProps, TrackProps } from "june-so-client-types";

export interface JuneContextType {
  identify: (props: IdentifyProps) => Promise<void>;
  track: (props: TrackProps) => Promise<void>;
}

export interface JuneProviderProps {
  writeKey: string;
  children: React.ReactNode;

  disabled?: boolean;
}

const BASE_URL = "https://api.june.so/sdk";

const JuneContext = React.createContext<JuneContextType>({
  identify: async () => {},
  track: async () => {},
});

export const JuneProvider: React.FC<JuneProviderProps> = ({ children, writeKey, disabled = false }) => {
  if (!writeKey) {
    throw new Error("[useJune] writeKey is required");
  }

  const headers = {
    Authorization: `Basic ${writeKey}`,
    "Content-Type": "application/json",
  };

  const track = async (props: TrackProps) => {
    if (disabled) return;

    try {
      await fetch(`${BASE_URL}/track`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...props,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const identify = async (props: IdentifyProps) => {
    if (!props.userId || disabled) return;

    try {
      await fetch(`${BASE_URL}/identify`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...props,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <JuneContext.Provider value={{ identify, track }}>{children}</JuneContext.Provider>;
};

export const useJune = () => {
  const context = React.useContext(JuneContext);
  if (!context) {
    throw new Error("[useJune] must be used within a JuneProvider");
  }
  return context;
};
