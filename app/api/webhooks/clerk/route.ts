import {Webhook} from "svix";
import {headers} from "next/headers";
import {WebhookEvent} from "@clerk/nextjs/server";
import {ReadonlyHeaders} from "next/dist/server/web/spec-extension/adapters/headers";
import {db} from "@/prisma/db";

export const POST = async (req: Request) => {
  const WEBHOOK_SECRET: string | undefined = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add webhook_secret from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload: ReadonlyHeaders = headers();
  const svix_id: string | null = headerPayload.get("svix-id");
  const svix_timestamp: string | null = headerPayload.get("svix-timespamp");
  const svix_signature: string | null = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400
    });
  }

  const payload = await req.json();
  const body: string = JSON.stringify(payload);

  const wh: Webhook = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix_timestamp": svix_timestamp,
      "svix_signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook", err);
    return new Response("Error occured", {
      status: 400
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      }
    });
  }

  if (eventType === "user.updated") {
    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      }
    });
  }

  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        externalUserId: payload.data.id,
      }
    });
  }

  return new Response("Success", {status: 200});
};