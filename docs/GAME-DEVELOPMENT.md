# 🎮 Game Development Guide — gaybkk-games

> มาตรฐานการออกแบบ พัฒนา ทดสอบ และเผยแพร่มินิเกมของ **gaybkk-games**<br />
> เว็บไซต์: **https://games.gaybkk.co** · แพลตฟอร์มหลัก: **https://gaybkk.co**

**สถานะเอกสาร:** Development Standard / Target Design<br />
**ขอบเขต:** 18+ Adult Party Games, Sexy/Nudity Themes, Casual Games, Quiz และกิจกรรมตามเทศกาล<br />
**สำคัญ:** ชื่อโฟลเดอร์, API และตัวอย่างโค้ดต่อไปนี้เป็น **แนวทางเป้าหมาย** ไม่ใช่การยืนยันว่ามีการ Implement แล้ว ให้ตรวจสอบ Repository ปัจจุบันก่อนใช้งาน

---

## 1. 🎯 หลักการพัฒนา

ทุกเกมต้องมีคุณสมบัติหลักดังนี้

1. **Mobile-First:** เริ่มจาก Touch และหน้าจอขนาดเล็กก่อน รองรับ Desktop อย่างเหมาะสม
2. **Fast to Play:** กติกากระชับ เริ่มเล่นง่าย ไม่บังคับติดตั้งแอป
3. **Accessible:** มองเห็นและควบคุมได้ง่าย ไม่พึ่งสี/เสียงเพียงช่องทางเดียว
4. **Performance:** โหลดเฉพาะทรัพยากรของเกมที่เปิด เล่นลื่น และคืนทรัพยากรเมื่อออกจากเกม
5. **Secure by Design:** Client ไม่ใช่แหล่งข้อมูลที่เชื่อถือได้สำหรับคะแนน รางวัล หรืออันดับ
6. **Community-Ready:** รองรับกิจกรรม Pride Month, Songkran และฤดูกาลจัดอันดับ โดยไม่ผูกตรรกะเกมกับวันปัจจุบัน
7. **Maintainable:** แยก Game Rules, Rendering, UI และ Data Services เพื่อปรับปรุงและทดสอบได้

เกมฝึกเล่นหรือเล่นแบบ Guest **อาจ** เปิดให้เล่นได้โดยไม่ล็อกอิน แต่การบันทึกคะแนน/รับ Badge ที่ผูกบัญชีต้องผ่านการยืนยันตัวตนตามนโยบายผลิตภัณฑ์

## 🌈 ทิศทางผลิตภัณฑ์ 18+ (Adult Experience Principles)

**GAYBKK GAMES** เป็นพื้นที่มินิเกมสำหรับผู้ใหญ่ อายุ **18 ปีขึ้นไป** โดยเน้นความสนุก อารมณ์ขันแบบผู้ใหญ่ บรรยากาศเซ็กซี่ และกิจกรรมปาร์ตี้ของชุมชนเกย์ การออกแบบสามารถใช้ภาษาทะลึ่งและสื่อภาพเปลือยของผู้ใหญ่ภายใต้นโยบายเนื้อหาที่กำหนด แต่ **ไม่ใช่ข้อยกเว้นจากข้อกำหนดกฎหมาย ความยินยอม ความเป็นส่วนตัว หรือข้อกำหนดโฮสติ้ง**

