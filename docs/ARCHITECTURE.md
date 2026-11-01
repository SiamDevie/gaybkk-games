# 🏗️ สถาปัตยกรรมระบบ — gaybkk-games

> **Project:** `gaybkk-games` · **Application:** `https://games.gaybkk.co`<br />
> **Platform:** `https://gaybkk.co` · **Architecture:** Next.js App Router + Firebase + Hostinger VPS<br />
> **สถานะเอกสาร:** Target Architecture / Design Baseline — อธิบายแนวทางเป้าหมาย **ไม่ใช่คำยืนยันว่าทุกส่วนพัฒนาเสร็จแล้ว**

## 1. 🎯 วัตถุประสงค์และขอบเขต

`gaybkk-games` คือเว็บแอปมินิเกมและกิจกรรม Interactive ของระบบนิเวศ **gaybkk.co** เน้นเกม Casual / Party / Quiz ที่เล่นง่ายบนมือถือ มีบัญชีผู้ใช้เชื่อมโยงกับแพลตฟอร์มหลัก คะแนน อันดับ เหรียญรางวัล และกิจกรรมตามเทศกาล เช่น Pride Month และ Songkran

**หลักการออกแบบ**

- **แยกการ Deploy:** `games.gaybkk.co` ทำงานเป็นแอปแยกจากเว็บไซต์หลัก เพื่อให้ปล่อยเวอร์ชัน ปรับประสิทธิภาพ และกำหนดมาตรการความปลอดภัยแยกกันได้
- **เชื่อมตัวตน ไม่แชร์ความเชื่อถือโดยอัตโนมัติ:** ใช้ Firebase Authentication และข้อมูลผู้ใช้ที่ตกลงร่วมกัน แต่ต้องออกแบบขั้นตอนเข้าสู่ระบบระหว่างโดเมนอย่างปลอดภัย
- **Mobile-first:** โหลด Lobby ได้รวดเร็ว โหลดเอนจินของแต่ละเกมเมื่อจำเป็น รองรับ Touch และหน้าจอขนาดเล็ก
- **Server-authoritative:** คะแนน อันดับ และรางวัลที่มีผลต่อผู้อื่นต้องผ่านการตรวจสอบ/อนุมัติฝั่ง Server
- **Minimum necessary data:** ใช้ข้อมูลผู้ใช้เท่าที่จำเป็นและจำกัดสิทธิ์อ่านเขียนตามบทบาท

**นอกขอบเขตเริ่มต้น:** ระบบเดิมพันด้วยเงินจริง การออกเงินรางวัลอัตโนมัติ และการอ้างว่าเกมมีระบบป้องกันโกงสมบูรณ์แบบ

## 2. 🧭 ภาพรวมสถาปัตยกรรม

```text
                         ผู้ใช้ (Mobile / Desktop Browser)
                                      │ HTTPS
                                      ▼
                           games.gaybkk.co (DNS)
                                      │
                                      ▼
                      Nginx Reverse Proxy + TLS/SSL
                              Hostinger VPS
                                      │
                         proxy → 127.0.0.1:3001
                                      ▼
                       Next.js / Node.js (PM2)
                       ┌────────────────────────┐
                       │ App Router             │
                       │ - Lobby / Pages        │
                       │ - Client Game Runtime  │
                       │ - Route Handlers / API │
                       └────────────┬───────────┘
                                    │
                 ┌──────────────────┴──────────────────┐
                 ▼                                     ▼
          Firebase Auth                        Cloud Firestore
       ตรวจสอบตัวตน/Token                   Profiles / Scores /
                                             Rankings / Badges

          gaybkk.co ──── [Secure Auth Handoff] ──── games.gaybkk.co
          (เว็บไซต์หลัก)  (ต้องออกแบบและทดสอบ)    (แอปเกม)
```

**Trust boundaries:** เบราว์เซอร์และ payload ทุกชนิดเป็นข้อมูลที่ยังเชื่อถือไม่ได้; Next.js Route Handlers ที่ตรวจสอบสิทธิ์แล้วจึงดำเนินการกับข้อมูลที่มีสิทธิ์; Firebase Admin SDK ใช้เฉพาะ Server และไม่อยู่ใน Client Bundle

