import { registerDecorator, ValidationOptions } from "class-validator";

const MAX_URL_LENGTH = 2048;

const BLOCKED_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

const PRIVATE_IPV4_PATTERN =
  /^(10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/;

function isPrivateHost(hostname: string): boolean {
  if (BLOCKED_HOSTNAMES.has(hostname)) return true;
  if (hostname.endsWith(".local")) return true;
  if (PRIVATE_IPV4_PATTERN.test(hostname)) return true;
  return false;
}

function isSafeRedirectUrlValue(value: unknown): boolean {
  if (typeof value !== "string" || value.length > MAX_URL_LENGTH) return false;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  if (url.username || url.password) return false;
  if (isPrivateHost(url.hostname)) return false;

  return true;
}

/**
 * Rejects `originalUrl` values that point at loopback/private/link-local hosts
 * (e.g. `http://169.254.169.254/`, `http://localhost:6379`), plus non-http(s)
 * protocols and credentials embedded in the URL.
 *
 * Best-effort, not a full SSRF guard: we never fetch `originalUrl` server-side,
 * we only issue a 302 for the visitor's browser to follow, so the blast radius
 * of a bad entry is limited to that browser, not our own network.
 */
export function IsSafeRedirectUrl(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isSafeRedirectUrl",
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate: isSafeRedirectUrlValue,
        defaultMessage: () => "این آدرس مجاز نیست",
      },
    });
  };
}
