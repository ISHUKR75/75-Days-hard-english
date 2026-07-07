'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// Redirect to main AI tutor page
export default function AITutorChatPage() {
  const router = useRouter();
  useEffect(() => { router.replace('/ai-tutor'); }, []);
  return null;
}
