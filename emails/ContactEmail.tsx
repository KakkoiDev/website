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
              You&apos;ve got a new message!
            </Heading>
            <Text className="text-lg">Email: {email}</Text>
            <Text className="text-lg">Message:</Text>
            <Text
              className="text-lg"
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
