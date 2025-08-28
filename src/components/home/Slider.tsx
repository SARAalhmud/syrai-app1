import { Carousel } from 'flowbite-react';
import React from 'react';

const Slider = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          <section className="relative bg-gradient-to-br from-green-100 to-white w-full overflow-hidden">
            {/* خلفية زخرفية خضراء */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full opacity-30 blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-300 rounded-full opacity-20 blur-3xl animate-bounce"></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-green-100 rounded-full opacity-40 blur-xl animate-float"></div>

            <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-4 md:px-26 py-10 relative z-10">
              {/* الصورة */}
              <div className="w-[260px] h-[260px] md:w-[380px] md:h-[380px] relative animate-float drop-shadow-xl">
                <img  src="/Bibliophile-bro (1).svg" alt="فتاة تحمل كتب" className="w-full h-full object-contain"  />
              </div>

              {/* النصوص */}
              <div className="max-w-xl text-center md:text-right">
                <h1 className="text-5xl font-extrabold text-green-800 leading-snug mb-20">
                  أهلاً بك في <span className="text-green-700">نوطتي </span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  منصتك الذكية لتبادل الكتب والنوط والقرطاسية بين الطلاب السوريين بكل سهولة وأمان.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                   ابدأ الآن
                </button>
              </div>
            </div>
          </section>
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
