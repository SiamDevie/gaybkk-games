# 🔥 Firebase Integration — gaybkk-games

> **แอปพลิเคชัน:** `https://games.gaybkk.co` · **แพลตฟอร์มหลัก:** `https://gaybkk.co`<br />
> **Stack:** Firebase Authentication · Cloud Firestore · Next.js App Router · TypeScript<br />
> **สถานะ:** Technical Design & Implementation Guide — เป็นแนวทางเป้าหมาย **ยังไม่ยืนยันว่าระบบ Production ติดตั้งครบแล้ว**

## 🔞 Adult Access, Consent & Privacy (Proposed)

แพลตฟอร์มมีเป้าหมายรองรับเกม 18+ รวมถึงธีม Sexy และสื่อภาพเปลือยของผู้ใหญ่ที่ได้รับอนุญาต **การล็อกอิน Firebase ไม่ใช่การยืนยันอายุ** และการติ๊ก “ฉันอายุ 18 ปีขึ้นไป” อาจไม่เพียงพอตามกฎหมาย/พื้นที่ให้บริการ; ต้องตรวจข้อกำหนดก่อนกำหนดวิธีตรวจอายุจริง

### Proposed access model (ไม่ใช่ Schema ที่ใช้งานแล้ว)

| ข้อมูล/ข้อกำหนด | ที่จัดเก็บหรือผู้รับผิดชอบ | หลักการ |
| --- | --- | --- |
| `adultAccess.status` (`unknown` / `pending` / `verified` / `denied` / `expired`) | Trusted Server / restricted collection | **ห้าม** อาศัยค่า Client หรือ `localStorage` |
| `adultAccess.verifiedAt`, `expiresAt`, `methodRef` | Restricted server-side record | เก็บเท่าที่จำเป็น; ไม่เผย DOB/เอกสารยืนยันตัวตนบน Profile |
| `preferences.showAdultContent` | User preference | ค่าเริ่มต้น `false`; เป็นความชอบ ไม่ใช่หลักฐานยืนยันอายุ |
| `consents.adultExperienceVersion` | Consent record ตามความจำเป็น | บันทึกเวอร์ชันและเวลาความยินยอมโดยไม่เก็บคำตอบเกมอ่อนไหว |
| `contentRating`, `contentWarnings`, `accessPolicy` | Game catalog metadata | ใช้ตัดสิน Preview, UI Warning และการตรวจสิทธิ์ก่อนเผยแพร่เนื้อหา |

**ตัวอย่างเส้นทางที่เสนอ:** `gameAdultAccess/{uid}` (server-only), `gamePreferences/{uid}` (owner-read / validated-write), metadata ใน `games/{gameId}`. **ยังไม่ให้สร้างหรือ Deploy Collection/Rules โดยอัตโนมัติ** จนกว่าจะตรวจ Schema และ Rules ของเว็บหลัก

### Authorization flow สำหรับเนื้อหาที่จำกัด

```text
Login → verify Firebase token → server checks adult entitlement
      → check content accessPolicy + consent/region restrictions
      → serve permitted game metadata / short-lived asset access
      → audit access decisions without logging sexual preferences
```

- ห้ามส่งรูปเปลือย/ไฟล์ private media ผ่าน `public/` ของ Next.js ถ้าต้องจำกัดการเข้าถึง; ใช้ private storage, authorization และ URL อายุสั้นที่ตรวจสอบได้ โดยประเมินข้อจำกัดของ CDN/cache และ hotlinking
- Firestore Rules **ไม่สามารถควบคุมการเข้าถึงไฟล์ที่เผยแพร่สาธารณะบนเว็บเซิร์ฟเวอร์** ได้; ต้องป้องกันที่ media delivery ด้วย
- Public game catalog ที่มี `allow read: if true` ต้องมีเฉพาะ Metadata ที่เผยแพร่ได้ก่อนตรวจสิทธิ์ ไม่ปะปนข้อมูลหรือ URL ของสื่อผู้ใหญ่ที่จำกัดสิทธิ์
- ห้ามเปิดเผย `adultAccess`, ประวัติเนื้อหาที่ดู, คำตอบเรื่องเพศ หรือการตั้งค่าเนื้อหาผู้ใหญ่ผ่าน Leaderboard, profile สาธารณะ, analytics identifiers หรือ log
- กำหนดการลบข้อมูล การถอนความยินยอม การแจ้งเหตุละเมิด และข้อตกลงของผู้ให้บริการตรวจอายุ (หากใช้) ก่อน Launch
- การใช้ Firebase Project ร่วมกับเว็บหลักต้องแยก namespace และทดสอบว่า Rules/Indexes ใหม่ไม่กระทบ `gaybkk.co`

