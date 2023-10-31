export interface TrackProps {
  event: string;
  timestamp?: Date;
  userId?: string;
  anonymousId?: string;
  properties?: Record<string, unknown>;
  context?: Record<string, unknown>;
}

export interface IdentifyProps {
  userId?: string;
  anonymousId?: string;
  traits?: Record<string, unknown>;
  timestamp?: Date;
  context?: Record<string, unknown>;
}