## 3. 🧱 ชั้นของระบบและความรับผิดชอบ

| Layer | เทคโนโลยี | ความรับผิดชอบ |
|---|---|---|
| Presentation | Next.js App Router, React, Tailwind CSS | Lobby, รายการเกม, หน้าคะแนน, โปรไฟล์, Responsive UI |
| Game Runtime | HTML5 Canvas / WebGL; Phaser หรือ Pixi.js ตามเกม | Render, Input, Game Loop, เอฟเฟกต์ และผลการเล่นเบื้องต้น |
| Server/API | Next.js Route Handlers, TypeScript | ตรวจ Token, Validate Payload, Rate Limit, ตรวจผลเกม, เขียนข้อมูล |
| Identity | Firebase Authentication | UID และการยืนยันตัวตนของผู้เล่น |
| Persistence | Cloud Firestore | โปรไฟล์ที่จำเป็น, Sessions, Results, Leaderboards, Badges, Events |
| Infrastructure | Hostinger VPS, Node.js, PM2, Nginx, HTTPS | รันแอป, Reverse Proxy, Process Management, TLS |

**Rendering boundary:** ใช้ Server Components เป็นค่าเริ่มต้นสำหรับหน้า/ข้อมูลที่เหมาะสม ส่วนเอนจินเกมและ browser APIs ต้องอยู่ใน Client Components (`'use client'`) และโหลดเมื่อเข้าเกม; ระวัง SSR และ hydration mismatch

## 4. 📁 โครงสร้างโปรเจกต์ (เป้าหมาย)

ใช้ **Next.js App Router แบบไม่มี `src/`** โดยแยกหน้าจอ เกม และบริการออกจากกัน:

```text
gaybkk-games/
├── app/
│   ├── api/
│   │   ├── scores/route.ts           # ส่งผลการเล่นให้ Server ตรวจสอบ
│   │   └── leaderboards/route.ts     # อ่านอันดับที่อนุญาตให้เปิดเผย
│   ├── games/
│   │   ├── page.tsx                  # Games Lobby
│   │   └── [slug]/page.tsx           # หน้าเล่นเกม
│   ├── leaderboard/page.tsx
│   ├── profile/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── games/                        # Game Shell, HUD, Controls
│   └── ui/                           # Shared UI
├── games/                            # แต่ละเกม: config, scenes, rules, assets mapping
├── hooks/
├── lib/
│   ├── firebase/
│   │   ├── client.ts                 # Firebase Web SDK
│   │   └── admin.ts                  # Firebase Admin SDK; server-only
│   ├── auth/                         # ตรวจ ID Token / Session
│   ├── scores/                       # Validation, Scoring, Anti-abuse
│   └── validations/                  # Shared input schemas
├── types/
├── public/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── FIREBASE.md
│   ├── GAME-DEVELOPMENT.md
│   └── DEPLOYMENT.md
├── .env.example                      # Placeholder เท่านั้น
├── .env.local                        # Local secrets; Git ignored
├── AGENTS.md
├── README.md
├── package.json
├── next.config.ts
└── tsconfig.json
```

> เป็นโครงสร้างอ้างอิงสำหรับการพัฒนา ให้ตรวจ Repository จริงก่อนสร้าง/ย้ายไฟล์ และหลีกเลี่ยงการสร้างโมดูลที่ยังไม่มีความจำเป็น

### 4.1 🔞 Adult Content Boundary (Target Architecture)

```text
User / Browser
  ↓
Public Entry (ไม่ preload สื่อผู้ใหญ่)
  ↓ Age Gate + policy evaluation
Adult Access Service (Server-side: อายุ/ภูมิภาค/สิทธิ์/การยินยอมตามที่กฎหมายกำหนด)
  ├─ deny → Safe fallback / explanation
  └─ allow → Game Lobby filtered by accessPolicy
                    ↓
           Protected Asset / Game API
```

