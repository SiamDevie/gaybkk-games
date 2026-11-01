# AGENTS.md — gaybkk-games

> แนวทางปฏิบัติสำหรับ AI Coding Agents และผู้ร่วมพัฒนาใน Repository `gaybkk-games`<br />
> เว็บไซต์: **https://games.gaybkk.co** · แพลตฟอร์มหลัก: **https://gaybkk.co**

## 1. 🎯 ภารกิจและขอบเขต

พัฒนาแพลตฟอร์มมินิเกมและประสบการณ์ Interactive สำหรับชุมชน gaybkk.co โดยเน้น **Mobile-First, Performance, Accessibility, Security และ Maintainability** เกมควรเริ่มเล่นได้ง่าย รองรับ Casual / Party / Quiz และเนื้อหา Sexy / Adult 18+ รวมถึงกิจกรรม Pride Month และ Songkran

**สถานะ:** โครงการกำลังพัฒนา รายละเอียดในเอกสารนี้เป็นข้อกำหนดและเป้าหมาย ไม่ใช่การยืนยันว่าฟีเจอร์ทั้งหมดถูกติดตั้งแล้ว

### หลักปฏิบัติสำคัญ

1. **Inspect before edit:** สำรวจไฟล์จริง, `package.json`, โครงสร้างระบบ และ Git diff ก่อนแก้ไข อย่าตีความตัวอย่างใน README ว่าเป็นไฟล์ที่มีอยู่จริง
2. **Minimal changes:** แก้เฉพาะส่วนที่เกี่ยวข้อง รักษาพฤติกรรมเดิมและงานที่ยังไม่ Commit ห้ามลบหรือเขียนทับงานผู้อื่นโดยพลการ
3. **Security by default:** ทุกการเปลี่ยนแปลงด้าน Auth, คะแนน, Firestore และ API ต้องออกแบบการตรวจสอบสิทธิ์ตั้งแต่ต้น
4. **No invented integrations:** อย่าอ้างว่า SSO, Leaderboard, Anti-Cheat หรือระบบ Production พร้อมใช้งาน หากยังไม่มีหลักฐานในโค้ดและผลทดสอบ
5. **Explain and verify:** รายงานไฟล์ที่แก้ เหตุผล คำสั่งตรวจสอบ และข้อจำกัดตามผลจริง ไม่กล่าวว่า "ผ่าน" หากไม่ได้รัน

### 🔞 Adult Content: ข้อกำหนดสำหรับ AI Agents

- โครงการมีทิศทางเป็น **18+ Gay Entertainment & Interactive Gaming** ไม่ใช่เว็บเกมสำหรับเด็ก; ห้ามออกแบบหน้าสาธารณะให้แสดงคอนเทนต์ผู้ใหญ่ก่อนผ่านขั้นตอนควบคุมการเข้าถึงที่เหมาะสม
- รองรับ `SPICY`, `HOT`, `XXX`, `AFTER_DARK` เป็น **content labels**; ให้เก็บ `contentRating`, `contentWarnings`, `accessPolicy` คนละฟิลด์/แนวคิด อย่าใช้ label แทน authorization
- **อย่าสมมติว่าการคลิก “ฉันอายุ 18+” เป็นการยืนยันอายุที่เพียงพอในทุกพื้นที่**; การเผยแพร่จริงต้องตรวจข้อกฎหมาย พื้นที่ให้บริการ และนโยบาย Hostinger, Firebase, payment/CDN/asset providers ที่เกี่ยวข้อง
- สื่อที่ใช้ต้องมีสิทธิ์และความยินยอมที่ตรวจสอบได้ ผู้ปรากฏในภาพต้องเป็นผู้ใหญ่ ห้ามใช้สื่อส่วนตัวของผู้อื่นโดยไม่ได้รับอนุญาต; ไม่มีเนื้อหาเกี่ยวกับผู้เยาว์ การข่มขืนบังคับ หรือการเปิดเผยข้อมูลอ่อนไหวโดยไม่ยินยอม
- ห้ามเผยแพร่/จัดอันดับรสนิยมทางเพศ ประวัติการเล่นเกมผู้ใหญ่ หรือการเลือกระดับเนื้อหาบนโปรไฟล์สาธารณะโดยปริยาย; จำกัดการเก็บ analytics และ log ให้จำเป็น
- เกม Party ต้องมี **Skip / Exit / Report** ที่ใช้ได้จริง ไม่บังคับให้ผู้เล่นเปิดเผยประสบการณ์ส่วนตัวหรือทำภารกิจที่ละเมิดขอบเขตผู้อื่น
- อย่าอนุมานรสนิยมทางเพศ บทบาททางเพศ หรืออัตลักษณ์ของบุคคลจริงจากภาพหรือบุคลิก; เกมแนว Gaydar/Top-Bottom ให้เป็นเรื่องสมมติหรือ self-selected เท่านั้น
- ข้อกำหนดนี้เป็น **product intent** ไม่ใช่การยืนยันว่าระบบ Age Verification, moderation หรือคลังสื่อพร้อมใช้งานแล้ว


