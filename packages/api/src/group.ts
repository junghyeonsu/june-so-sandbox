/**
 * @see https://www.june.so/docs/tracking/http-api/group
 */
export interface GroupProps {
  writeKey: string;

  /**
   * @description The ID for this user in your database. Note: At least one of userId or anonymousId must be included in any track call.
   */
  userId?: string;

  /**
   * @description An ID associated with the user when you don’t know who they are (for example, the anonymousId generated by analytics.js). Note: You must include at least one of userId or anonymousId in all track calls.
   */
  anonymousId?: string;

  /**
   * @description The ID of the group.
   */
  groupId: string;

  /**
   * @description A dictionary of traits you know about the group. For a company, they might be things like name, address, or phone.
   */
  traits: Record<string, unknown>;

  /**
   * @description A dictionary of extra context to attach to the call. Note: context differs from traits because it is not attributes of the user itself.
   */
  context?: Record<string, unknown>;

  /**
   * @description A JavaScript date object representing when the track took place. If the track just happened, leave it out and the server’s time will be used. If you’re importing data from the past, make sure to send a timestamp.
   */
  timestamp?: Date;
}

export interface GroupResponse {
  status: number;
  success: boolean;
}

export const group = (props: GroupProps) => {
  const { writeKey, ...restProps } = props;

  const headers = {
    Authorization: `Basic ${writeKey}`,
    "Content-Type": "application/json",
  };

  return fetch("https://api.june.so/sdk/group", {
    method: "POST",
    headers,
    body: JSON.stringify(restProps),
  }) as Promise<Response & GroupResponse>;
};