**Release gate:** ทดสอบผู้ใช้ไม่ล็อกอิน, ผู้ใช้ที่ยังไม่ยืนยันอายุ, ผู้ถูกปฏิเสธ/หมดอายุ, ผู้ที่ปิด Adult Content, URL ตรง, API ตรง, cached media และการแชร์ link ก่อนเปิดใช้จริง

---

## 1. 🎯 วัตถุประสงค์และหลักการ

ใช้ Firebase เป็นระบบตัวตนและข้อมูลเกมสำหรับ `gaybkk-games` โดยเชื่อมบัญชีผู้ใช้กับแพลตฟอร์ม `gaybkk.co` อย่างปลอดภัย และรองรับคะแนน อันดับ Badge และกิจกรรมตามเทศกาล

**หลักการที่ต้องรักษาเสมอ**

- **One identity, explicit trust:** ใช้ Firebase Auth UID เป็นตัวอ้างอิงผู้ใช้ *เมื่อยืนยันแล้วว่าทั้งสองแอปใช้ Firebase Project/Identity Provider ที่สอดคล้องกัน*; ห้ามสรุปว่า Single Sign-On ทำงานอัตโนมัติ
- **Server-authoritative scoring:** เบราว์เซอร์ส่งผลเกมได้ แต่ไม่ใช่ผู้มีอำนาจอนุมัติคะแนน/รางวัล
- **Least privilege:** Firestore Security Rules จำกัดสิทธิ์ผู้ใช้; Firebase Admin SDK ใช้เฉพาะบน Trusted Server
- **Privacy by design:** เก็บข้อมูลโปรไฟล์เท่าที่จำเป็น ไม่คัดลอกข้อมูลส่วนตัวทั้งบัญชีจากเว็บหลัก
- **Environment separation:** แยก Development/Staging/Production ตามความเหมาะสม และตรวจ Firebase `projectId` ก่อนเปลี่ยนแปลงข้อมูลจริง

> **สำคัญ:** เอกสารนี้เป็น *proposed data contract* ชื่อ Collection, ชื่อ Environment Variables, วิธี SSO และสิทธิ์การเขียนต้องตรวจสอบกับ Source Code และ Firebase Project จริงก่อนนำไปใช้

## 2. 🧩 สถาปัตยกรรมการเชื่อมต่อ

```text
 gaybkk.co                            games.gaybkk.co
 (แพลตฟอร์มหลัก)                     (Next.js App Router)
       │                                     │
       └──── Firebase Identity / UID ───────┘
                                             │
                       ┌─────────────────────┴────────────────────┐
                       ▼                                          ▼
                 Client: Web SDK                             Server: Admin SDK
                 Firebase Auth                                Auth verification
                 Read permitted data                          Score validation
                       │                                          │
                       └────────────────┬─────────────────────────┘
                                        ▼
                                Cloud Firestore
                        profiles / gameSessions / results
                          leaderboards / badges / events
```

**Trust boundaries:** ข้อมูลจาก Client ไม่เชื่อถือโดยอัตโนมัติ; API ต้องตรวจ Session/Token, รูปแบบข้อมูล, สิทธิ์ และกติกาเกมก่อนดำเนินการ; Admin SDK ข้าม Firestore Rules จึงต้องบังคับ Authorization ภายใน Server เอง

## 3. 🔑 Firebase Project & Environment

### 3.1 สิ่งที่ต้องตรวจสอบก่อนเชื่อมกับเว็บหลัก

