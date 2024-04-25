/**
 * @see https://www.june.so/docs/tracking/http-api/page
 */
export interface PageProps {
  writeKey: string;

  /**
   * @description A dictionary of properties for the event. It should contain required pageview properties, but it can also contain any custom properties you like.
   */
  properties: Record<string, unknown>;

  /**
   * @description The ID for this user in your database. Note: At least one of `userId` or `anonymousId` must be included in any track call.
   */
  userId?: string;

  /**
   * @description An ID associated with the user when you don’t know who they are.
   */
  anonymousId?: string;

  /**
   * @description A JavaScript date object representing when the track took place. If the track just happened, leave it out and the server’s time will be used. If you’re importing data from the past, make sure to send a timestamp.
   */
  timestamp?: Date;

  /**
   * @description A dictionary of extra context to attach to the call.
   */
  context?: Record<string, unknown>;
}

export interface PageResponse {
  status: number;
  success: boolean;
}

export const page = (props: PageProps) => {
  const { writeKey, ...restProps } = props;

  const headers = {
    Authorization: `Basic ${writeKey}`,
    "Content-Type": "application/json",
  };

  return fetch("https://api.june.so/sdk/page", {
    method: "POST",
    headers,
    body: JSON.stringify(restProps),
  }) as Promise<Response & PageResponse>;
};