## 2. 🧱 Technical Baseline

| ส่วนงาน | แนวทาง |
| --- | --- |
| Framework | Next.js **App Router** + React + TypeScript |
| Styling | Tailwind CSS; คำนึงถึงหน้าจอมือถือก่อน |
| โครงสร้าง | ใช้ `app/` ที่ **root** ไม่มี `src/` เว้นแต่ได้รับอนุมัติเปลี่ยนโครงสร้าง |
| Game Rendering | HTML5 Canvas / WebGL; เลือก Phaser หรือ Pixi.js ตามความจำเป็น |
| Identity | Firebase Authentication; เชื่อมบัญชีกับ gaybkk.co ผ่านกลไกที่ตรวจสอบแล้ว |
| Data | Cloud Firestore สำหรับคะแนน อันดับ และ Badge |
| Runtime | Node.js; Hostinger VPS + PM2 |
| Network | Next.js listen ที่ `***.*.*.*:****` หลัง Nginx Reverse Proxy และ HTTPS |

**สำคัญ:** ตรวจเวอร์ชันจริงจาก lockfile และ `package.json` ก่อนใช้คำสั่งหรือ API เฉพาะเวอร์ชัน ห้ามเพิ่ม Library/Game Engine โดยไม่มีเหตุผลชัดเจน

## 3. 📁 โครงสร้างและความรับผิดชอบ

โครงสร้างเป้าหมาย (ไม่ใช่รายการไฟล์ยืนยัน):

```text
app/                  # Pages, Layouts, Route Handlers (App Router)
components/           # UI และ reusable game components
games/                # Logic, scenes และกฎเฉพาะแต่ละเกม
lib/firebase/         # Firebase client/admin initialization
lib/auth/             # Session / token verification
lib/                  # Shared utilities, services, validation
hooks/                # React hooks
public/               # Static assets
types/                # Shared TypeScript types
```

- **Server Components เป็นค่าเริ่มต้น:** ใช้ `"use client"` เฉพาะเมื่อจำเป็นต่อ interaction, hooks, browser APIs หรือเกม Canvas
- **Browser-only engines:** โหลด Canvas/WebGL/Phaser/Pixi.js เฉพาะฝั่ง Client; ระวัง SSR และใช้ dynamic import เมื่อเหมาะสม
- **Route Handlers / server services:** เป็นจุดตรวจสอบ token, input, authorization และบันทึกคะแนน หลีกเลี่ยง business logic สำคัญที่ไว้ใจ Client
- **Boundary:** ห้าม import `firebase-admin` หรือ Server Secrets เข้าสู่ Client Bundle; พิจารณาใช้ `server-only` ในโมดูลเซิร์ฟเวอร์
- **One source of truth:** ประเภทข้อมูลและ validation ที่ใช้ร่วมกันต้องชัดเจน ไม่กระจายการกำหนดกติกาคะแนนซ้ำหลายจุด

## 4. 🧑‍💻 มาตรฐานการเขียนโค้ด

- เขียน **TypeScript แบบ type-safe**; หลีกเลี่ยง `any`, unsafe casting และการปิด TypeScript/ESLint เพียงเพื่อให้ Build ผ่าน
- ใช้ชื่อไฟล์และตัวแปรสื่อความหมาย; แยก UI, game loop, persistence และ authentication อย่างเหมาะสม
- ทำ Components ให้เล็ก ทดสอบได้ และมี loading/error/empty states
- ให้ UI ตอบสนองต่อ Touch, Mouse และ Keyboard ตามประเภทเกม รองรับการหมุนหน้าจอและหน้าจอขนาดเล็ก
- ทำความสะอาด animation frames, timers, event listeners และ game instances เมื่อ unmount
- อย่าสร้าง renderer หรือเกม instance ซ้ำทุกครั้งที่ React render; ควบคุม lifecycle ชัดเจน
- ป้องกัน performance regression: ลด bundle, lazy-load เกมเมื่อผู้ใช้เลือก, จำกัดการเรียก Firestore และ optimize assets
- รองรับการเข้าถึงขั้นพื้นฐาน: ป้ายกำกับ, contrast, focus, keyboard navigation และทางเลือกสำหรับ animation ที่รุนแรง
- อย่าเพิ่ม dependency หรือเปลี่ยน config/project conventions หากไม่จำเป็น

