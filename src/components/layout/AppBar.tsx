"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';    // نسيت هذا الاستيراد
import { useSession, signOut } from 'next-auth/react';

const AppBar = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between px-6 md:px-16 py-4 bg-white shadow-md sticky top-0 z-50">
      <Logo />
      <nav>
        <ul className="flex gap-4 md:gap-8 rtl:space-x-reverse text-green-700 font-medium">
          <li className="hover:text-green-900 transition">
            <Link href="/">الرئيسية</Link>
          </li>

          {session ? (
            <>
              <li className="hover:text-green-900 transition">
                <Link href="/profile">الصفحة الشخصية</Link>
              </li>
              <li
                className="hover:text-green-900 transition cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                تسجيل الخروج
              </li>
            </>
          ) : (
            <li className="hover:text-green-900 transition">
              <Link href="auth/signin">تسجيل الدخول</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Image
        src="/ChatGPT Image 13 يوليو 2025، 09_28_06 م.png"
        alt="Logo"
        width={48}
        height={48}
        className="rounded-full"
        priority
      />
      <span className="text-xl font-bold text-green-800">نوطتي</span>
    </div>
  );
};

export default AppBar;
