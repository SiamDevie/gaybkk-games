# 🚀 Deployment Guide — gaybkk-games

> **แอปพลิเคชัน:** `https://games.gaybkk.co` · **แพลตฟอร์มหลัก:** `https://gaybkk.co`<br />
> **Infrastructure:** Hostinger VPS (Ubuntu/Linux) · Node.js · PM2 · Nginx · Let's Encrypt SSL<br />
> **Runtime:** Next.js (App Router) พอร์ตภายใน `3001` หลัง Nginx Reverse Proxy

## 🔞 Adult Content Production Gate

> **ข้อกำหนดใหม่ (planned):** `games.gaybkk.co` เตรียมรองรับเนื้อหา Sexy / Nudity / Adult 18+; **การมี SSL และ Age Gate อย่างเดียวไม่ใช่หลักฐานว่าเผยแพร่ได้ตามกฎหมาย** ก่อนปล่อยจริงต้องตรวจข้อกฎหมายในประเทศไทยและทุกพื้นที่เป้าหมาย รวมถึง Hostinger Acceptable Use Policy, CDN/Storage, payment และผู้ให้บริการสื่อที่เกี่ยวข้อง พร้อมให้ผู้รับผิดชอบอนุมัติเป็นลายลักษณ์อักษร

- แยก **public assets** ออกจาก **restricted adult media**; ห้ามใส่ภาพเปลือยที่ต้องจำกัดสิทธิ์ใน `public/` หรือเผยแพร่ผ่าน URL ถาวรที่เดาได้
- ต้องบังคับ Authentication, Age/Access Verification และ Region/Content Policy **ฝั่ง Server** ก่อนส่งสื่อที่จำกัดสิทธิ์; `robots.txt` และ `noindex` ไม่ใช่ Access Control
- กำหนด `Cache-Control` ให้เหมาะกับข้อมูลอ่อนไหว; ตรวจ shared proxy/CDN caching และการออก URL อายุสั้นก่อนใช้จริง
- หน้า Landing/metadata สำหรับผู้ที่ยังไม่ผ่าน Gate ต้องไม่แสดงภาพเปลือย; ตรวจ Open Graph, Search Preview, Error Pages และ CDN Thumbnails
- เปิดระบบ Report/Takedown, ช่องทางแจ้งปัญหา และ Incident Response พร้อมแผนลบไฟล์/Invalidate cache
- ไม่เก็บเอกสารยืนยันอายุและประวัติพฤติกรรมทางเพศใน Application Logs หรือ Analytics ที่ไม่จำเป็น
- ทดสอบ Access Denied ผ่าน Direct URL, API, stale cache และ Signed URL หมดอายุ แยกจากการทดสอบ UI
- หากผู้ให้บริการโฮสติ้งหรือกฎหมายไม่อนุญาตเนื้อหาบางประเภท **ห้าม Deploy เนื้อหาประเภทนั้น** จนกว่าจะมีแนวทางที่ถูกต้องและผ่านการอนุมัติ

---

## 1. 🎯 วัตถุประสงค์และขอบเขต

เอกสารนี้อธิบายขั้นตอนการ Deploy และจัดการระบบ Production ของแพลตฟอร์ม `gaybkk-games` บน Hostinger VPS โดยแยกการทำงานออกจากเว็บไซต์หลัก `gaybkk.co` อย่างเด็ดขาด เพื่อความปลอดภัยและเสถียรภาพสูงสุด

## 2. 🧭 สถาปัตยกรรมการรับส่งข้อมูล (Traffic Flow)

```text
ผู้เล่น (HTTPS / พอร์ต 443)
       │
       ▼
Nginx Reverse Proxy (games.gaybkk.co) + TLS Termination
       │
       ▼ proxy_pass http://127.0.0.1:3001
PM2 Process Manager (gaybkk-games)
       │
       ▼
Next.js / Node.js Production Server (พอร์ต 3001)
       │
       ├── Firebase Authentication
       └── Cloud Firestore
```

## 3. 🛠️ ข้อกำหนดเบื้องต้นบน VPS (Prerequisites)

ก่อนเริ่ม Deploy ต้องมั่นใจว่าเซิร์ฟเวอร์ติดตั้งเครื่องมือเหล่านี้เรียบร้อยแล้ว:

- **Node.js:** เวอร์ชัน LTS (แนะนำให้ตรงกับเวอร์ชันที่ใช้พัฒนาในเครื่อง)
- **npm** หรือ **pnpm / yarn** (ตามที่ใช้ในโปรเจกต์)
- **PM2:** ติดตั้งแบบ Global (`npm install -g pm2`) เพื่อจัดการและรัน Process
- **Nginx:** สำหรับทำ Reverse Proxy และจัดการ SSL Certificate
- **Certbot:** สำหรับออกและต่ออายุใบรับรอง Let's Encrypt SSL

## 4. ⚙️ ขั้นตอนการติดตั้งและ Deploy ครั้งแรก

### 1. โคลนโปรเจกต์และติดตั้ง Dependencies

เข้าไปยังไดเรกทอรีที่ต้องการติดตั้ง (เช่น `/var/www/gaybkk-games`) แล้วดึงโค้ดจาก Repository:

```bash
cd /var/www
git clone https://github.com/<organization-or-username>/gaybkk-games.git
cd gaybkk-games
```

