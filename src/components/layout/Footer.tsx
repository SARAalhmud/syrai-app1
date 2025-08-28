'use client';

import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
<footer className="relative bg-gradient-to-t from-green-100 via-green-50 to-white text-green-800 px-3 py-2 overflow-hidden">
  {/* كتب تطفو */}
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <Image
      src="/Education-rafiki.svg"
      alt="floating book 1"
      width={100}
      height={100}
      className="absolute top-5 left-[15%] animate-float-slow"
    />
    <Image
      src="/Editorial commision-amico (2).svg"
      alt="floating book 2"
      width={100}
      height={100}
      className="absolute bottom-10 right-[12%] animate-float-slow delay-2000"
    />
  </div>

  {/* محتوى الفوتر */}
  <div className="text-center mt-2">
    <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-1">
      خلّي كتبك تفيد غيرك... وكمان تربح!
    </h2>
    <p className="text-green-700 max-w-sm mx-auto mb-2 text-xs sm:text-sm">
      عندك كتب أو نوط ما عدت تحتاجها؟ اعرضها للبيع أو التبادل مع طلاب مثلك.
    </p>
    <a
      href="#"
      className="inline-block rounded-full border border-green-600 px-4 py-1 text-xs font-medium text-green-700 hover:bg-green-600 hover:text-white transition"
    >
      ابدأ البيع أو التبادل الآن
    </a>

    <div className="mt-2 flex justify-center">
      <Image
        src="/Bibliophile-rafiki.svg"
        alt="Students with books"
        width={250}
        height={250}
        className="max-w-full h-auto"
      />
    </div>
  </div>

  {/* نهاية الفوتر */}
  <div className="relative z-10 border-t mt-4 pt-2 text-center text-[10px] text-green-600">
    <p>&copy; {new Date().getFullYear()} نُوطّتي - جميع الحقوق محفوظة</p>
    <div className="mt-1 flex justify-center gap-2 rtl:flex-row-reverse">
      <a href="#" className="hover:text-green-800 transition">الشروط</a>
      <a href="#" className="hover:text-green-800 transition">الخصوصية</a>
      <a href="#" className="hover:text-green-800 transition">الكوكيز</a>
    </div>
  </div>
</footer>


  );
};

export default Footer;
