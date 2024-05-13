import { describe, expect, it } from "vitest";
import { setup, $fetch, isDev } from "@nuxt/test-utils";
import { mount } from "@vue/test-utils";
import index from "@/pages/index.vue";
import Signin from "@/pages/signin.vue";
import Signup from "@/pages/signup.vue";

describe("sprint 1", async () => {
  it("Renders sign in button", async () => {
    const wrapper = mount(index);
    expect(wrapper.text()).toContain("Signin");
  });

  it("Renders sign up button", async () => {
    const wrapper = mount(index);
    expect(wrapper.text()).toContain("Signup");
  });

  it("Sign up page has a form", async () => {
    const wrapper = mount(Signup);
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("Sign in page has a form", async () => {
    const wrapper = mount(Signin);
    expect(wrapper.find("form").exists()).toBe(true);
  });
});
