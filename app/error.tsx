"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <div className="state-panel state-panel--page"><span className="state-panel__icon" aria-hidden="true">!</span><h1>ไฟใน Lobby สะดุด</h1><p>เกิดข้อผิดพลาดชั่วคราว ลองโหลดส่วนนี้อีกครั้ง</p><button className="button button--primary" onClick={reset}>ลองอีกครั้ง</button></div>;
}
