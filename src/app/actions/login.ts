"use server";
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyAccount } from "thirdweb/wallets";
import { client } from "@/lib/client";
import { cookies } from "next/headers";

import { authenticateUser } from './auth';

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || "";

if (!privateKey) {
  throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.");
}

const thirdwebAuth = createAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
  adminAccount: privateKeyAccount({ client, privateKey }),
  client: client,
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });

    if (verifiedPayload.payload.address) {
      await authenticateUser(verifiedPayload.payload.address);
    }
    cookies().set("jwt", jwt);
  }
}

export async function isLoggedIn() {
  const jwt = cookies().get("jwt");
  const authToken = cookies().get("auth_token");
  console.log("jwt", jwt);
  console.log("auth token", authToken);
  if (!jwt?.value) {
    return false;
  }
  if (!authToken?.value) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return false;
  }
  return true;
}

export async function decodeJWT() {
  const jwt = cookies().get("jwt");
  const authToken = cookies().get("auth_token");


  if (!jwt?.value) {
    return {
      isAuthenticated: false,
      wallet: null
    };
  }
  if (!authToken?.value) {
    return {
      isAuthenticated: false,
      wallet: null
    };
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return {
      isAuthenticated: false,
      wallet: null
    };
  }

  return {
    isAuthenticated: true,
    wallet: authResult.parsedJWT.sub,
    accessToken: authToken.value
  };
}



export async function logout() {
  cookies().delete("jwt");
  cookies().delete("auth_token");
}
