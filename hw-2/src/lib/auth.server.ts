import { betterAuth } from "better-auth";
import { BETTER_AUTH_URL } from "$app/env/public";
import { db, mongo_client } from "./mongo";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client:mongo_client,
  }),
  
  advanced: {
    database: {
      joins: true,
    },
  },

  plugins: [sveltekitCookies(getRequestEvent)],

  emailAndPassword: { 
    enabled: true, 
  }
});