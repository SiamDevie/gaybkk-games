"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { BrandMark } from "@/components/ui/brand-mark";

const AGE_GATE_KEY = "gaybkk-games:adult-gate:v1";

type GateState = "prompt" | "declined";

const AGE_GATE_EVENT = "gaybkk-games:age-gate-change";

function subscribeToAgeGate(callback: () => void) {
  window.addEventListener(AGE_GATE_EVENT, callback);
  return () => window.removeEventListener(AGE_GATE_EVENT, callback);
}

function getAgeGateSnapshot() {
  return window.sessionStorage.getItem(AGE_GATE_KEY) === "accepted";
}

export function AgeGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GateState>("prompt");
  const accepted = useSyncExternalStore(
    subscribeToAgeGate,
    getAgeGateSnapshot,
    () => false,
  );

  function acceptGate() {
    window.sessionStorage.setItem(AGE_GATE_KEY, "accepted");
    window.dispatchEvent(new Event(AGE_GATE_EVENT));
  }

  return (
    <>
      <div className={accepted ? undefined : "age-gated-content"} aria-hidden={!accepted}>
        {children}
      </div>
      {!accepted ? (
        <main className="gate">
          <div className="gate__ambient gate__ambient--one" />
          <div className="gate__ambient gate__ambient--two" />
          <section className="gate__card" aria-labelledby="age-gate-title">
            <BrandMark />
            <div className="gate__badge">18+</div>
            {state === "declined" ? (
              <>
                <p className="eyebrow">เข้าใจแล้ว</p>
                <h1 id="age-gate-title">พื้นที่นี้สำหรับผู้ใหญ่เท่านั้น</h1>
                <p className="gate__copy">คุณสามารถกลับไปยัง gaybkk.co หรือปิดหน้านี้ได้ทุกเมื่อ</p>
                <a className="button button--primary" href="https://gaybkk.co">ไปที่ gaybkk.co</a>
                <button className="text-button" onClick={() => setState("prompt")}>กลับไปตรวจสอบอีกครั้ง</button>
              </>
            ) : (
              <>
                <p className="eyebrow">ก่อนเข้าสู่ GAYBKK GAMES</p>
                <h1 id="age-gate-title">คุณมีอายุ 18 ปีขึ้นไปหรือไม่?</h1>
                <p className="gate__copy">
                  แพลตฟอร์มนี้มีธีมและอารมณ์ขันสำหรับผู้ใหญ่ แต่ Phase 1
                  ยังไม่มีสื่อโจ่งแจ้ง การยืนยันนี้เป็นเพียงการควบคุมประสบการณ์เบื้องต้น
                  ไม่ใช่การพิสูจน์อายุตามกฎหมาย
                </p>
                <div className="gate__actions">
                  <button className="button button--primary" onClick={acceptGate}>ฉันอายุ 18 ปีขึ้นไป</button>
                  <button className="button button--secondary" onClick={() => setState("declined")}>ออกจากหน้านี้</button>
                </div>
                <p className="gate__privacy">ไม่เก็บวันเกิดหรือเอกสารระบุตัวตนในขั้นตอนนี้</p>
              </>
            )}
          </section>
        </main>
      ) : null}
    </>
  );
}