- ตรวจสอบอายุและสิทธิ์การเข้าถึงก่อนเสิร์ฟ **เนื้อหาที่ถูกจำกัด**; หน้า Age Gate อย่างเดียวไม่ถือเป็นหลักฐานพิสูจน์อายุที่เพียงพอสำหรับทุกกรณี
- ผู้เล่นต้องเลือกเข้าร่วมกิจกรรมและสามารถ **ข้ามคำถาม/ภารกิจ**, ถอนตัว หรือปิดการแสดงสื่อบางประเภทได้โดยไม่ถูกลงโทษ
- สื่อภาพหรือข้อมูลของคนจริงต้องได้รับสิทธิ์และความยินยอมที่ตรวจสอบได้; ห้ามใช้สื่อส่วนตัวโดยไม่ได้รับอนุญาต และห้ามเนื้อหาเกี่ยวกับผู้เยาว์
- การโหวตหรือการทายบุคลิก **ห้ามสรุปเพศวิถี บทบาททางเพศ หรือความชอบทางเพศของบุคคลจริงจากหน้าตาหรือพฤติกรรม**; ใช้ตัวละครสมมติและคำอธิบายชัดเจน
- สำหรับเนื้อหาที่อาจมีภาพเปลือยหรือภาพเชิงเพศ ต้องตรวจสอบข้อกฎหมายในเขตที่เผยแพร่ **รวมถึงข้อกำหนด Hostinger และผู้ให้บริการชำระเงิน/สื่อ** ก่อนเปิดใช้งานจริง และมีมาตรการรายงาน/นำเนื้อหาลง
- อย่ารวมการยืนยันอายุเข้ากับการยินยอมต่อข้อมูลส่วนบุคคล หรือการยินยอมให้แสดงตัวตนบน Leaderboard; แต่ละเรื่องต้องให้ผู้ใช้ตัดสินใจแยกกัน

### ระดับเนื้อหา (Content Classification)

| Code | ชื่อ | ตัวอย่าง | แนวทางการเข้าถึง |
| --- | --- | --- | --- |
| `SPICY` | 🌶️ Naughty Humor | คำถามสองแง่สองง่าม มุกปาร์ตี้ | 18+ ตามนโยบายแพลตฟอร์ม |
| `HOT` | 🔥 Sexy | เสื้อผ้าหรือภาพยั่วยวนในบริบทผู้ใหญ่ | 18+ พร้อมการแสดงคำเตือนตามความเหมาะสม |
| `XXX` | 🍆 Adult Nudity | ภาพเปลือยของผู้ใหญ่ที่ได้รับอนุญาต | จำกัดสิทธิ์และตรวจเงื่อนไขเผยแพร่เป็นรายประเทศ/ผู้ให้บริการ |
| `AFTER_DARK` | 😈 Adult Party | คำถามผู้ใหญ่หรือสถานการณ์ทางเพศแบบสมัครใจ | 18+ พร้อมตัวเลือกข้าม/ออกจากกิจกรรม |

**กฎข้อมูล:** `contentRating` ใช้บอกประเภทเนื้อหา ไม่ใช่ Authorization ให้เก็บ `contentWarnings`, `accessPolicy`, `mediaRightsStatus` และ `publishedStatus` แยกกัน; ให้ Trusted Server ตรวจสิทธิ์ทุกครั้งก่อนส่งข้อมูลหรือสื่อที่ถูกจำกัด การซ่อนปุ่มใน UI หรือการเบลอรูปอย่างเดียวไม่ใช่การป้องกันการเข้าถึง

### เกมชุดแรกที่เสนอ (Launch Catalog — ยังไม่ใช่เกมที่พัฒนาเสร็จ)