- **แยก 3 ค่า:** `contentRating` = `SPICY | HOT | XXX | AFTER_DARK`; `contentWarnings` = คำเตือนตามเนื้อหาจริง; `accessPolicy` = นโยบายสิทธิ์ (อายุ, พื้นที่, สิทธิ์บัญชี, การยินยอม) อย่าตีความว่าระดับมีลำดับแบบตัวเลขหนึ่งเดียว เพราะ `AFTER_DARK` เป็นแนวธีม ไม่จำเป็นต้องโป๊มากกว่า `XXX`
- Age Gate เป็นชั้น UX เบื้องต้น **ไม่ใช่หลักฐานอายุที่เชื่อถือได้**; การยืนยันอายุต้องกำหนดตามข้อกำหนดทางกฎหมายและผู้ให้บริการที่ใช้งานจริง
- ต้องตรวจสิทธิ์ที่ **Server/API** ก่อนส่ง protected media หรือข้อมูลเกม ไม่ใช้เพียงการซ่อน UI; หลีกเลี่ยงการวางไฟล์เนื้อหาจำกัดไว้ใน `public/` ที่เข้าถึงผ่าน URL ตรงโดยไม่มีมาตรการป้องกัน
- ออกแบบ media delivery ด้วยสิทธิ์เข้าถึงแบบจำกัดอายุสั้น (เช่น signed URL เมื่อผู้ให้บริการรองรับ), cache policy ที่ไม่เปิดเผย และเนื้อหา preview ที่ปลอดภัย
- แยก adult preferences และ access decisions ออกจาก `user profile` สาธารณะ; เก็บข้อมูลยืนยันอายุแบบขั้นต่ำ ไม่เก็บเอกสารยืนยันตัวตนหากไม่จำเป็น
- มีขั้นตอนถอดเนื้อหาที่ถูกร้องเรียนและระบบตรวจสอบสิทธิ์ในสื่อ (consent/license/provenance); ตรวจนโยบายโฮสติ้งและกฎหมายก่อนเปิดใช้แต่ละระดับ

**สถานะ:** เป็นการออกแบบเป้าหมาย ยังไม่มีหลักฐานว่าติดตั้งระบบดังกล่าวแล้ว


## 5. 🔐 Identity & Shared Profile

**ข้อเท็จจริงสำคัญ:** `gaybkk.co` และ `games.gaybkk.co` เป็นคนละ origin; การใช้ Firebase Project เดียวกัน **ไม่ได้ทำให้สถานะล็อกอินในเบราว์เซอร์แชร์กันโดยอัตโนมัติ**

**แนวทางเป้าหมาย**

1. ผู้ใช้เข้าสู่ระบบกับ `gaybkk.co` หรือหน้า Sign-in ที่ได้รับอนุญาต
2. หากต้องการ Single Sign-On ให้ใช้ **secure handoff** ที่ตรวจสอบต้นทาง/ปลายทาง มีอายุสั้น ใช้ครั้งเดียว และป้องกัน replay; ห้ามส่ง ID Token หรือ Session Token ผ่าน URL query string
3. ฝั่ง `games.gaybkk.co` ยืนยันตัวตนและสร้างสถานะ Session ที่เหมาะสมกับ origin/โดเมน ก่อนเรียก Protected API
4. Route Handler ตรวจ Firebase ID Token หรือ Session Cookie ฝั่ง Server แล้วดึง `uid` จากข้อมูลที่ผ่านการตรวจสอบเท่านั้น
5. โหลดข้อมูลโปรไฟล์ที่จำเป็นผ่าน Data Access Layer พร้อมข้อกำหนดการอ่านข้อมูลที่สอดคล้องกันกับเว็บไซต์หลัก

**การตัดสินใจที่ต้องยืนยันก่อนลงมือ:** วิธี SSO (redirect/handoff หรือ sign-in แยก), cookie scope และ SameSite, session revocation, account linking, logout propagation, และเอกสารสัญญาข้อมูลระหว่างสองแอป ห้ามตั้ง shared cookie แบบกว้างโดยไม่มีการประเมินความเสี่ยง CSRF/session fixation

## 6. 🕹️ ลำดับการทำงานของเกมและคะแนน

