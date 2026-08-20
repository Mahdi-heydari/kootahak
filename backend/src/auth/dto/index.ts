import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "User email address",
    example: "ali@example.com",
  })
  @IsNotEmpty({ message: "ایمیل الزامی است" })
  @IsEmail({}, { message: "فرمت ایمیل صحیح نیست" })
  email: string;

  @ApiProperty({
    description: "User password",
    example: "StrongPass123",
    minLength: 6,
  })
  @IsNotEmpty({ message: "رمز عبور الزامی است" })
  @IsString({ message: "رمز عبور باید متن باشد" })
  @MinLength(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: "Full name of the user",
    example: "Ali Rezaei",
  })
  @IsNotEmpty({ message: "نام الزامی است" })
  @IsString({ message: "نام باید متن باشد" })
  name: string;

  @ApiProperty({
    description: "User email address, must be unique",
    example: "ali@example.com",
  })
  @IsNotEmpty({ message: "ایمیل الزامی است" })
  @IsEmail({}, { message: "فرمت ایمیل صحیح نیست" })
  email: string;

  @ApiProperty({
    description: "User password",
    example: "StrongPass123",
    minLength: 6,
  })
  @IsNotEmpty({ message: "رمز عبور الزامی است" })
  @IsString({ message: "رمز عبور باید متن باشد" })
  @MinLength(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" })
  password: string;
}