## 5. 🔐 Authentication, Firestore และ Security

### ข้อห้ามและข้อกำหนด

- **อย่าสมมติว่า Firebase Auth แชร์สถานะล็อกอินระหว่าง `gaybkk.co` และ `games.gaybkk.co` ได้เอง** แม้ใช้ Firebase Project เดียวกัน; ต้องออกแบบและทดสอบ cross-subdomain authentication/session handoff อย่างปลอดภัย
- ตรวจสอบ Firebase ID Token หรือ Session Cookie **ฝั่ง Server** และตรวจ claims/สิทธิ์ในทุก API ที่เป็น Protected Action
- คะแนนจาก Browser ถือเป็น **untrusted input** เสมอ: ต้องตรวจผู้ใช้ เกม session, กติกา, ความสมเหตุสมผล, replay/duplicate submission และ rate limit ตามความเสี่ยง
- ห้ามให้ Client กำหนดผู้ชนะ, Badge พิเศษ หรือแก้ข้อมูลคะแนนของผู้อื่นโดยตรงโดยไร้การตรวจสอบ
- ออกแบบ Firestore Security Rules แบบ least privilege; ปฏิเสธโดยค่าเริ่มต้น และทดสอบ Rules ก่อน Deploy
- ใช้ transaction / atomic update สำหรับข้อมูลที่ต้องสอดคล้องกัน; ออกแบบ leaderboard ให้รองรับการ sort/index และต้นทุน read/write
- ปกป้องข้อมูลส่วนบุคคล; เก็บเฉพาะข้อมูลจำเป็น ไม่บันทึก tokens, credentials หรือ PII ลง logs
- ตรวจและ sanitize input; ระวัง XSS, CSRF (โดยเฉพาะ cookie-based sessions), CORS, injection และ abuse
- ห้ามเปิดเผย Service Account Private Key, PM2 environment dump หรือ production credentials ใน issue, chat, PR และ commit

### Environment Variables

- เก็บ secrets ใน `.env.local` (local) หรือ secure environment/config บน Server; **ห้าม Commit** `.env.local`, `.env.production`, credentials และ service-account JSON
- ตัวแปร `NEXT_PUBLIC_*` จะถูกส่งไป Client Bundle: ใช้เฉพาะค่า Client Firebase config ที่ตั้งใจเปิดเผยได้ **ไม่ใช่ secrets**
- ตรวจ `.gitignore` และจัดทำ `.env.example` พร้อม placeholders เท่านั้น
- กำหนด `PORT=3001` สำหรับการรันแอป; โปรดตรวจ scripts จริงก่อนเลือกคำสั่ง start/dev
- การหมุนเวียน secret และการเปลี่ยน Firebase Rules/Indexes ใน Production ต้องมีการตรวจสอบผลกระทบ

## 6. 🕹️ Game & Leaderboard Rules

1. แต่ละเกมต้องระบุ **game ID/slug**, กติกา, วิธีคิดคะแนน, เงื่อนไขจบเกม, `contentRating`, `contentWarnings`, `accessPolicy` และรูปแบบข้อมูลอย่างชัดเจน
2. แยกผลลัพธ์แบบ provisional บน Client ออกจากคะแนนที่ Server ยืนยันแล้ว
3. ควรมี `submissionId`/idempotency key หรือกลไกเทียบเท่า เพื่อป้องกันการบันทึกผลซ้ำ
4. ผูกคะแนนกับ `uid` ที่ได้จาก token ที่ตรวจสอบแล้ว ไม่ใช่ `uid` ที่รับมาจาก Client อย่างเดียว
5. กำหนดการเรียงอันดับและการตัดสินเสมอให้สม่ำเสมอ; ออกแบบการแบ่งช่วงเวลา Event/Season
6. Badge และ rewards ต้องอนุมัติฝั่ง Server พร้อมบันทึกข้อมูลที่ตรวจสอบย้อนกลับได้ตามความเหมาะสม
7. ออกแบบสิทธิ์สำหรับกิจกรรมชุมชนให้ไม่เปิดเผยข้อมูลผู้ใช้เกินความจำเป็น
8. หากเกมมีการแข่งขัน คะแนน หรือระบบสุ่ม ห้ามโฆษณาว่าปลอดโกงหรือสุ่มยุติธรรมโดยไม่มีหลักฐานการทดสอบ