| # | Game / Slug | แนวคิดการเล่น | Rating เริ่มต้น |
| --- | --- | --- | --- |
| 01 | **SIZE MATTERS?** (`size-matters`) | ทายขนาดของสิ่งของ/ภาพเงาจากคำใบ้สองแง่สองง่าม | `SPICY` |
| 02 | **NEVER HAVE I EVER** (`never-have-i-ever`) | กดเคย/ไม่เคยกับวีรกรรมปาร์ตี้และความสัมพันธ์ | `AFTER_DARK` |
| 03 | **TOP, BOTTOM OR VERS?** (`top-bottom-vers`) | Quiz คาแรกเตอร์สมมติแบบขำ ๆ ไม่ตัดสินบุคคลจริง | `SPICY` |
| 04 | **SMASH OR PASS** (`smash-or-pass`) | ปัดเลือกคาแรกเตอร์ผู้ใหญ่ที่ได้รับสิทธิ์ใช้งานและดูผลโหวต | `HOT` |
| 05 | **TRUTH OR DARE: AFTER DARK** (`truth-or-dare`) | ตอบคำถามหรือรับภารกิจสนุก ๆ ที่ทุกคนยินยอม | `AFTER_DARK` |
| 06 | **RED FLAG DETECTOR** (`red-flag-detector`) | เลือกคำตอบจากบทสนทนาเดตจำลอง แล้วดูผลลัพธ์ | `SPICY` |
| 07 | **WHO'S THE DRAMA QUEEN?** (`drama-queen`) | โหวตสถานการณ์ป่วนในกลุ่มที่สมัครใจเข้าร่วม | `SPICY` |
| 08 | **GAYDAR 3000** (`gaydar-3000`) | ทายตัวละครสมมติจากคำใบ้เชิงวัฒนธรรม ไม่อนุมานตัวตนคนจริง | `SPICY` |
| 09 | **DIRTY MIND** (`dirty-mind`) | ทายคำตอบจากปริศนาที่ฟังทะลึ่งแต่คำตอบอาจธรรมดา | `SPICY` |
| 10 | **EX-FILES** (`ex-files`) | เลือกบทสนทนากับแฟนเก่าในเรื่องสั้นแบบหลายตอนจบ | `HOT` |
| 11 | **GAY BATTLE ROYALE** (`gay-battle-royale`) | แข่ง Quiz เพลง วัฒนธรรมเกย์และปาร์ตี้แบบตกรอบ | `SPICY` |

> ระดับเนื้อหาเป็น **ค่าที่เสนอสำหรับ MVP** ไม่ใช่เพดานของเกม เมื่อเพิ่มสื่อเปลือยหรือคำถามที่แรงขึ้น ต้องประเมิน Rating, สิทธิ์สื่อ, คำเตือน, และ Access Policy ใหม่ก่อนเผยแพร่ เกมที่ไม่มีการยืนยันผลการแข่งขันจาก Server ให้เป็นโหมด Unranked ไปก่อน

---

## 2. 🧰 การเลือกเทคโนโลยี

| วิธีพัฒนา | เหมาะกับ | หมายเหตุ |
| --- | --- | --- |
| React + HTML/CSS | Quiz, Card, Turn-based UI, เกมข้อความ | ใช้ HTML semantic เพื่อ Accessibility ได้ง่าย |
| HTML5 Canvas 2D | Puzzle, Arcade 2D ที่ไม่ซับซ้อน | ต้องดูแล Game Loop และ DPR ด้วยตนเอง |
| Phaser | เกม 2D ที่มี Scene, Physics, Input จำนวนมาก | โหลดเฉพาะหน้าเกม ไม่วาง Engine ใน Global Bundle |
| Pixi.js | เกม 2D เน้น Rendering/Animation | ไม่ใช่ Game Framework เต็มรูปแบบ ต้องจัดการกติกาเอง |
| WebGL | Effect/Rendering ที่ต้องใช้ GPU | มี Canvas 2D หรือ HTML fallback ตามความเหมาะสม |

**กติกาการเลือก:** ใช้ทางเลือกที่เล็กและเรียบง่ายที่สุดที่รองรับความต้องการจริง หลีกเลี่ยงการติดตั้งหลาย Game Engines โดยไม่มีเหตุผลและการวัดผลรองรับ ตรวจเวอร์ชันจาก `package.json` และ lockfile ก่อนใช้ API

## 3. 📁 โครงสร้างเกม (Target Structure)

Next.js ใช้ **App Router ที่ Root** โดยไม่มี `src/`

