// /pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { users, User } from "../../../lib/users";




export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "هذا المستخدم موجود مسبقاً" });
  }

  const newUser: User = {
    id: Date.now(),
    name,
    email,
    password, // ملاحظة: للبساطة بدون تشفير
  };

  users.push(newUser);

  return res.status(201).json({ message: "تم إنشاء الحساب بنجاح", user: { id: newUser.id, name: newUser.name, email: newUser.email } });
}