ติดตั้ง Dependencies โดยใช้คำสั่งสำหรับ Production:

```bash
npm ci
```

### 2. ตั้งค่า Environment Variables (Production)

สร้างไฟล์ `.env.production` (หรือตั้งค่าผ่านระบบจัดการ Secret บน VPS) โดยกำหนดค่าตัวแปรแวดล้อมให้ครบถ้วน:

```dotenv
PORT=3001

# Firebase Web Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_production_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin SDK (Server-only)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRODUCTION_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
```

> **ข้อควรระวัง:** ห้าม Commit ไฟล์ Environment ที่มีค่า Production จริงลงใน Git Repository อย่างเด็ดขาด

### 3. Build แอปพลิเคชัน

ทำการ Build Next.js App Router เพื่อสร้าง Production Bundle:

```bash
npm run build
```

ตรวจสอบว่าขั้นตอนการ Build สำเร็จไม่มี Error ของ TypeScript หรือ Lint

### 4. เริ่มต้นระบบด้วย PM2

สร้างและรันกระบวนการทำงานผ่าน PM2 โดยระบุพอร์ต `3001` และจำกัดให้รันบน `127.0.0.1` เท่านั้น:

```bash
pm2 start npm --name "gaybkk-games" -- start -- -p 3001 -H 127.0.0.1
```

บันทึกสถานะ PM2 เพื่อให้ระบบจำการตั้งค่า:

```bash
pm2 save
```

ตั้งค่าให้ PM2 เริ่มต้นทำงานอัตโนมัติเมื่อ VPS รีบูต (ทำตามคำสั่งที่ terminal แสดงผลหลังรันคำสั่งนี้):

```bash
pm2 startup
```

## 5. 🌐 การตั้งค่า Nginx Reverse Proxy

สร้างไฟล์ Configuration ของ Nginx สำหรับโดเมน `games.gaybkk.co`:

```bash
sudo nano /etc/nginx/sites-available/games.gaybkk.co
```

ใส่ค่าคอนฟิกด้านล่างนี้ลงไป:

```nginx
server {
    listen 80;
    server_name games.gaybkk.co;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name games.gaybkk.co;

    ssl_certificate     /etc/letsencrypt/live/games.gaybkk.co/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/games.gaybkk.co/privkey.pem;

    # Security Headers พื้นฐาน
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

เปิดใช้งาน Site และตรวจสอบความถูกต้องของ Nginx Config:

```bash
sudo ln -s /etc/nginx/sites-available/games.gaybkk.co /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

> **First-time SSL bootstrap:** ตัวอย่าง `listen 443 ssl` อ้างอิงไฟล์ Certificate ที่ยังไม่มีในครั้งแรก จึง **ห้าม reload Config นี้ก่อนออกใบรับรอง** ให้เริ่มด้วย HTTP server block ที่เข้าถึงได้และยังไม่ redirect ไป HTTPS หรือใช้ขั้นตอน challenge/Certificate ที่ผ่านการทดสอบก่อน แล้วค่อยเปิด HTTPS และ Redirect ตามลำดับ

### การติดตั้ง SSL Certificate (Let's Encrypt)

หากยังไม่ได้ออกใบรับรอง SSL ให้ใช้ Certbot:

```bash
sudo certbot --nginx -d games.gaybkk.co
```

## 6. 🔄 ขั้นตอนการอัปเดตระบบ (Update Workflow)

เมื่อต้องการอัปเดตโค้ดเวอร์ชันใหม่บน Production ให้ทำตามลำดับขั้นตอนดังนี้:

```bash
# 1. ดึงโค้ดล่าสุดจาก Repository
git pull origin main

# 2. ติดตั้ง Dependencies ที่อาจมีการเปลี่ยนแปลง
npm ci

# 3. Build แอปพลิเคชันใหม่
npm run build

# 4. โหลดแอปใหม่ผ่าน PM2 (อาจมี downtime ใน fork mode / instance เดียว)
pm2 reload gaybkk-games
```

## 7. 🛡️ การบำรุงรักษาและการตรวจสอบ (Operations & Monitoring)

- **ดูสถานะการทำงาน:** `pm2 status`
- **ตรวจสอบ Logs แบบเรียลไทม์:** `pm2 logs gaybkk-games`
- **รีสตาร์ตแอปพลิเคชัน:** `pm2 restart gaybkk-games`
- **ตรวจสอบ Error ของ Nginx:** `sudo tail -f /var/log/nginx/error.log`

## 8. 🚨 ข้อควรระวังด้านความปลอดภัย (Security Best Practices)

- ห้ามเปิดพอร์ต `3001` สู่สาธารณะโดยตรง; ให้ผู้ใช้วิ่งผ่าน Nginx (Port 443 HTTPS) เท่านั้น
- ตรวจสอบสถานะการต่ออายุอัตโนมัติของ Let's Encrypt (`sudo certbot renew --dry-run`)
- สำรองข้อมูลคอนฟิกและตรวจสอบสิทธิ์ของไฟล์ Sensitive บนเซิร์ฟเวอร์อย่างสม่ำเสมอ
- ก่อน Deploy ธีม 18+ ต้องผ่าน Adult Content Production Gate ด้านบนและตรวจสอบอายุ/สิทธิ์ที่ Backend จริง

---

**Project:** `gaybkk-games` · **Owner:** gaybkk.co · **Document:** `docs/DEPLOYMENT.md`
