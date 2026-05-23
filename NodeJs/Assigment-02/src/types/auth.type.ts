export interface signupUserPayload {
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
}