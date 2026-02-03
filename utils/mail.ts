"use server";
import { MAILER_URL, QSTASH_TOKEN } from "@/config/env";
import { Client, PublishToApiResponse } from "@upstash/qstash";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  appName?: string;
}

const qstash = new Client({
  token: QSTASH_TOKEN,
});

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
  appName?: string;
}

export interface MailResponseType {
  success: boolean;
  messageId: string;
  retries: number;
}

export default async function sendMail({
  to,
  subject,
  html,
  appName,
}: SendMailOptions): Promise<{ messageId: string }> {
  const { messageId } = (await qstash.publishJSON<MailOptions>({
    url: `${MAILER_URL}/api/v1/send`,
    body: {
      to,
      subject,
      html,
      appName,
    },
  })) as PublishToApiResponse;
  return {
    messageId,
  };
}
