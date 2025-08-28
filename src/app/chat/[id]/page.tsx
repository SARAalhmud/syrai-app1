"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date | null;
}

export default function ChatPage() {
  const params = useParams() as { id: string };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!params.id) return;

    const q = query(
      collection(db, "messages"),
      where("chatId", "==", params.id),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text,
        sender: doc.data().sender,
        timestamp: doc.data().timestamp?.toDate() || null
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [params.id]);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("الرسالة لا يمكن أن تكون فارغة");
      return;
    }

    if (!session) {
      toast.error("يجب تسجيل الدخول أولاً");
      return router.push("/auth/signin");
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        sender: session.user?.email || "مجهول",
        chatId: params.id,
        timestamp: serverTimestamp()
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("فشل إرسال الرسالة");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header className="bg-green-600 text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-bold">محادثة مع المستخدم #{params.id}</h1>
      </header>

      <div className="border border-gray-200 p-4 h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center my-20">
            ابدأ المحادثة مع صاحب المنشور...
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === session?.user?.email
                    ? "bg-green-100 ml-auto"
                    : "bg-gray-100 mr-auto"
                }`}
              >
                <p className="font-semibold text-sm">
                  {msg.sender === session?.user?.email ? "أنت" : msg.sender.split('@')[0]}
                </p>
                <p className="my-1">{msg.text}</p>
                {msg.timestamp && (
                  <p className="text-xs text-gray-400">
                    {msg.timestamp.toLocaleString("ar-EG", {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 border-t p-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="اكتب رسالتك..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          disabled={!message.trim()}
        >
          إرسال
        </button>
      </div>
    </div>
  );
}