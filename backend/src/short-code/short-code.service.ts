import { Injectable } from "@nestjs/common";
import { customAlphabet } from "nanoid";

const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

@Injectable()
export class ShortCodeService {
  generate(length: number): string {
    const nanoid = customAlphabet(ALPHABET, length);
    return nanoid();
  }
}
