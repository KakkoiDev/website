import {
  Html,
  Tailwind,
  Body,
  Text,
  Heading,
  Preview,
  Container,
  Link,
  Img,
} from "@react-email/components";
import { defaultEmailData } from "@/data";
import * as React from "react";

type EmailProps = {
  email: string;
  message: string;
};

export default function Email({
  email = defaultEmailData.email,
  message = defaultEmailData.message,
}: EmailProps) {
  return (
    <Tailwind>
      <Preview>From {email}</Preview>
      <Html>
        <Body className="m-0">
          <Container>
            <Img
              src="https://cdn.kakkoi.dev/email-logo.png"
              alt="KakkoiDev Logo"
              width="260"
              height="81"
              className="mx-auto"
            />
            <Heading
              as="h1"
              className="text-center text-white bg-black px-4 py-2"
            >
              You&apos;ve got a new message!
            </Heading>
            <Text className="text-lg">Email: {email}</Text>
            <Text className="text-lg">Message:</Text>
            {/* Visitor text is rendered as text, never as HTML. */}
            <Text className="text-lg whitespace-pre-wrap">{message}</Text>
            <Text className="text-center text-lg">
              <Link href="https://kakkoi.dev">KakkoiDev</Link> &copy;{" "}
              {new Date().getFullYear()}
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
