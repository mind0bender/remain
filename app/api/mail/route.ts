import sendMail from "@/app/utils/mail";

export const POST = async function (req: Request): Promise<Response> {
  const { to, subject, html } = (await req.json()) as {
    to: string;
    subject: string;
    html: string;
  };
  try {
    const data = await sendMail({
      subject,
      to,
      html,
    });
    console.log({ data });
  } catch (e: unknown) {
    console.error(e);
  }
  return new Response("done", {
    status: 200,
  });
};
