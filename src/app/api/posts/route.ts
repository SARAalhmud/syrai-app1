import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const filePath = path.join(process.cwd(), 'data', 'posts.json')

export async function POST(request: Request) {
  try {
    // إنشاء مجلد وملف إذا لم يكونا موجودين
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
    }
    
    let posts = []
    if (fs.existsSync(filePath)) {
      posts = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }

    const newPost = await request.json()
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1
    
    const postToAdd = {
      ...newPost,
      id: newId,
      comments: newPost.comments || [] // احتفظ بالتعليقات إذا أرسلت أو استخدم مصفوفة فارغة
    }

    posts.push(postToAdd)
    console.log('Writing to:', filePath)
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2))

    return NextResponse.json(postToAdd, { status: 201 }) // أرجع المنشور الكامل
  } catch (error) {
    console.error('Error:', error) // سجل الخطأ
    return NextResponse.json(
      { error: 'Failed to save post' },
      { status: 500 }
    )
  }
}