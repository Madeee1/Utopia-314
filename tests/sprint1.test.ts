import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { setup, $fetch, isDev } from "@nuxt/test-utils";

describe("sprint 1", async () => {
  await setup({
    rootDir: "/",
    server: true,
  });

  it("Renders sign in button", async () => {
    expect(await $fetch("/")).toMatch("Signin");
  });

  it("Renders sign up button", async () => {
    expect(await $fetch("/")).toMatch("Signup");
  });
});