```text
gaybkk-games/
├── app/
│   ├── games/
│   │   └── [slug]/page.tsx         # Game route และ metadata
│   └── api/
│       ├── game-sessions/          # เริ่ม/จบ Session (เมื่อ Implement)
│       ├── scores/route.ts         # Submit คะแนนที่ต้องตรวจสอบ
│       └── leaderboards/route.ts   # อ่านอันดับที่เปิดเผยได้
├── components/
│   └── games/                      # Game Shell, HUD, Controls, Dialogs
├── games/
│   ├── registry.ts                 # รายชื่อ/Metadata ของเกม
│   └── example-game/
│       ├── config.ts               # ชื่อ, slug, mode, เวอร์ชันกติกา
│       ├── rules.ts                # กติกาและคำนวณคะแนนแบบ Pure Functions
│       ├── engine.ts               # Game Loop / Scene Adapter (ถ้าจำเป็น)
│       ├── Game.tsx                # Client entry point
│       └── __tests__/rules.test.ts # Unit Tests
├── lib/
│   ├── auth/                       # ยืนยันตัวตนบน Server
│   ├── firebase/                   # Client / Admin initialization
│   └── scores/                     # Validation, Anti-abuse, Persistence
├── public/
│   └── games/example-game/         # Assets เฉพาะเกม
├── types/                          # Shared Types
└── docs/
    └── GAME-DEVELOPMENT.md
```

> ไม่จำเป็นต้องสร้างทุกไฟล์ล่วงหน้า สร้างเฉพาะที่เกมนั้นต้องใช้และรักษาความสอดคล้องกับโครงสร้างจริงของ Repository

## 4. 🧩 Game Contract และ Metadata

แต่ละเกมควรมี `slug` ไม่ซ้ำ, คำอธิบาย, ประเภท, สถานะ, เวอร์ชันกติกา และการกำหนดคะแนนที่ชัดเจน

```ts
// ตัวอย่างแบบออกแบบ: ปรับให้ตรงกับ types จริงของโครงการ
export type GameDefinition = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "casual" | "party" | "quiz" | "seasonal";
  status: "draft" | "published" | "archived";
  rulesVersion: string;
  leaderboardEnabled: boolean;
  requiresAuthForRewards: boolean;
  contentRating: "SPICY" | "HOT" | "XXX" | "AFTER_DARK";
  contentWarnings: string[];
  accessPolicy: "adult_only" | "verified_adult" | "restricted";
};
```

**แนวปฏิบัติ:**

- `id` ต้องคงที่ตลอดอายุเกม ส่วน `slug` ใช้กับ URL และอาจเปลี่ยนได้โดยมี Redirect ที่ชัดเจน
- `rulesVersion` ต้องเปลี่ยนเมื่อวิธีคิดคะแนนหรือกติกาที่มีผลต่อความยุติธรรมเปลี่ยน
- กำหนดกติกา Tie-break, คะแนนสูงสุด, เวลาเล่น และเงื่อนไขจบเกมให้ตรวจสอบได้
- หลีกเลี่ยงใช้ชื่อแคมเปญหรือข้อความ UI เป็น Database Key
- อย่าเปิดเกม `draft` ใน Lobby สาธารณะโดยไม่ผ่านการอนุมัติ

## 5. 🔄 วงจรชีวิตเกม (Lifecycle)

```text
Lobby → Loading → Ready → Playing → Paused (optional)
                                └→ Finished → Validating → Result
                                                   ├→ Accepted
                                                   └→ Rejected / Review
```

| สถานะ | หน้าที่หลัก |
| --- | --- |
| `loading` | เตรียม Assets และ Engine พร้อมจัดการ Loading/Error |
| `ready` | อธิบายกติกา และรอผู้เล่นเริ่ม |
| `playing` | รับ Input ประมวลผลกติกา และแสดงภาพ |
| `paused` | หยุดตามเงื่อนไข เช่น User Pause หรือ Visibility Change |
| `finished` | ล็อกผลลัพธ์ของรอบและห้าม Submit ซ้ำแบบไม่ตั้งใจ |
| `validating` | รอ Server ตรวจผล โดยแสดงว่าเป็นคะแนน **ชั่วคราว** |
| `accepted` | แสดงคะแนนยืนยันแล้ว และ Refresh อันดับ |
| `rejected` | แจ้งเหตุผลที่เหมาะสมโดยไม่เปิดเผยตรรกะ Anti-cheat |

**ข้อกำหนด Lifecycle**