1. ยืนยันว่า `gaybkk.co` ใช้ Firebase Project ใดและรูปแบบ Auth/Session แบบใด
2. ตกลงว่าจะใช้ Project เดียวกันหรือแยก Project พร้อม Identity Federation ที่ออกแบบชัดเจน
3. สำรวจ Collections ของเว็บหลักเพื่อหลีกเลี่ยงชื่อชน/การเขียนทับข้อมูล
4. ตรวจ Firebase Authentication **Authorized domains** สำหรับ Login Provider/Redirect ที่ใช้จริง
5. กำหนดเจ้าของ Firestore Rules, Indexes, Data Migration และแผน Rollback

การใช้ Firebase Project เดียวกันทำให้ระบุ `uid` ร่วมกันได้เมื่อผู้ใช้ยืนยันตัวตนกับ Project นั้น แต่ **ไม่ได้แชร์สถานะ Firebase Web SDK Auth ระหว่าง origin โดยอัตโนมัติ**

### 3.2 `.env.local` (ตัวอย่างสำหรับ Local Development)

```dotenv
# Next.js development server: ตั้งพอร์ตใน npm script/CLI เช่น `next dev -p 3001`
PORT=3001

# Firebase Web SDK — ค่าที่เผยแพร่สู่ Client ได้ แต่ต้องกำหนด Rules ให้รัดกุม
NEXT_PUBLIC_FIREBASE_API_KEY=replace_me
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=replace_me
NEXT_PUBLIC_FIREBASE_APP_ID=replace_me

# Firebase Admin SDK — Server-side only (ถ้าเลือกใช้ Service Account ผ่าน env)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nREPLACE_ME\n-----END PRIVATE KEY-----\n"
```

> `PORT=3001` เป็นค่าประกอบเอกสารเพื่อให้ตรง Environment แต่ **อย่าพึ่งพาค่านี้ใน `.env.local` เพื่อกำหนดพอร์ต Next.js**; ให้ใช้ `npm run dev -- -p 3001` เมื่อ script เป็น `next dev` หรือกำหนด script เป็น `next dev -p 3001` โดยตรง ใน Production ใช้ `next start -p 3001` ตาม [`DEPLOYMENT.md`](DEPLOYMENT.md)

**Security notes**

- ห้าม Commit `.env.local`, `.env.production.local`, Service Account JSON, Private Key หรือ Tokens
- `NEXT_PUBLIC_*` ฝังลงใน Client Bundle และ **ไม่ใช่ Secret**; ความปลอดภัยขึ้นอยู่กับ Rules, Auth และ Backend Validation
- ค่า `FIREBASE_PRIVATE_KEY` ที่ใช้ `\n` ต้องถูกแปลงเป็น newline ก่อน initialize Admin SDK
- ใช้ Credential ที่ผูกกับ Environment และสิทธิ์ต่ำที่สุดเท่าที่ทำได้; บน Infrastructure ที่รองรับให้เลือก Workload Identity/Managed Credentials แทน Private Key แบบถาวร
- Firebase Emulator ใช้สำหรับทดสอบในเครื่องเพื่อลดโอกาสกระทบข้อมูล Production

## 4. 👤 Authentication & Shared Profile

### 4.1 Identity Contract

| ข้อมูล | แหล่งข้อมูลหลัก | แนวทาง |
|---|---|---|
| `uid` | Firebase Auth | ใช้ UID จาก Token ที่ Server ตรวจแล้วเท่านั้น |
| `displayName`, `photoURL` | Shared profile / Auth (ตามข้อตกลง) | อ่านเฉพาะที่จำเป็นต่อ Lobby/Leaderboard |
| `role` หรือ Admin Permission | Trusted authorization source | ห้ามเชื่อถือ Role ที่ Client ส่งมา |
| `email` | Auth (ถ้าจำเป็น) | ไม่เผยแพร่บน Leaderboard |
| คะแนน/Badge | Game service | เขียนโดย Trusted Server เท่านั้น |

