"use client";
import React, { useState } from "react";

type Comment = {
  text: string;
  date: string;
};

type Post = {
  id: number;
  title: string;
  description: string;
  grade: string;
  region: string;
  author: string;
  images: string[];
  comments: Comment[];
};

type Props = {
  post: Post;
};

export default function ShowDetails({ post }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
 <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-green-300">
  <h2 className="text-3xl font-extrabold mb-5 text-green-700">{post.title}</h2>
  <p className="mb-6 text-gray-700 leading-relaxed">{post.description}</p>

  {/* Carousel الصور */}
  {post.images.length > 0 && (
    <div className="relative mb-8 rounded-xl overflow-hidden shadow-md">
      <img
        src={post.images[currentImageIndex]}
        alt={`${post.title} image ${currentImageIndex + 1}`}
        className="w-full h-64 object-cover transition-transform duration-300"
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-green-700 bg-opacity-80 hover:bg-green-800 text-white text-2xl font-bold px-3 py-1 rounded-full shadow-lg transition"
        aria-label="السابق"
      >
        ‹
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-green-700 bg-opacity-80 hover:bg-green-800 text-white text-2xl font-bold px-3 py-1 rounded-full shadow-lg transition"
        aria-label="التالي"
      >
        ›
      </button>
      {/* مؤشر الصور */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {post.images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === currentImageIndex ? "bg-green-700" : "bg-green-300"
            }`}
            onClick={() => setCurrentImageIndex(idx)}
          />
        ))}
      </div>
    </div>
  )}

  {/* بيانات إضافية */}
  <div className="flex flex-wrap justify-between text-green-800 font-semibold mb-6">
    <p className="mb-2"><span className="font-bold">المرحلة:</span> {post.grade}</p>
    <p className="mb-2"><span className="font-bold">المحافظة:</span> {post.region}</p>
    <p className="mb-2"><span className="font-bold">الناشر:</span> {post.author}</p>
  </div>

  {/* التعليقات */}
  <div className="mt-6">
    <h3 className="text-xl font-bold text-green-700 mb-4 border-b border-green-300 pb-2">التعليقات</h3>
    {post.comments.length === 0 ? (
      <p className="text-gray-500 italic">لا توجد تعليقات بعد.</p>
    ) : (
      <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {post.comments.map((c, idx) => (
          <li
            key={idx}
            className="border-l-4 border-green-500 bg-green-50 p-3 rounded shadow-sm"
          >
            <p className="text-gray-700">{c.text}</p>
            <span className="text-xs text-green-400">{c.date}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
}