- สร้าง Engine/Renderer **หนึ่งครั้งต่อการ Mount** ไม่ผูกการสร้าง instance กับ React render
- ยกเลิก `requestAnimationFrame`, Timer, Listener และอินสแตนซ์ Engine เมื่อ Unmount
- จัดการ `visibilitychange`, การหมุนหน้าจอ, การสูญเสีย WebGL Context และการเปลี่ยนขนาด viewport
- หากเกมต้องใช้เวลาจริง ให้เลือกนาฬิกาและกฎ Pause ที่ชัดเจน ห้ามเชื่อเวลาที่ Client ส่งมาโดยไม่มีการตรวจสอบ
- ป้องกัน Double Click/Double Submit และใช้สถานะที่แก้ไขซ้ำอย่างปลอดภัย

## 6. 🧠 แยก Game Rules ออกจาก Rendering

**Game Rules** ควรเป็น Pure Functions และรับ Input ที่ทดสอบซ้ำได้ ส่วน **Renderer** ทำหน้าที่แสดงผลเท่านั้น

```ts
// ตัวอย่างประกอบเท่านั้น ไม่ใช่ Algorithm ตรวจคะแนน Production
export function calculateQuizScore(correctAnswers: number, total: number): number {
  if (!Number.isInteger(correctAnswers) || !Number.isInteger(total)) {
    throw new Error("Invalid score input");
  }
  if (total <= 0 || correctAnswers < 0 || correctAnswers > total) {
    throw new Error("Out-of-range score input");
  }
  return correctAnswers * 100;
}
```

- Randomness สำหรับผลที่มีรางวัลต้องมีวิธีตรวจสอบ/สร้างผลบน Trusted Server ตามรูปแบบเกม
- ผลคะแนนที่ได้รับจาก Client เป็นเพียง **Claim** ไม่ใช่หลักฐานว่าผู้เล่นทำได้จริง
- ถ้าเกมตรวจสอบผลซ้ำไม่ได้โดยอิสระ **ห้าม** อ้างว่าปลอดภัยจากการโกงเพียงเพราะตรวจ Input Type และ Range

## 7. 🏆 Game Sessions, Scores และ Leaderboards

### 7.1 ลำดับการบันทึกผลที่แนะนำ

```text
[Signed-in Player]
       │
       ▼
[Trusted Server: Create Game Session]
       │  sessionId / uid / gameId / rulesVersion / expiry
       ▼
[Client: Play Game + Collect Verifiable Evidence]
       │
       ▼
[POST Score Claim + Session Reference + Submission ID]
       │
       ▼
[Server: Verify Identity, Session, Rules, Evidence, Rate Limits]
       │
       ├─ Rejected / Flagged
       └─ Accepted
              │
              ▼
[Firestore: Atomic/Idempotent Result + Leaderboard Update]
              │
              ▼
[Client: Confirmed Result / Rank]
```

### 7.2 แนวทางตรวจสอบคะแนน

- ยืนยัน Firebase ID Token/Session ฝั่ง Server และบังคับ `uid` จาก Token ไม่ใช่จาก Request Body
- ตรวจ Session ว่าเป็นของ `uid`, `gameId`, `rulesVersion` ที่ตรงกัน ยังไม่หมดอายุ และยังไม่ถูกใช้
- ตรวจ Schema, ช่วงคะแนน, ระยะเวลาที่เป็นไปได้, จำนวนครั้งเล่น และหลักฐานเฉพาะเกม
- ใช้ `submissionId` หรือ Idempotency Key เพื่อกัน Replay/Duplicate Submission
- เขียนผลและอัปเดต Leaderboard ด้วย Transaction หรือกลไกที่รับประกัน Consistency ตาม Data Model จริง
- เก็บ Reason Code สำหรับการปฏิเสธและสัญญาณผิดปกติ โดยไม่รั่วข้อมูลส่วนบุคคลหรือวิธีหลบ Anti-cheat
- คะแนนเกมที่ไม่สามารถ Verify ได้ให้กำหนดเป็น **Unranked** จนกว่าจะมีระบบตรวจสอบเพียงพอ

### 7.3 Leaderboard Policy

