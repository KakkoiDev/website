import {
  Html,
  Tailwind,
  Body,
  Text,
  Heading,
  Preview,
  Container,
  Hr,
  Link,
  Img,
} from "@react-email/components";
import * as React from "react";
import { defaultEmailData } from "@/data";

type EmailProps = {
  message: string;
};

export default function Email({
  message = defaultEmailData.message,
}: EmailProps) {
  return (
    <Tailwind>
      <Preview>I&apos;ll come back to you within 2 business days.</Preview>
      <Html>
        <Body className="m-0">
          <Container>
            <Img
              src="https://hcti.io/v1/image/b922fbff-7cb0-4371-8322-c378b5f86d6a"
              alt="KakkoiDev Logo"
              width="260"
              height="81"
              className="mx-auto"
            />
            <Heading
              as="h1"
              className="text-center text-white bg-black px-4 py-2"
            >
              Thank you for reaching out!
            </Heading>
            <Text className="text-lg">
              I&apos;ll come back to you within 2 business days.
            </Text>
            <Text className="text-lg">
              If you have any more questions, don&apos;t hesitate to reply to
              this email.
            </Text>
            <Text
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: "Cordially,<br>Cyril from KakkoiDev",
              }}
            />
            <Hr />
            <Text>Your message was:</Text>
            <Text
              dangerouslySetInnerHTML={{
                __html: message?.replaceAll("\n", "<br>"),
              }}
            />
            <Text className="text-center text-lg">
              <Link href="https://kakkoi.dev">KakkoiDev</Link> &copy; 2024
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
