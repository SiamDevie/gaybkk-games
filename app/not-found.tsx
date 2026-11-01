import { StatePanel } from "@/components/ui/state-panel";

export default function NotFound() {
  return <div className="state-panel--page"><StatePanel icon="404" title="หลงทางใน Lobby" description="ไม่พบหน้าหรือเกมที่คุณกำลังหา" actionHref="/games" actionLabel="กลับไป Games Lobby" /></div>;
}