**การเชื่อม Profile:** ควรเก็บข้อมูลเฉพาะด้านเกมใน `gameProfiles/{uid}` หรือแหล่งแยกตามที่ทีมตกลง แทนการแก้ไขเอกสารโปรไฟล์หลักที่ `gaybkk.co` เป็นเจ้าของโดยตรง

### 4.2 Sign-in ระหว่าง Subdomain

เนื่องจาก `gaybkk.co` และ `games.gaybkk.co` เป็น **คนละ origin** จึงไม่สามารถสมมติว่า `localStorage`, Firebase Auth persistence หรือ session state จะข้ามกันได้ทันที

**แนวทางเริ่มต้นที่ปลอดภัย:** ให้ `games.gaybkk.co` ใช้ Firebase Auth ผ่าน Login Provider ที่อนุญาต แล้วตรวจ ID Token ที่ Backend เพื่อสร้าง Session เฉพาะแอป (หากต้องใช้ Session Cookie)

หากต้องการประสบการณ์ **SSO seamless** ให้กำหนด Protocol ร่วมกันก่อน เช่น Secure One-time Authorization Code Handoff โดยต้องมี:

- Code อายุสั้น ใช้ครั้งเดียว ผูกกับ origin/client และตรวจ `state`/anti-CSRF
- แลก Code ผ่าน Backend ที่เชื่อถือได้โดยใช้ HTTPS; **ห้ามส่ง Firebase ID Token, Refresh Token หรือ Session Cookie ใน Query String**
- ป้องกัน Open Redirect, Replay, Session Fixation และตรวจ `audience`/`issuer`/`expiry` ตามชนิด Token
- กำหนดการ Logout, Revocation และ Account Linking ของทั้งสองแอปให้สอดคล้องกัน

> การแชร์ Cookie ข้าม Subdomain ด้วย `Domain=.gaybkk.co` มีความเสี่ยงจาก Subdomain อื่นและ CSRF ต้องผ่านการออกแบบ/ตรวจสอบก่อนใช้งาน ไม่ใช่ค่า Default

### 4.3 Protected API Flow

```text
Client Sign-in → รับ Firebase ID Token
             → ส่งผ่าน Authorization: Bearer <token> (HTTPS)
             → Next.js Route Handler ตรวจ verifyIdToken(...)
             → ดึง uid/claims จาก Token ที่ผ่านการตรวจ
             → ตรวจ role, quota, resource ownership
             → ใช้ Firebase Admin SDK ดำเนินการที่ได้รับอนุญาต
```

ตรวจสิทธิ์ทุกครั้งใน Protected Route Handler; Client-side route guard มีไว้เพื่อ UX ไม่ใช่การบังคับความปลอดภัย หลีกเลี่ยงการเก็บ Token ใน URL หรือ Logs; หากใช้ Session Cookie ต้องตั้ง `HttpOnly`, `Secure`, `SameSite` ตาม Threat Model และป้องกัน CSRF

## 5. 🗂️ Firestore Data Model (Proposed)

โครงสร้างด้านล่างเป็น **ตัวอย่างสัญญาข้อมูลเบื้องต้น** ที่ต้องยืนยันร่วมกับ `gaybkk.co` ก่อนสร้างจริง

| Path | Field ตัวอย่าง | สิทธิ์การเขียนที่แนะนำ |
|---|---|---|
| `gameProfiles/{uid}` | `displayName`, `avatarUrl`, `createdAt`, `updatedAt` | Owner เฉพาะฟิลด์ที่อนุญาต หรือ Server |
| `games/{gameId}` | `title`, `slug`, `status`, `rulesVersion` | Admin/Server |
| `gameSessions/{sessionId}` | `uid`, `gameId`, `status`, `createdAt`, `expiresAt`, `rulesVersion` | Server |
| `gameResults/{resultId}` | `uid`, `gameId`, `score`, `submissionId`, `verifiedAt` | Server |
| `leaderboards/{boardId}/entries/{uid}` | `uid`, `bestScore`, `rank*`, `updatedAt` | Server |
| `userBadges/{uid}/badges/{badgeId}` | `badgeId`, `awardedAt`, `source` | Server |
| `gameAdultAccess/{uid}` *(proposed)* | `status`, `verifiedAt`, `expiresAt`, `methodRef` | Server-only; ไม่เปิดอ่าน Client โดยตรง |
| `gamePreferences/{uid}` *(proposed)* | `showAdultContent`, `updatedAt` | Owner validated write หรือ Server ตามแบบจริง |
| `events/{eventId}` | `name`, `startsAt`, `endsAt`, `eligibility`, `status` | Admin/Server |