```text
เลือกเกม → โหลดเฉพาะ Engine/Assets → เริ่ม Game Session (Server)
       → เล่นเกมบน Client → ส่งผล + sessionId + submissionId
       → API ตรวจ Auth/Schema/Session/Rate Limit/Replay/Rules
       → บันทึกผลที่ยอมรับ → อัปเดตอันดับ/รางวัลที่เกี่ยวข้อง
       → ส่งผลการยืนยันกลับ UI
```

**กฎสำคัญ**

- Client แสดงคะแนนระหว่างเล่นได้ แต่ถือเป็น **provisional score** จนกว่า Server ยืนยัน
- ผูกทุกผลลัพธ์กับ `uid` จาก Token ที่ตรวจสอบแล้ว ไม่รับ `uid` ที่ผู้ใช้ส่งมาเป็นแหล่งอ้างอิงสิทธิ์
- ตรวจ `gameId`, `rulesVersion`, ระยะเวลาเล่น, กติกา, คะแนนสูงสุด/ช่วงที่เป็นไปได้ และข้อจำกัดเฉพาะเกม
- ใช้ `submissionId` แบบ unique/idempotent และ Game Session ที่มีอายุ เพื่อจัดการส่งซ้ำหรือ replay
- หากจำเป็นให้ใช้องค์ประกอบแบบ server-verified challenges, event logs หรือ server-generated seeds ตามความเสี่ยงของเกม; **การตรวจค่าคะแนนเพียงอย่างเดียวไม่รับประกันว่าป้องกันโกงได้**
- การให้ Badge หรือการประกาศผู้ชนะต้องเกิดจากเงื่อนไขฝั่ง Server และมีหลักฐานตรวจสอบได้

### 6.1 ขอบเขต API (ตัวอย่างสัญญา ไม่ใช่ API ที่ยืนยันว่ามีแล้ว)

| Endpoint | Method | Authentication | พฤติกรรม |
|---|---|---|---|
| `/api/scores` | `POST` | Required | ตรวจสอบและรับผลการเล่น |
| `/api/leaderboards?gameId=...` | `GET` | ตามนโยบายเปิดเผย | คืนอันดับที่อนุญาตให้มองเห็น |

กำหนด HTTP status/response schema/versioning และข้อจำกัดจำนวนคำขอในเอกสาร API หรือโค้ดจริงก่อนเปิดให้ Client ใช้งานใน Production

## 7. 🗂️ Firestore Data Model (ข้อเสนอเริ่มต้น)

| Collection / Path | ข้อมูลหลัก | ผู้มีสิทธิ์เขียน |
|---|---|---|
| `users/{uid}` | Display name ที่อนุญาต, avatar, preferences ขั้นต่ำ | ตามนโยบายโปรไฟล์ร่วม |
| `gameSessions/{sessionId}` | `uid`, `gameId`, `rulesVersion`, `createdAt`, `expiresAt`, `status` | Trusted Server |
| `gameResults/{resultId}` | `uid`, `gameId`, `score`, `submissionId`, `verifiedAt`, `rulesVersion` | Trusted Server |
| `leaderboards/{boardId}/entries/{uid}` | คะแนนที่จัดอันดับ, tie-break metadata, season | Trusted Server |
| `userBadges/{uid}/items/{badgeId}` | Badge, `awardedAt`, `source` | Trusted Server |
| `events/{eventId}` | Theme, start/end, eligibility, status | Authorized Admin |

**ข้อตกลงข้อมูล:** ตารางนี้เป็นเพียง *proposed schema* ต้องเทียบกับฐานข้อมูลและโครงสร้าง UID ของ `gaybkk.co` ก่อนใช้งานจริงเพื่อป้องกันการเขียนทับข้อมูลเดิม; กำหนด composite indexes, retention, TTL และต้นทุน read/write ให้ตรงกับรูปแบบ query

- แยก **canonical game results** จาก **leaderboard projections** เพื่อรองรับการคำนวณอันดับซ้ำ
- ใช้ Firestore transaction หรือวิธี atomic ที่เหมาะสมเมื่อผลและอันดับต้องสอดคล้องกัน
- หลีกเลี่ยงการเขียนข้อมูลลง document เดียวพร้อมกันปริมาณมาก; วางแผนสำหรับ concurrent writes และต้นทุน
- ข้อมูลส่วนบุคคลและข้อมูลที่ไม่เปิดเผยต้องไม่ถูกอ่านได้เพียงเพราะเดา document ID

