import { RedisMessage } from '../types';
import {throwErrorIfInvalidInput} from "../imports/validation";

export default function buildRedisMessage(sessionVariables: Record<string, unknown>, input: Record<string, unknown>): RedisMessage {
  throwErrorIfInvalidInput(input,
      [
        {name: 'stream', type: 'string', required: true},
      ]
  )

  const eventName = `UserBroadcastCamStopMsg`;

  const routing = {
    meetingId: sessionVariables['x-hasura-meetingid'] as String,
    userId: sessionVariables['x-hasura-userid'] as String
  };

  const header = { 
    name: eventName,
    meetingId: routing.meetingId,
    userId: routing.userId
  };

  const body = {
    stream: input.stream
  };

  return { eventName, routing, header, body };
}
