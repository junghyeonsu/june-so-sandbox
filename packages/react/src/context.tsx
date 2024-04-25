import * as React from "react";
import {
  IdentifyProps,
  TrackProps,
  GroupProps,
  PageProps,
  group as groupApi,
  identify as identifyApi,
  page as pageApi,
  track as trackApi,
} from "@june-so-sandbox/api";

export interface JuneContextType {
  identify: (props: Omit<IdentifyProps, "writeKey">) => Promise<Response | undefined>;
  track: (props: Omit<TrackProps, "writeKey">) => Promise<Response | undefined>;
  group: (props: Omit<GroupProps, "writeKey">) => Promise<Response | undefined>;
  page: (props: Omit<PageProps, "writeKey">) => Promise<Response | undefined>;
}

export interface JuneProviderProps {
  writeKey: string;
  children: React.ReactNode;

  disabled?: boolean;
}

const JuneContext = React.createContext<JuneContextType | null>(null);

export const JuneProvider: React.FC<JuneProviderProps> = ({ children, writeKey, disabled = false }) => {
  if (!writeKey) {
    throw new Error("[useJune] writeKey is required");
  }

  const track = async (props: Omit<TrackProps, "writeKey">) => {
    if (disabled) return;

    return trackApi({ writeKey, ...props });
  };

  const identify = async (props: Omit<IdentifyProps, "writeKey">) => {
    if (!props.userId || disabled) return;

    return identifyApi({ writeKey, ...props });
  };

  const group = async (props: Omit<GroupProps, "writeKey">) => {
    if (disabled) return;

    return groupApi({ writeKey, ...props });
  };

  const page = async (props: Omit<PageProps, "writeKey">) => {
    if (disabled) return;

    return pageApi({ writeKey, ...props });
  };

  return <JuneContext.Provider value={{ identify, track, group, page }}>{children}</JuneContext.Provider>;
};

export const useJune = () => {
  const context = React.useContext(JuneContext);
  if (!context) {
    throw new Error("[useJune] must be used within a JuneProvider");
  }
  return context;
};