### 7.1 Content Metadata & Access Model (Proposed)

| Data | Example | Security |
| --- | --- | --- |
| `games/{gameId}` | `contentRating`, `contentWarnings[]`, `accessPolicyId`, `publicationStatus` | Public อ่านเฉพาะ metadata ที่อนุญาต |
| `contentPolicies/{policyId}` | age/region/entitlement requirements | Admin write; server-authoritative evaluation |
| `gameAdultPreferences/{uid}` | opt-in settings, warning filters | Owner/server only; ไม่แสดงบน leaderboard |
| `contentAssets/{assetId}` | license/consent review status, sensitivity, asset pointer | Trusted server/admin only; หลีกเลี่ยง URL สาธารณะสำหรับสื่อจำกัด |

อย่าเพิ่ม collection ชื่อเดียวกันใน Firebase Project ของเว็บไซต์หลักโดยไม่ตรวจ schema และ Rules ปัจจุบัน; รายละเอียดอยู่ใน `docs/FIREBASE.md`


## 8. 🛡️ Security Boundaries

| พื้นที่ | ข้อบังคับ |
|---|---|
| Client / Browser | ถือว่าข้อมูลถูกแก้ไขได้; ไม่มี Secret หรือ Firebase Admin SDK |
| API / Server | ตรวจ AuthN/AuthZ, schema, rate limit, idempotency และ business rules |
| Firestore | Deny by default, least privilege, Rules tests, ตรวจข้อมูลทุก write path |
| Credentials | `.env.local`/secure server environment เท่านั้น; ห้าม commit private keys |
| Web / Cookie | HTTPS, secure cookies ตาม session design, CSRF mitigation, security headers, XSS defense |
| Abuse | จำกัดคำขอ, บันทึกเหตุการณ์ผิดปกติแบบไม่เผย PII, ตรวจ score anomaly |

> Firebase Web Configuration (`NEXT_PUBLIC_FIREBASE_*`) ไม่ใช่ Admin Secret; ความปลอดภัยจริงขึ้นอยู่กับ Authentication, Authorization, Rules, App Check (ถ้าใช้) และ Server-side validation ไม่ใช่การซ่อน Web API Key

## 9. 🚀 Production Runtime & Deployment

```text
Internet (443/HTTPS)
       │
       ▼
Nginx: games.gaybkk.co
       │ proxy_pass http://127.0.0.1:3001
       ▼
PM2: gaybkk-games
       ▼
Next.js / Node.js (Port 3001)
       ├── Firebase Authentication
       └── Cloud Firestore
```

- ใช้ Hostinger VPS จัดการระบบปฏิบัติการ Node.js, PM2 และ Nginx; เปิดสู่สาธารณะผ่าน HTTPS เท่านั้น
- แอปควร listen ที่ `127.0.0.1:3001` หลัง Reverse Proxy เพื่อไม่เปิดพอร์ตแอปสู่ Internet โดยตรง
- คำสั่งตัวอย่างเมื่อ `package.json` มี `"start": "next start"`: `pm2 start npm --name "gaybkk-games" -- start -- -p 3001 -H 127.0.0.1`
- `PORT=3001` ใน `.env.local` **ไม่ได้ทำให้ Next.js CLI อ่านค่าเพื่อเลือกพอร์ตโดยอัตโนมัติ** จึงระบุ `-p 3001` ชัดเจนในการรัน
- จัดการ Environment Variables, process startup, log rotation, SSL renewal, health checks, backup/recovery และ rollback บน VPS ตามคู่มือ Deployment
- **อย่า Deploy ด้วยการคัดลอก Secrets ลง Git หรือแก้ไขระบบ Production โดยไม่ผ่านขั้นตอนอนุมัติ**

## 10. ⚡ Performance, Accessibility & Reliability

