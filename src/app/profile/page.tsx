
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import Image from 'next/image';
import { collection, query, where, getDocs } from "firebase/firestore";

interface Book {
  id: string;
  title: string;
  grade: string;
  region: string;
  imageUrl?: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userBooks, setUserBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!session?.user?.email) return;

      const q = query(
        collection(db, "books"),
        where("ownerEmail", "==", session.user.email)
      );

      const querySnapshot = await getDocs(q);
      const books = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Book[];

      setUserBooks(books);
    };

    fetchUserBooks();
  }, [session]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="bg-green-600 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">مرحبا {session?.user?.name || "عزيزي/عزيزتي"}</h1>
        <p className="mt-2">عدد كتبك المضافة: {userBooks.length}</p>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">كتبك المضافة</h2>
        
        {userBooks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">لم تقم بإضافة أي كتب بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBooks.map(book => (
              <div key={book.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {book.imageUrl && (
                 <Image
                    src={book.imageUrl || '/placeholder.jpg'} 
                    alt={book.title}
                    width={300}     
                    height={200}
                    className="w-full h-48 object-cover"
                    priority={false}      
                   />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{book.title}</h3>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{book.grade}</span>
                    <span>{book.region}</span>
                  </div>
                  <button className="mt-4 w-full bg-green-100 text-green-700 py-2 rounded-md hover:bg-green-200 transition">
                    تعديل
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}