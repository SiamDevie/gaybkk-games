<div align="center">

# 🎮 gaybkk-games

**Play Dirty. Get Naughty. Stay Fabulous.**<br />
แพลตฟอร์มเกมปาร์ตี้และความบันเทิงสำหรับผู้ใหญ่ 18+ ในชุมชน **gaybkk.co**

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
![License](https://img.shields.io/badge/License-Proprietary-555555)
![Status](https://img.shields.io/badge/Status-In_Development-orange)

**[🌐 Games](https://games.gaybkk.co)** · **[🏳️‍🌈 gaybkk.co](https://gaybkk.co)**

</div>

---

## 🌈 ภาพรวมโครงการ (Project Overview)

**gaybkk-games** คือแพลตฟอร์มมินิเกมและกิจกรรมแบบอินเทอร์แอ็กทีฟที่ออกแบบมาเพื่อขยายประสบการณ์ของชุมชน **gaybkk.co** ผ่านเกม Casual, Party, Quiz และเกมธีม Sexy / Adult สำหรับผู้ใหญ่อายุ 18 ปีขึ้นไป ที่เข้าถึงง่าย โดยให้ความสำคัญกับการใช้งานบนมือถือเป็นอันดับแรก (Mobile-First)

ระบบให้บริการผ่าน **`games.gaybkk.co`** ซึ่งแยกการประมวลผลและการ Deploy ออกจากเว็บไซต์หลัก เพื่อรองรับการปรับขนาด ดูแลประสิทธิภาพ และกำหนดขอบเขตความปลอดภัยได้อย่างอิสระ ขณะเดียวกันมีเป้าหมายในการเชื่อมโยงบัญชีผู้ใช้ โปรไฟล์ คะแนน และกิจกรรมกับ **gaybkk.co** อย่างปลอดภัย

> **สถานะโครงการ:** อยู่ระหว่างการพัฒนา รายการฟีเจอร์และโครงสร้างด้านล่างเป็นสถาปัตยกรรมเป้าหมาย ไม่ใช่การยืนยันว่าทุกส่วนพร้อมใช้งานแล้ว

## ✨ จุดเด่นและระบบหลัก (Key Features)

| ระบบ | รายละเอียด |
| --- | --- |
| 🎲 **Games Lobby** | หน้ารวมเกม Casual / Party / Quiz / Adult พร้อมตัวกรองระดับเนื้อหาและการแสดงคำเตือน |
| 🔞 **Adult Access Controls** | Age Gate, สิทธิ์เข้าถึงตามนโยบาย และค่าการแสดงเนื้อหาที่ผู้ใช้เลือกได้ (สถานะเป้าหมาย) |
| 🔐 **Shared Profile & Auth** | เชื่อมโยงตัวตนผู้ใช้กับ gaybkk.co ผ่าน Firebase Auth และกลไกยืนยันตัวตนข้ามซับโดเมนที่ปลอดภัย |
| 🏆 **Leaderboards & Badges** | จัดอันดับคะแนน ความสำเร็จ และเหรียญรางวัลผ่าน Firestore พร้อมการอัปเดตแบบเรียลไทม์ตามความเหมาะสม |
| 🎉 **Community Events** | มินิเกมและแคมเปญตามเทศกาล เช่น Pride Month และ Songkran |
| 📱 **Mobile-First Experience** | อินเทอร์เฟซตอบสนองต่อขนาดหน้าจอ รองรับการสัมผัสและประสิทธิภาพบนอุปกรณ์พกพา |
| 🛡️ **Secure Score Submission** | ตรวจสอบสิทธิ์และความถูกต้องของคะแนนฝั่งเซิร์ฟเวอร์ก่อนบันทึกข้อมูลสำคัญ |

## 🔞 Adult Entertainment & Content Policy (Target)

แพลตฟอร์มออกแบบสำหรับ **ผู้ใหญ่ 18+** รวมเกมแนวเซ็กซี่ มุกสองแง่สองง่าม คำถามความสัมพันธ์ และคอนเทนต์ภาพเปลือยของผู้ใหญ่ที่ยินยอม **เมื่อผ่านการตรวจสอบกฎหมาย สิทธิ์ในสื่อ และข้อกำหนดผู้ให้บริการก่อนเผยแพร่** การระบุ 18+ ไม่ได้ทำให้เนื้อหาทุกชนิดเผยแพร่ได้โดยอัตโนมัติ

| Content Rating | แนวทาง | ตัวอย่าง |
| --- | --- | --- |
| `SPICY` 🌶️ | คำถามทะลึ่งและอารมณ์ขันสำหรับผู้ใหญ่ | Dirty Mind |
| `HOT` 🔥 | ภาพเซ็กซี่ ไม่จำเป็นต้องเปลือย | Smash or Pass (ใช้สื่อได้รับสิทธิ์) |
| `XXX` 🍆 | ภาพเปลือยของผู้ใหญ่ที่ยินยอม (ขึ้นกับการอนุมัติ) | ชุดภาพในเกมสำหรับผู้ใหญ่ |
| `AFTER_DARK` 😈 | ธีม/คำถามความสัมพันธ์และเรื่องเพศแบบตรงไปตรงมา | Truth or Dare: After Dark |

**แยกข้อมูลสามด้าน:** `contentRating` (ระดับเนื้อหา), `contentWarnings` (คำเตือนเฉพาะ), และ `accessPolicy` (เงื่อนไขเข้าใช้) ไม่ใช้ Rating เพียงอย่างเดียวเป็นระบบควบคุมสิทธิ์ ต้องมี Age Gate และมาตรการยืนยันอายุให้เหมาะกับกฎหมายและความเสี่ยง; ผู้ใช้เลือกไม่ดู/ข้ามได้ และต้องไม่เปิดเผยความสนใจหรือประวัติเนื้อหาผู้ใหญ่บนโปรไฟล์สาธารณะโดยปริยาย

**เกม 11 เกมที่เสนอในระยะแรก:** Size Matters?, Never Have I Ever, Top Bottom or Vers?, Smash or Pass, Truth or Dare: After Dark, Red Flag Detector, Who's the Drama Queen?, Gaydar 3000, Dirty Mind, EX-FILES และ Gay Battle Royale (ยังไม่ถือว่า Implement แล้ว) รายละเอียดและกฎอยู่ใน [`docs/GAME-DEVELOPMENT.md`](docs/GAME-DEVELOPMENT.md)


## 🧰 เทคโนโลยีที่ใช้ (Tech Stack)

| หมวดหมู่ | เทคโนโลยี | การใช้งาน |
| --- | --- | --- |
| Frontend | Next.js (App Router), React, TypeScript | โครงสร้างแอปและ UI |
| Styling | Tailwind CSS | Responsive UI และ Design System |
| Rendering | HTML5 Canvas / WebGL | การแสดงผลเกมในเบราว์เซอร์ |
| Game Libraries | Phaser / Pixi.js | เลือกใช้ตามความเหมาะสมของแต่ละเกม ไม่จำเป็นต้องติดตั้งทั้งหมด |
| Authentication | Firebase Authentication | ยืนยันตัวตนและเชื่อมโยงบัญชี |
| Database & Sync | Cloud Firestore | โปรไฟล์ คะแนน อันดับ และความสำเร็จ |
| Runtime | Node.js | รัน Next.js ใน Production |
| Process Manager | PM2 | จัดการโปรเซสและการรีสตาร์ต |
| Web Server | Nginx | Reverse Proxy และ HTTPS |
| Hosting | Hostinger VPS | โครงสร้างพื้นฐานแยกจากเว็บไซต์หลัก |

## 📁 โครงสร้างโปรเจกต์ (Directory Structure)

ตัวอย่างโครงสร้างที่แนะนำสำหรับ **Next.js App Router โดยไม่มีโฟลเดอร์ `src/`**:

```text
gaybkk-games/
├── app/
│   ├── api/
│   │   ├── scores/route.ts       # API รับคะแนนและตรวจสอบสิทธิ์
│   │   └── leaderboards/route.ts # API อันดับคะแนน
│   ├── games/
│   │   ├── page.tsx              # Games Lobby
│   │   └── [slug]/page.tsx       # หน้าเกมตาม slug
│   ├── leaderboard/page.tsx      # ตารางคะแนน
│   ├── profile/page.tsx          # โปรไฟล์ผู้เล่น
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # หน้าแรก
│   └── globals.css
├── components/
│   ├── games/                    # องค์ประกอบที่ใช้ซ้ำในเกม
│   └── ui/                       # UI Components
├── games/                        # Logic และ Assets เฉพาะเกม
├── lib/
│   ├── firebase/client.ts       # Firebase Client SDK
│   ├── firebase/admin.ts        # Firebase Admin SDK (server-only)
│   └── auth/                    # การตรวจสอบ Session / Token
├── hooks/                        # React Hooks
├── types/                        # TypeScript Types
├── public/                       # Static Assets
├── .env.example                  # ตัวอย่างตัวแปรแวดล้อม (ไม่ใส่ Secrets)
├── .env.local                    # ค่า Local (ห้าม Commit)
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

> หมายเหตุ: โครงสร้างนี้เป็น **ตัวอย่างเป้าหมาย** ควรปรับให้ตรงกับไฟล์และฟีเจอร์ที่ใช้งานจริงใน Repository

## 🚀 การติดตั้งและใช้งานในเครื่อง (Getting Started)

**สิ่งที่ต้องมี:** Node.js รุ่น LTS ที่รองรับ Next.js เวอร์ชันที่ติดตั้ง, npm และ Firebase Project ที่กำหนดค่าเรียบร้อย

### 1. Clone Repository

```bash
git clone https://github.com/<organization-or-username>/gaybkk-games.git
cd gaybkk-games
```

> เปลี่ยน `<organization-or-username>` เป็นเจ้าของ Repository จริง

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ **`.env.local`** ที่ Root ของโปรเจกต์:

```dotenv
PORT=3001

# Firebase Web Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_web_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin SDK (เฉพาะฝั่ง Server; ใช้เมื่อมีการตรวจสอบ Token/คะแนน)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**ข้อควรทราบ:** ค่า `NEXT_PUBLIC_*` ถูกส่งไปยังเบราว์เซอร์ได้ จึงห้ามใส่ Secret ในตัวแปรกลุ่มนี้ ส่วน Private Key ต้องใช้เฉพาะฝั่งเซิร์ฟเวอร์เท่านั้น และไม่ควรถูก Commit ลง Git

### 4. เริ่ม Development Server

```bash
npm run dev -- -p 3001
```

เปิด **http://localhost:3001** เพื่อทดสอบระบบ

> การกำหนด `PORT=3001` ใน `.env.local` มีไว้เป็นข้อมูลตั้งค่าของโปรเจกต์ แต่ **Next.js ไม่ใช้ค่า PORT จาก `.env.local` เพื่อกำหนดพอร์ตตอนเริ่มเซิร์ฟเวอร์โดยอัตโนมัติ** จึงระบุ `-p 3001` อย่างชัดเจน (หรือกำหนดใน npm script)

## 🏗️ สถาปัตยกรรม Deployment (Hostinger VPS)

```text
ผู้เล่น (HTTPS)
      │
      ▼
games.gaybkk.co
      │
      ▼
Nginx Reverse Proxy + TLS
      │
      ▼
***.*.*.*:****
      │
      ▼
PM2 → Next.js / Node.js
      │
      ├── Firebase Authentication
      └── Cloud Firestore
```

### 1. Build และเริ่มระบบด้วย PM2

ติดตั้ง Dependencies และ Build บน VPS:

```bash
npm ci
npm run build
npm install -g pm2
pm2 start npm --name "gaybkk-games" -- start -- -p 3001 -H 127.0.0.1
pm2 save
```

คำสั่งข้างต้นสมมติว่า `package.json` มี Script `"start": "next start"` และตั้งค่าตัวแปรแวดล้อม Production บนเซิร์ฟเวอร์เรียบร้อยแล้ว สำหรับการเริ่มอัตโนมัติหลังรีบูต ให้ใช้ `pm2 startup` และปฏิบัติตามคำสั่งที่ PM2 แสดง

### 2. ตัวอย่าง Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name games.gaybkk.co;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name games.gaybkk.co;

    ssl_certificate     /etc/letsencrypt/live/games.gaybkk.co/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/games.gaybkk.co/privkey.pem;

    location / {
        proxy_pass http://***.*.*.*:****;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

> ตัวอย่างนี้ใช้เส้นทางใบรับรองจาก Let's Encrypt **หลังออก SSL Certificate สำเร็จแล้ว** ต้องตั้งค่า DNS, Firewall, SSL Renewal และตรวจสอบไฟล์ Nginx ตามสภาพแวดล้อมจริงก่อนใช้งาน

## 🤝 แนวทางพัฒนาและความปลอดภัย (Contributing & Security)

- สร้าง Branch สำหรับแต่ละงาน และส่ง Pull Request เพื่อให้ตรวจสอบก่อน Merge เข้าสู่ Branch หลัก
- ใช้ TypeScript อย่างเคร่งครัด ตรวจสอบ Build, Lint และ Test ก่อน Deploy
- ห้าม Commit **`.env.local`**, Service Account JSON, Private Key, Access Token หรือข้อมูลผู้ใช้จริง; ควรจัดเก็บค่า Production ใน Secret Manager หรือพื้นที่ปลอดภัยของ VPS
- กำหนด **Firestore Security Rules** ตามหลัก Least Privilege และตรวจสอบสิทธิ์ทุกครั้งก่อนเข้าถึงข้อมูลที่จำกัด
- **อย่าเชื่อถือคะแนนที่ส่งจาก Client โดยตรง**: ตรวจสอบ Session/ID Token, รูปแบบข้อมูล, Rate Limit และตรรกะป้องกันการโกงฝั่ง Server
- การใช้ Firebase Auth ร่วมกัน **ไม่ได้ทำให้ล็อกอินข้าม Subdomain อัตโนมัติ** ต้องออกแบบ Session หรือ Token Exchange ที่ปลอดภัย พร้อมกำหนด Authorized Domains และนโยบาย Cookie/CORS ให้เหมาะสม
- ออกแบบเกมและ UI ให้เข้าถึงได้ง่าย เคารพความหลากหลาย และหลีกเลี่ยงการเปิดเผยข้อมูลส่วนบุคคลใน Leaderboard โดยไม่ได้รับความยินยอม
- รายงานช่องโหว่ความปลอดภัยผ่านช่องทางส่วนตัวของทีมงาน ไม่เปิดเผย Exploit หรือ Credential ใน Public Issue

## ©️ ลิขสิทธิ์และทีมงาน (License & Team)

พัฒนาและดูแลโดย **gaybkk.co** เพื่อสร้างประสบการณ์เกมและกิจกรรมสำหรับชุมชนเกย์วัยผู้ใหญ่และผู้ใช้ที่มีอายุเข้าเกณฑ์

**License:** Proprietary — สงวนลิขสิทธิ์ทั้งหมด เว้นแต่จะมีไฟล์ `LICENSE` หรือประกาศสิทธิการใช้งานอื่นจากเจ้าของโครงการอย่างชัดเจน

**เว็บไซต์หลัก:** [gaybkk.co](https://gaybkk.co)<br />
**แพลตฟอร์มเกม:** [games.gaybkk.co](https://games.gaybkk.co)

---

<div align="center">

**🎮 Play Dirty. Get Naughty. Stay Fabulous. 🏳️‍🌈**

</div>