- **Lazy loading:** โหลด Phaser/Pixi.js และไฟล์เกมเฉพาะเกมที่ผู้เล่นเปิด เพื่อลด JavaScript ของ Lobby
- **Game lifecycle:** ปิด `requestAnimationFrame`, timers, listeners, audio contexts และ renderer เมื่อออกจากเกม
- **Asset strategy:** บีบอัดรูป/เสียง ใช้ caching ตามลักษณะไฟล์และตั้งข้อจำกัดการใช้หน่วยความจำบนมือถือ
- **Firestore reads:** query เฉพาะข้อมูลที่ต้องใช้, pagination และ listeners เฉพาะหน้าที่ใช้งาน; unsubscribe เมื่อออกจากหน้า
- **UX:** รองรับ touch/keyboard เมื่อเหมาะสม, loading/empty/error states, reduced-motion และ fallback เมื่อ WebGL ไม่รองรับ
- **Resilience:** แสดงข้อความเมื่อ Offline/Timeout, ป้องกันการส่งคะแนนซ้ำ, แยกกรณี retry ได้จากผลที่ไม่ควรส่งซ้ำ
- **Observability:** ติดตาม uptime, PM2 restarts, API errors, latency และ Firebase usage โดยไม่บันทึก token หรือข้อมูลส่วนบุคคลเกินจำเป็น

## 11. 🧪 Testing & Release Gates

ก่อน Merge/Deploy ให้ตรวจอย่างน้อย:

1. `npm run lint`, TypeScript checks และ `npm run build` **ตาม scripts ที่มีจริงใน `package.json`**
2. Unit tests สำหรับ scoring, validation, tie-break, duplicate submission และกติกาแต่ละเกม
3. Integration tests สำหรับ API authentication, Firestore Rules และการเขียนผล/อันดับด้วยสิทธิ์ต่างกัน
4. ตรวจ cross-subdomain login/logout/revocation ในสถานการณ์จริงก่อนเปิด SSO
5. ทดสอบมือถือจริง/Responsive, touch input, performance และ cleanup เมื่อเปลี่ยน route
6. ทดสอบ Nginx HTTPS, reverse proxy headers, PM2 restart และ rollback พร้อมตรวจ Health/Logs

> หากยังไม่มีชุดทดสอบหรือ script ใด ต้องระบุเป็นงานที่ค้างอยู่ ห้ามอ้างว่าผ่านแล้ว

## 12. 📌 สิ่งที่ต้องตัดสินใจก่อน Production

| รายการ | สถานะ |
|---|---|
| Cross-subdomain SSO และ session lifecycle | **Pending design & verification** |
| Firestore collection contract ร่วมกับ gaybkk.co | **Pending alignment** |
| Score-verification strategy แยกตามเกม | **Pending implementation** |
| Leaderboard seasonal reset และ tie-break policy | **Pending product decision** |
| Firebase Rules, Indexes และ retention/backup | **Pending review** |
| Monitoring, rollback และ incident process | **Pending operations validation** |

## 13. 📚 เอกสารที่เกี่ยวข้อง

- [`../README.md`](../README.md) — ภาพรวมโปรเจกต์และการเริ่มใช้งาน
- [`../AGENTS.md`](../AGENTS.md) — กฎสำหรับ AI Coding Agents และทีมพัฒนา
- [`FIREBASE.md`](FIREBASE.md) — Auth, Firestore, Rules และข้อมูลร่วม (เอกสารตามแผน)
- [`GAME-DEVELOPMENT.md`](GAME-DEVELOPMENT.md) — มาตรฐานการสร้างเกมและคะแนน (เอกสารตามแผน)
- [`DEPLOYMENT.md`](DEPLOYMENT.md) — คู่มือ VPS, PM2, Nginx และ SSL (เอกสารตามแผน)

---

**Maintainer:** gaybkk.co · **Repository:** `gaybkk-games`<br />
**แนวทางดูแลเอกสาร:** เมื่อมีการเปลี่ยนโครงสร้าง ระบบยืนยันตัวตน หรือ data contract ต้องแก้เอกสารนี้พร้อมกับโค้ดและการทดสอบที่เกี่ยวข้อง