## 7. 🧪 Workflow และ Quality Gates

ก่อนเริ่มงาน:

```bash
git status --short
# ตรวจ package.json และโครงสร้างที่มีอยู่ก่อน
```

ระหว่างพัฒนา: ทำงานทีละส่วน เลี่ยง refactor นอกขอบเขต และเพิ่ม/แก้ tests ตามฟีเจอร์จริง ถ้ากระทบ Firebase หรือ deployment ให้แยก local/staging/prod อย่างระมัดระวัง

ก่อนส่งมอบ ให้ตรวจ **เฉพาะคำสั่งที่มีอยู่จริงใน `package.json`** ตามลำดับที่เกี่ยวข้อง เช่น:

```bash
npm run lint           # ถ้ามี script นี้
npm run typecheck      # ถ้ามี script นี้
npm test               # ถ้ามี script นี้
npm run build          # ถ้ามี script นี้

git diff --check
git status --short
```

ตรวจด้วยตนเองเพิ่มเติมตามการเปลี่ยนแปลง:

- Mobile layouts, touch interaction, console errors และ Canvas/WebGL cleanup
- Authentication: guest, signed-in, expired token, unauthorized user และ cross-subdomain flows
- Firestore permissions: owner/non-owner, read/write limits, invalid score, repeated submission
- API input validation, loading/error states, accessibility และ build production

**เมื่อไม่สามารถตรวจสอบได้:** อธิบายสิ่งที่ไม่ได้รันและเหตุผล ห้ามสร้างผลทดสอบสมมติ

## 8. 🚀 Deployment & Operations

สถาปัตยกรรมเป้าหมาย:

```text
User (HTTPS)
    ↓
Nginx — games.gaybkk.co (TLS termination)
    ↓ Reverse Proxy
Next.js / Node.js — ***.*.*.*:****
    ↑ managed by PM2 on Hostinger VPS
    ↕
Firebase Auth + Cloud Firestore
```

- Deployment ต้องตรวจ build, environment, Firebase project, rules/indexes, health และ logs ก่อนเปลี่ยน traffic
- รัน PM2 ภายใต้ user ที่มีสิทธิ์เท่าที่จำเป็น; restart แบบมีการควบคุมและเก็บ rollback path
- Nginx ต้อง forward headers ที่เหมาะสม, เปิด HTTPS และไม่ expose Port 3001 สู่สาธารณะโดยไม่จำเป็น
- ห้ามรัน database reset, ลบ collections, deploy rules, เปลี่ยน secrets, restart production หรือแก้ Nginx production โดยไม่มีการอนุมัติชัดเจน
- อย่า hardcode URL, key หรือ Firebase Project ID เฉพาะ Environment ใน source code

## 9. 🤝 Git, PR และการสื่อสาร

- ใช้ commit ขนาดเล็ก ข้อความสื่อเจตนา เช่น `feat(games): add quiz lobby` หรือ `fix(auth): verify session token`
- ไม่ force-push, ไม่ rewrite history, ไม่ลบ branch หรือแก้ settings ที่มีผลกระทบโดยไม่ได้รับอนุญาต
- PR ควรระบุ: **สิ่งที่เปลี่ยน · เหตุผล · วิธีทดสอบ · ความเสี่ยงด้าน Auth/Firestore · Screenshot (ถ้าเปลี่ยน UI)**
- ถ้ามีการเปลี่ยน API, environment variables, data model, content policy หรือวิธี deploy ให้ปรับ `README.md`, `docs/` และ `.env.example` ที่เกี่ยวข้องให้ตรงกับการใช้งานจริง
- รายงานการส่งมอบเป็นภาษาไทยอย่างกระชับ โดยใช้ชื่อไฟล์/คำสั่ง/identifiers ตามจริง

## 10. ✅ Definition of Done

งานถือว่าเสร็จเมื่อ: โค้ดตรงตามข้อกำหนด ไม่มีความลับหลุด ไม่ทำลายระบบเดิม มีการจัดการ error/edge cases, ผ่าน quality gates ที่มีอยู่จริง และระบุผลการตรวจสอบ/ข้อจำกัดอย่างโปร่งใส

---

**Project Owner:** gaybkk.co · **Repository:** `gaybkk-games` · **License:** Proprietary — สงวนลิขสิทธิ์

> หากคำสั่งจากงานย่อยขัดกับ Security Rules ในเอกสารนี้ ให้เลือกแนวทางที่ปลอดภัยกว่าและแจ้งความขัดแย้งก่อนดำเนินการเสี่ยง
