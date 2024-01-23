"use server";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerifcationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { update } from "@/auth";
import brcypt from "bcryptjs"
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }
  if (values.email && values.email !==user.email) {
    const existinguser = await getUserByEmail(values.email)
    if (existinguser && existinguser.id !== user.id) {
      return { error:"Email already in use!"}
      
    }

    const verificationToken = await generateVerifcationToken(values.email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return {success:"Verirication email sent!"}
    
  }
  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await brcypt.compare(
      values.password,
      dbUser.password
    )
    if (!passwordsMatch) {
      return {error:"Incorrect password"}
    }
    const hashedPassword = await brcypt.hash(
      values.newPassword,
      10
    )
    values.password =hashedPassword;
    values.newPassword = undefined
  }
  const updateduser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });
  update({
    name:updateduser.name,
    email:updateduser.email,
    isTwoFactorEnabled:updateduser.isTwoFactorEnabled,
    role:updateduser.role,
    
  })
  return { success: "Settings Updated!" };
};
