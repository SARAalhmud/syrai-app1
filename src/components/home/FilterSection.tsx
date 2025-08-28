"use client";
import Link from 'next/link';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Eye, MessageSquare } from "lucide-react";
type Comment = {
  text: string;
  date: string;
};

type Post = {
  id: number;
  title: string;
  grade: string;
  region: string;
  author: string;
  comments: Comment[];
};

const FilterSection = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "كتاب رياضيات",
      grade: "ابتدائي",
      region: "دمشق",
      author: "أحمد",
      comments: [],
    },
    {
      id: 2,
      title: "نوطة علوم",
      grade: "إعدادي",
      region: "حمص",
      author: "فاطمة",
      comments: [],
    },
  ]);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [newPost, setNewPost] = useState({
    title: "",
    grade: "",
    region: "",
    author: "",
  });

  const [commentInputs, setCommentInputs] = useState<{ [postId: number]: string }>({});

  const toggleGrade = (grade: string) => {
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const filteredPosts = posts.filter((post) => {
    const regionMatch = selectedRegion === "" || post.region === selectedRegion;
    const gradeMatch = selectedGrades.length === 0 || selectedGrades.includes(post.grade);
    return regionMatch && gradeMatch;
  });

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();

    // تأكد من أن حالة الجلسة ليست loading
    if (status === "loading") return;

    // إذا المستخدم غير مسجل دخول
    if (!session) {
      toast.error("يجب تسجيل الدخول أولاً لإضافة منشور");
      router.push("/auth/signin");
      return;
    }

    const { title, grade, region, author } = newPost;
    if (!title || !grade || !region || !author) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    setPosts((prev) => [
      ...prev,
      { id: Date.now(), title, grade, region, author, comments: [] },
    ]);
    setNewPost({ title: "", grade: "", region: "", author: "" });
    toast.success("تمت إضافة المنشور بنجاح!");
  };

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId];
    if (!text) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { text, date: new Date().toLocaleString("ar-EG") },
              ],
            }
          : post
      )
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
  <section className="bg-gray-50 py-12 px-4 mt-16">
  {/* ✅ شريط التصفية */}
  <div className="max-w-screen-xl mx-auto px-4 mb-8">
    <div className="flex flex-col md:flex-row-reverse items-center justify-between bg-white p-6 rounded-xl shadow-sm gap-4">
      <h2 className="text-2xl font-bold text-green-800 text-right">
         تصفية المنشورات حسب المحافظة
      </h2>
      <select
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="">كل المحافظات</option>
        <option value="دمشق">دمشق</option>
        <option value="حلب">حلب</option>
        <option value="حمص">حمص</option>
        <option value="اللاذقية">اللاذقية</option>
      </select>
    </div>
  </div>

  {/* ✅ المحتوى الرئيسي */}
  <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row-reverse gap-6">
    {/* ✅ الشريط الجانبي */}
    <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow h-fit">
      <h3 className="text-lg font-bold text-green-700 mb-4 text-right"> المرحلة الدراسية</h3>
      <ul className="space-y-3 mb-6">
        {["ابتدائي", "إعدادي", "ثانوي", "جامعي"].map((grade) => (
          <li key={grade}>
            <label className="inline-flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox text-green-600"
                checked={selectedGrades.includes(grade)}
                onChange={() => toggleGrade(grade)}
              />
              {grade}
            </label>
          </li>
        ))}
      </ul>

      {/* نموذج الإضافة */}
      <form onSubmit={handleAddPost} className="space-y-3 text-right">
        <h4 className="text-green-700 font-semibold text-lg"> إضافة منشور</h4>
        <input
          type="text"
          placeholder="عنوان المنشور"
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="اسم الناشر"
          className="w-full border rounded px-3 py-2"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <select
          className="w-full border rounded px-3 py-2"
          value={newPost.grade}
          onChange={(e) => setNewPost({ ...newPost, grade: e.target.value })}
        >
          <option value="">اختر المرحلة</option>
          <option value="ابتدائي">ابتدائي</option>
          <option value="إعدادي">إعدادي</option>
          <option value="ثانوي">ثانوي</option>
          <option value="جامعي">جامعي</option>
        </select>
        <select
          className="w-full border rounded px-3 py-2"
          value={newPost.region}
          onChange={(e) => setNewPost({ ...newPost, region: e.target.value })}
        >
          <option value="">اختر المحافظة</option>
          <option value="دمشق">دمشق</option>
          <option value="حلب">حلب</option>
          <option value="حمص">حمص</option>
          <option value="اللاذقية">اللاذقية</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition duration-200"
        >
          إضافة المنشور
        </button>
      </form>
    </aside>

    {/* ✅ عرض المنشورات */}
    <section className="w-full md:w-3/4 bg-white p-6 rounded-xl shadow space-y-6">
      {filteredPosts.length === 0 ? (
        <p className="text-gray-600 text-center text-lg"> لا توجد منشورات مطابقة للتصفية.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl p-5 shadow-sm bg-gray-50 space-y-3"
          >
            {/* ✅ أزرار */}
            <div className="flex justify-end gap-3" dir="rtl">
             <Link
            href={`/details/${post.id}`}
            className="inline-flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition"
          >
            عرض التفاصيل
            <Eye size={16} />
          </Link>
              <button
  onClick={() => {
    if (!session) {
      toast.error("يجب تسجيل الدخول أولاً للتواصل");
      router.push("/auth/signin");
      return;
    }
    router.push(`/chat/${post.id}`); // أو post.author إذا كان فيه اسم المستخدم
  }}
  className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition"
>
  تواصل مع صاحب المنشور
  <MessageSquare size={16} />
</button>
            </div>

            <h3 className="text-xl font-bold text-green-800">{post.title}</h3>
            <p className="text-sm text-gray-700"> الناشر: {post.author}</p>
            <p className="text-sm text-gray-600">
               {post.region} |  {post.grade}
            </p>

            {/* ✅ التعليقات */}
            <div className="flex flex-col gap-2 mt-3">
              <input
                type="text"
                placeholder=" أضف تعليقاً..."
                className="border rounded px-3 py-2 text-sm"
                value={commentInputs[post.id] || ""}
                onChange={(e) =>
                  setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                }
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="self-start bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold"
              >
                إضافة تعليق
              </button>
            </div>

            {post.comments.length > 0 && (
              <div className="mt-3 border-t pt-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2"> التعليقات:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {post.comments.map((comment, idx) => (
                    <li key={idx}>
                       {comment.text} -{" "}
                      <span className="text-xs text-gray-400">{comment.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </section>
  </div>
</section>

  );
};

export default FilterSection;
