import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  render,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { JSX } from "react";

interface VerificationEmailProps {
  verificationLink: string;
}

export default function VerificatoinEmail({
  verificationLink,
}: VerificationEmailProps): JSX.Element {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className={`space-y-4 text-center`}>
          <Container className={`py-4`}>
            <Container
              className={`text-orange-400 text-2xl font-semibold font-mono py-2`}
            >
              Remain
            </Container>
            <Text className={`text-stone-800`}>Verification link request</Text>
          </Container>
          <Section
            align="center"
            className={`w-full rounded-lg bg-orange-100 p-8 flex my-4`}
          >
            <Text className={`py-4`}>
              Hey there, you asked us to send you a verification link for
              quickly securing your remain account.
            </Text>
            <Button
              className={`bg-orange-400 text-white rounded-full font-semibold px-4 py-3`}
              href={verificationLink}
            >
              Confirm Email
            </Button>
          </Section>
          <Container className={`w-full text-stone-800 text-center py-2`}>
            <Text className={`py-4`}>
              The above link will expire within 24 hours.
            </Text>
            <Text>
              If you did not request this you can just ignore this email. Your
              account will not be verified.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

export async function renderVerificationEmail(
  props: VerificationEmailProps,
): Promise<string> {
  return await render(<VerificatoinEmail {...props} />);
}