`*` การเก็บ `rank` แบบ materialized อาจมีต้นทุนและปัญหาความสอดคล้อง ควรคำนวณ/อัปเดตด้วยกลยุทธ์ที่เหมาะกับปริมาณผู้เล่น; ไม่จำเป็นต้องเก็บตั้งแต่เริ่ม

**ข้อกำหนดการออกแบบ**

- ตั้งชื่อ Document ID และประเภทข้อมูลให้แน่นอน; ใช้ Server Timestamp สำหรับเวลาอ้างอิง
- `score` และ `gameId` ต้องตรวจชนิด ช่วงค่า และกติกาเฉพาะเกม
- ใช้ `submissionId` ที่ไม่ซ้ำเพื่อให้การส่งผลซ้ำเป็น Idempotent; พิจารณา Transaction/Atomic Writes เมื่อหลาย Collection ต้องสอดคล้องกัน
- จำกัดจำนวนรายการและใช้ Pagination/Cursor กับ Leaderboard; ไม่ดึงทั้ง Collection
- ออกแบบ Indexes ตาม Query จริง และตั้งนโยบาย Retention/Deletion สำหรับ Session/ข้อมูลกิจกรรม
- หลีกเลี่ยงการจัดเก็บข้อมูลอ่อนไหวหรือข้อมูลที่ระบุตัวบุคคลเกินความจำเป็น

## 6. 🏆 Game Sessions, Results & Leaderboards

```text
1) ผู้ใช้ยืนยันตัวตน
2) Server สร้าง gameSession พร้อม uid, gameId, rulesVersion, expiry
3) ผู้ใช้เล่นเกมบน Client (Canvas / WebGL / Phaser / Pixi.js)
4) Client ส่งผลพร้อม sessionId และ submissionId ไปยัง Protected API
5) Server ตรวจ Auth + session ownership + status + expiry + schema
6) Server ตรวจคะแนน/เหตุการณ์เกมเท่าที่สามารถพิสูจน์ได้ตามกติกา
7) Server บันทึกผลที่รับรองแล้วแบบ idempotent และอัปเดต Leaderboard/Badge
8) Client subscribe/read เฉพาะข้อมูลที่อนุญาต
```

**Anti-cheat baseline:** จำกัดความถี่การส่งผล, ป้องกัน Replay, ตรวจคะแนนผิดปกติ, ตรวจเวอร์ชันกติกา และบันทึกเหตุการณ์ตรวจสอบแบบไม่เปิดเผยข้อมูลอ่อนไหว ทั้งนี้ **คะแนนที่ Client คำนวณเองไม่สามารถพิสูจน์ความถูกต้องได้สมบูรณ์ด้วย Schema Validation เพียงอย่างเดียว**; เกมที่มีรางวัลมูลค่าสูงควรใช้ server-controlled mechanics หรือหลักฐานเล่นที่ตรวจสอบซ้ำได้

**Realtime:** ใช้ Firestore `onSnapshot` เฉพาะ Lobby/Leaderboard ที่จำเป็น และต้อง `unsubscribe` เมื่อ Component Unmount หรือเปลี่ยนหน้า; ควบคุมจำนวน Read/Listener เพื่อจำกัดต้นทุน

## 7. 🔐 Firestore Security Rules

**นโยบายหลัก:** Deny by default, เปิดให้อ่านเฉพาะข้อมูล Public ที่ตั้งใจเผยแพร่ และปิดการเขียนผลคะแนนจาก Client

