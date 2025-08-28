import ShowDetails from "@/components/home/ShowDetails";
import { notFound } from "next/navigation";

// افتراضياً جلب بيانات ثابتة من ملف
const posts = [
  {
    id: 1,
    title: "كتاب رياضيات",
    description: "هذا الكتاب يغطي المنهج كامل للمرحلة الابتدائية مع تمارين وحلول.",
    grade: "ابتدائي",
    region: "دمشق",
    author: "أحمد",
    images: [
      "/images/math1.jpg",
      "/images/math2.jpg",
      "/images/math3.jpg"
    ],
    comments: [],
  },
  {
    id: 2,
    title: "نوطة علوم",
    description: "نوطة مبسطة وشاملة لمادة العلوم للمرحلة الإعدادية.",
    grade: "إعدادي",
    region: "حمص",
    author: "فاطمة",
    images: [
      "/images/science1.jpg",
      "/images/science2.jpg"
    ],
    comments: [],
  },
];

type Props = {
  params: {
    id: string;
  };
};

export default function DetailsPage({ params }: Props) {
  const postId = Number(params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    notFound();
  }

  return <ShowDetails post={post} />;
}
