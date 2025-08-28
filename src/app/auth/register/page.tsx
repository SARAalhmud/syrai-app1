"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);

    // تسجيل الدخول تلقائياً بعد التسجيل
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (result?.error) {
      toast.error("فشل تسجيل الدخول بعد التسجيل");
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col justify-start px-6 py-12 pt-8 bg-green-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="/Bibliophile-rafiki.svg"
          alt="Your Company"
          className="mx-auto w-[300px] h-[300px] animate-float"
        />
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
          إنشاء حساب جديد
        </h2>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              الاسم الكامل
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm outline-none focus:ring focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm outline-none focus:ring focus:ring-indigo-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm outline-none focus:ring focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            إنشاء الحساب
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          لديك حساب مسبقاً؟{" "}
          <a href="/auth/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
            تسجيل الدخول
          </a>
        </p>
      </div>
    </div>
  );
}