ตัวอย่าง **Rules baseline เชิงแนวคิด** (ต้องปรับให้ตรง Schema/Query และทดสอบใน Emulator ก่อน Deploy):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    // Public profile จะเปิดอ่านได้ก็ต่อเมื่อผ่านการอนุมัติด้าน Privacy แล้ว
    match /gameProfiles/{uid} {
      allow read: if signedIn() && request.auth.uid == uid;
      allow write: if false;
    }

    match /games/{gameId} {
      allow read: if true; // ต้องเก็บเฉพาะ public game metadata ในเอกสารนี้
      allow write: if false;
    }

    match /leaderboards/{boardId}/entries/{uid} {
      allow read: if true; // ไม่เก็บ email หรือ private identifiers
      allow write: if false;
    }

    match /gameSessions/{sessionId} {
      allow read, write: if false;
    }

    match /gameResults/{resultId} {
      allow read, write: if false;
    }

    match /userBadges/{uid}/badges/{badgeId} {
      allow read, write: if false;
    }

    match /events/{eventId} {
      allow read: if true; // เฉพาะข้อมูลกิจกรรมสาธารณะ
      allow write: if false;
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

> **ข้อจำกัด:** Rules ข้างต้น **ไม่ได้ครอบคลุม Collection ที่เว็บหลักอาจใช้อยู่แล้ว**; **ห้ามนำไป Deploy ทับ Rules ของ Firebase Project ที่ใช้ร่วมกับ `gaybkk.co` โดยตรง** เพราะอาจทำให้เว็บหลักหยุดทำงาน ต้อง Merge กับ Rules ปัจจุบัน ตรวจผลกระทบทุก Collection และขออนุมัติก่อนเสมอ

Firebase Admin SDK **ไม่ถูกจำกัดด้วย Firestore Security Rules**: API Server ต้องบังคับ Role/Ownership และตรวจ Payload ด้วยตนเองทุกจุด

## 8. 🛡️ Privacy, Abuse Prevention & Operations

| ประเด็น | แนวทาง |
|---|---|
| Authentication | ตรวจ Token ฝั่ง Server, ระบุ UID จาก Claims, รองรับ Revocation ตามนโยบาย |
| Authorization | ตรวจเจ้าของข้อมูลและ Admin Role บนทุก Protected Action |
| Anti-abuse | Rate limit, replay protection, idempotency, suspicious-score review |
| Data minimization | หลีกเลี่ยง Email/Public PII บน Leaderboard; ใช้ Public Display Name อย่างระมัดระวัง |
| App Check | พิจารณาใช้เพิ่มเป็น Signal ลด Abuse แต่ **ไม่ใช่** สิทธิ์ผู้ใช้หรือระบบ Anti-cheat แทน Backend |
| Secrets | เก็บ Admin Credentials ฝั่ง Server, หมุน Key เมื่อรั่วไหล |
| Monitoring | ติดตาม Auth failures, denied writes, Firestore usage, error rates, quota |
| Retention | กำหนดช่วงเก็บ Sessions/Results และวิธีลบข้อมูลตามคำขอ |
| Backup | กำหนดวิธี Export/Restore และทดสอบการกู้คืนตามความสำคัญของข้อมูล |

### ตัวอย่างโครงสร้างโค้ด (ไม่ใช่การยืนยันว่ามีไฟล์แล้ว)

```text
lib/
└── firebase/
    ├── client.ts       # Web SDK / client-side only
    └── admin.ts        # Admin SDK / server-only

lib/auth/               # ตรวจ token/session และ authorization
app/api/game-sessions/  # Create session (trusted server)
app/api/game-results/   # Submit and validate score
```

แยก Initialization Web/Admin SDK ไม่ให้เกิดการสร้าง instance ซ้ำและไม่ให้ `firebase-admin` ถูก import ผ่าน Client Component

## 9. 🧪 Testing Checklist

- [ ] Firebase Web Config ชี้ Project สำหรับ Environment ถูกต้อง
- [ ] Login/Logout ทำงานและตรวจ Session หมดอายุ/Token ไม่ถูกต้อง
- [ ] การเข้าถึง Profile อื่นโดยไม่ได้รับอนุญาตถูกปฏิเสธ
- [ ] Direct Client Write ไป `gameResults`, `leaderboards`, `userBadges` ถูกปฏิเสธ
- [ ] Server Reject การส่งคะแนนโดยไม่มี Token, ใช้ Session คนอื่น, Session หมดอายุ หรือคะแนนผิดช่วง
- [ ] Replay `submissionId` เดิมแล้วไม่เพิ่มคะแนน/รางวัลซ้ำ
- [ ] Rules Unit Tests ครอบคลุม Allow/Deny Cases ใน Firebase Emulator
- [ ] Query ของ Leaderboard ใช้ Index และ Pagination ตามจริง
- [ ] Listener ถูกยกเลิกเมื่อเปลี่ยนหน้า และไม่มี Firestore Reads เกินจำเป็น
- [ ] ไม่มี Token, Private Key หรือ PII รั่วใน Client Bundle, Logs หรือ Repository
- [ ] ทดสอบผลกระทบต่อ `gaybkk.co` ก่อนเปลี่ยน Shared Collections/Rules
- [ ] ตรวจ Adult Gate/verification/consent/accessPolicy ฝั่ง Server และไม่เปิดเผย private media ผ่าน URL สาธารณะ
- [ ] ตรวจ Privacy, Data Retention, การถอนความยินยอม และการแยกข้อมูลอ่อนไหวออกจาก Public Profiles

## 10. 🚀 Release & Production Checklist

**ก่อนเปิด Production**

1. ยืนยัน Firebase Project/Ownership, Auth Provider, Authorized Domains และ Contract การใช้ UID
2. Finalize SSO/Sign-in, Cookie/Session, Logout และ Revocation ให้ตรงพฤติกรรมจริง
3. Review Firestore Schema, Composite Indexes, Rules, Retention และ Backup
4. ทดสอบด้วย Firebase Emulator และบัญชี Test ที่มีสิทธิ์ต่างกัน
5. ตรวจ Auth/Score APIs แบบ End-to-End รวมถึง Failure/Replay Cases
6. สำรอง Rules/Indexes เดิม ตรวจ Diff และได้รับอนุมัติหากใช้ Project ร่วมกับเว็บหลัก
7. Deploy Rules/Indexes/Backend ตาม Release Plan แยกจากการ Deploy Next.js และตรวจ Monitoring หลังปล่อย

**ห้ามทำ:** แก้ Production Rules, ลบ Collection, เปลี่ยน Authentication Provider, เปลี่ยน Service Account หรือ Migration ข้อมูลที่ใช้ร่วมกับเว็บไซต์หลักโดยไม่มีแผนและการอนุมัติ

## 11. 📌 สิ่งที่ต้องยืนยันก่อน Implement

| Decision | สถานะ |
|---|---|
| Firebase Project ที่ใช้ร่วมกับ `gaybkk.co` | **Pending verification** |
| Source of truth สำหรับ Public Profile และ Role | **Pending alignment** |
| SSO / Session handoff / Logout propagation | **Pending design** |
| Collections, Indexes, Rules ที่ใช้งานจริง | **Pending review** |
| Score validation สำหรับแต่ละเกม | **Game-specific design required** |
| Retention, Backup, Monitoring และ Incident ownership | **Pending agreement** |

## 12. 📚 เอกสารที่เกี่ยวข้อง

- [`../README.md`](../README.md) — ภาพรวมและการติดตั้งโครงการ
- [`../AGENTS.md`](../AGENTS.md) — กฎสำหรับ AI Coding Agents
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — สถาปัตยกรรมและ Data Flow
- [`DEPLOYMENT.md`](DEPLOYMENT.md) — Hostinger VPS, PM2, Nginx และ Production Release
- [`GAME-DEVELOPMENT.md`](GAME-DEVELOPMENT.md) — แนวทางพัฒนาเกมและ Adult Content Rating

---

**Project:** `gaybkk-games` · **Owner:** gaybkk.co · **Document:** `docs/FIREBASE.md`