| ประเด็น | แนวทาง |
| --- | --- |
| Scope | แยกตาม `gameId` และ `season`/`campaignId` เมื่อจำเป็น |
| Ranking | กำหนด Best Score / Total Score / Fastest Time เป็นรายเกม |
| Tie-break | ระบุชัดและใช้ Server Timestamp สำหรับลำดับเวลาที่เกี่ยวข้อง |
| Privacy | ใช้ Display Name/Avatar ที่ยินยอมเผยแพร่เท่านั้น ไม่เปิดเผย Email หรือ Token |
| Updates | แสดงผล Near Real-time/Real-time ตามความจำเป็นและต้นทุน Firestore |
| Abuse | มีนโยบายซ่อน/ระงับคะแนนที่ผิดปกติพร้อม Audit ที่เหมาะสม |

**Data Model ที่อ้างอิง:** `gameSessions/{sessionId}`, `gameResults/{resultId}`, `leaderboards/{boardId}/entries/{uid}` ตาม `FIREBASE.md` โดยเป็น **Proposed Schema** ต้องยืนยันก่อนเริ่ม Implement

## 8. 🎖️ Badges และ Seasonal Events

- แยกเงื่อนไข Badge ออกจาก Client: มอบรางวัลเฉพาะเมื่อผลผ่านการ Verify บน Trusted Server
- รองรับการให้รางวัลแบบ **Idempotent** เพื่อป้องกันการรับซ้ำจาก Retry
- นิยาม `startsAt`, `endsAt` ใน UTC และแปลงเวลาเพื่อแสดงผลตาม Time Zone ที่ต้องการ
- การเปลี่ยนกติกากลางแคมเปญต้องมี `rulesVersion`/`campaignVersion` และนโยบายต่อคะแนนเก่า
- แยก Theme, Assets และข้อความกิจกรรม Pride/Songkran ออกจาก Core Game Logic
- แสดงกติกา สิทธิ์รับรางวัล และข้อจำกัดของกิจกรรมให้ชัดเจนก่อนเริ่มเล่น

## 9. 📱 UX, Accessibility และ Localization

**มาตรฐานขั้นต่ำ**

- ปุ่มควบคุมรองรับ Touch Target ขนาดใช้งานได้จริง และไม่ชน Browser Gesture
- รองรับหน้าจอแนวตั้งเป็นค่าเริ่มต้นหรือแจ้งชัดเจนเมื่อเกมต้องใช้แนวนอน
- แสดงสถานะโดยไม่ใช้สีเพียงอย่างเดียว และเปิด/ปิดเสียงได้
- เกมที่จับเวลา ควรมีทางเลือกหรือความยืดหยุ่นด้านเวลาเมื่อรูปแบบเกมอนุญาต
- รองรับ Keyboard และ Screen Reader สำหรับส่วน UI ที่ทำได้ โดยใช้ HTML แทน Canvas สำหรับข้อความและปุ่มสำคัญ
- เตรียม Loading, Empty, Network Error, Retry และ Offline Behavior ให้ชัดเจน
- รองรับภาษาไทย/อังกฤษผ่านระบบข้อความกลาง หลีกเลี่ยง Hardcode Strings ใน Game Engine
- เคารพ `prefers-reduced-motion` สำหรับ Animation ที่ไม่จำเป็นต่อการเล่น

## 10. ⚡ Performance และ Resource Management

- Lazy-load Game Module/Engine เฉพาะเมื่อเข้าหน้าเกม และแยก Asset ตามเกม
- บีบอัดรูป เสียง และ Sprite Atlas ตามขนาดที่เหมาะกับ Mobile; หลีกเลี่ยงโหลด Media ใหญ่ล่วงหน้า
- ใช้ `devicePixelRatio` อย่างมีขอบเขตเพื่อไม่ให้ Canvas มี Pixel Count สูงเกินจำเป็น
- ไม่เรียก `setState` ทุก Frame หากไม่มีเหตุผล; แยก Mutable Game State จาก React UI State
- จำกัดความถี่การ Sync Firestore: **ห้าม** เขียนคะแนนทุก Frame; เขียนเมื่อมี Event ที่จำเป็น
- ลด Listener, Interval, Canvas และ GPU Resources ที่ค้างหลังเปลี่ยนหน้า
- ทดสอบบน Android/iPhone จริงหรือ Device Emulation และเครือข่ายช้า ก่อนปล่อย Production
- วัด Bundle Size, Frame Time, Memory Usage และความถี่ Network Requests แล้วจึงตัดสินใจ Optimization

