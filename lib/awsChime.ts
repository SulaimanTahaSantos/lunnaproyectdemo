import AWS from "aws-sdk";

// Validate environment variables
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error("Missing required AWS environment variables");
}

const chime = new AWS.ChimeSDKMeetings({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

// Crear reunión
export async function createMeeting(clientRequestId: string) {
  if (!AWS_REGION) {
    throw new Error("AWS_REGION is required");
  }

  const meeting = await chime
    .createMeeting({
      ClientRequestToken: clientRequestId,
      ExternalMeetingId: clientRequestId, // Required property
      MediaRegion: AWS_REGION as string,
    })
    .promise();

  return meeting.Meeting;
}

// Crear participante
export async function createAttendee(
  meetingId: string,
  externalUserId: string
) {
  const attendee = await chime
    .createAttendee({
      MeetingId: meetingId,
      ExternalUserId: externalUserId, // normalmente el ID del usuario en tu app
    })
    .promise();

  return attendee.Attendee;
}