## 11. 🔐 Security, Privacy และ Anti-Abuse

**สำหรับสื่อและกิจกรรม 18+:** ตรวจอายุตามข้อกำหนดที่ใช้บังคับก่อนปล่อย Restricted Assets ผ่าน Server หรือ Storage Policy, จำกัด URL ที่เข้าถึงได้, ใช้สื่อที่มีสิทธิ์เผยแพร่, มีขั้นตอนรับรายงานและนำเนื้อหาออก, และตั้งค่า Default ไม่เผยแพร่ตัวตน/ประวัติการเล่นที่อ่อนไหวต่อผู้อื่น ระบบตรวจอายุที่พัฒนาขึ้นต้องประเมินการเก็บข้อมูลส่วนบุคคลและระยะเวลาจัดเก็บอย่างรอบคอบ


1. อย่าเก็บ Secrets หรือ Firebase Admin Credentials ใน Client Code หรือ `NEXT_PUBLIC_*`
2. ตรวจ Authentication, Authorization และ Input Validation ใน Route Handlers / Server Services
3. ห้ามให้ Client เขียน `gameResults`, `leaderboards` หรือ Badge Grants โดยตรง
4. Firestore Rules ต้องยึด **Least Privilege**; Firebase Admin SDK ข้าม Firestore Security Rules จึงต้องตรวจสิทธิ์ใน Server Code เอง
5. เพิ่ม Rate Limiting สำหรับเริ่ม Session และส่งคะแนน รวมถึงตรวจ Replay/Automation Pattern
6. ไม่เชื่อ `uid`, คะแนน, Timestamp, Win State หรือ Badge ที่ส่งมาจาก Browser
7. ไม่ใช้ LocalStorage เป็นหลักฐานยืนยันคะแนนหรือสิทธิ์รับรางวัล
8. เก็บข้อมูลเท่าที่จำเป็น พร้อม Retention/Deletion Policy ที่สอดคล้องกับแพลตฟอร์มหลัก
9. หากเกมสุ่มรางวัลที่มีมูลค่าหรือเกี่ยวกับการชิงโชค ต้องผ่านการพิจารณานโยบายและกฎหมายก่อนเปิดใช้

**การใช้บัญชีร่วมกับ `gaybkk.co`:** Firebase Project เดียวกัน **ไม่ได้** หมายถึงมี Cross-Subdomain SSO อัตโนมัติ ต้องยืนยัน Flow ที่ออกแบบไว้ใน `FIREBASE.md` และทดสอบจริงก่อนเรียกใช้งานว่า Shared Login

## 12. 🧪 Testing Strategy

| ระดับ | สิ่งที่ต้องทดสอบ |
| --- | --- |
| Unit | กติกา คะแนน Tie-break, Timer, Boundary และ Invalid Inputs |
| Component | Controls, Loading, Error States, Dialogs และ Responsive Layout |
| Integration | Auth → Session → Submit → Validation → Firestore → Ranking |
| Security | Unauthorized, Expired Token, Forged UID, Replay, Duplicate Submit, Impossible Score |
| E2E | Guest Play, Signed-in Play, Network Failure, Retry, Navigation/Unmount |
| Device | Touch, Orientation, DPR, Mobile GPU, Memory, Audio Policy |
| Accessibility | Keyboard, Focus, Contrast, Screen Reader และ Reduced Motion |

**ก่อน Merge** ให้ตรวจสอบ Scripts ที่มีจริงใน `package.json` แล้วรันคำสั่งที่โครงการรองรับ เช่น:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

> คำสั่งด้านบนเป็นตัวอย่าง **อย่าสรุปว่ามี Script เหล่านี้ทั้งหมด** จนกว่าจะตรวจ `package.json` และอย่ารายงานว่าทดสอบผ่านหากยังไม่ได้รันจริง

## 13. 🚀 ขั้นตอนเพิ่มเกมใหม่ (Implementation Workflow)

1. สำรวจ `AGENTS.md`, `README.md`, `package.json`, `games/registry.ts` (หากมี) และเกมต้นแบบใน Repo
2. เขียน Game Brief: กลุ่มเป้าหมาย, Core Loop, Controls, Score Rules, Win/Loss Conditions, Assets
3. กำหนด `id`, `slug`, `rulesVersion`, Mode และข้อกำหนด Leaderboard/Badges
4. แยก Pure Game Rules และ Unit Tests ก่อนเชื่อม Rendering
5. ทำ UI แบบ Mobile-First และจัดการ Game Lifecycle/Resource Cleanup
6. หากมีคะแนนจัดอันดับ ให้เชื่อม Trusted Session/Validation และ Firestore Rules ตามสถาปัตยกรรมจริง
7. ทดสอบ Negative Cases: ปลอมคะแนน, Submit ซ้ำ, Session หมดอายุ, Network หลุด
8. วัด Performance และตรวจ Accessibility บนอุปกรณ์เป้าหมาย
9. ตรวจ Code Review และอนุมัติก่อนเปิดเกมใน Lobby หรือ Deploy Production
10. อัปเดต Docs **เฉพาะเมื่อสถาปัตยกรรม กติกากลาง หรือขั้นตอน Deploy เปลี่ยน** ไม่สร้างเอกสารเพิ่มโดยไม่จำเป็น

### ✅ Definition of Done

- [ ] เล่นจบรอบได้จริงด้วย Touch บน Mobile และ Controls ตามที่ออกแบบ
- [ ] มี Loading, Error, Retry และ Unmount Cleanup ที่ถูกต้อง
- [ ] กติกาคะแนนและเงื่อนไขจบเกมมี Tests ครอบคลุม Edge Cases
- [ ] ไม่ให้ Client ยืนยันคะแนนหรือมอบ Badge เอง
- [ ] หากมี Leaderboard: ตรวจ Auth, Session, Score Claim, Replay และ Duplicate Submit แล้ว
- [ ] ไม่มี Secrets ใน Repository หรือ Client Bundle
- [ ] ทดสอบ Responsive, Accessibility และ Performance ระดับที่เหมาะกับเกม
- [ ] ผ่าน Quality Gates ที่ Repo รองรับจริง และไม่ทำให้เกมเดิมพัง
- [ ] อัปเดต Game Registry, UI Copy และเอกสารที่เกี่ยวข้องแล้ว
- [ ] ฟีเจอร์ที่ยังไม่พร้อมถูกระบุชัด ไม่แสดงเป็น Production-Ready
- [ ] เกม Adult: ตรวจการเข้าถึงตามอายุ/สิทธิ์, คำเตือน, ความยินยอม, สิทธิ์สื่อ และทางเลือกข้าม/ออกเกม
- [ ] ยืนยันข้อกำหนดกฎหมายและผู้ให้บริการที่เกี่ยวข้องก่อนเปิดเผยแพร่สื่อเปลือย

## 14. 📚 เอกสารที่เกี่ยวข้อง

- [`../README.md`](../README.md) — ภาพรวมโครงการและการเริ่มต้นใช้งาน
- [`../AGENTS.md`](../AGENTS.md) — กฎสำหรับผู้พัฒนาและ AI Coding Agents
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — ภาพรวมสถาปัตยกรรมและ Trust Boundaries
- [`FIREBASE.md`](FIREBASE.md) — Authentication, Firestore Data Model และ Security Rules
- [`DEPLOYMENT.md`](DEPLOYMENT.md) — Hostinger VPS, PM2, Nginx และ Release Process

---

**Maintained by:** gaybkk.co · **Repository:** `gaybkk-games`<br />
เอกสารนี้เป็นมาตรฐานการพัฒนาที่ตั้งใจใช้กับโครงการ ไม่ใช่หลักฐานว่าระบบทุกส่วนพร้อมใช้งานแล้ว
