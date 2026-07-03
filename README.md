# PlayStation 5 – Landing Page

Bài nộp Vòng 2 – TTS IT Phát triển Website – HeliCorp.

## Công nghệ sử dụng
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- lucide-react (icon), @headlessui/react (Dialog menu mobile)

## Tính năng đã làm
**Bắt buộc:**
- Hero Section, Tính năng nổi bật, Thông số kỹ thuật, Form đăng ký nhận tin
- Responsive đầy đủ (mobile/desktop)
- Meta SEO cơ bản: Title, Description, Open Graph, Twitter Card (index.html)
- Tối ưu hiệu năng: skeleton loading + width/height cố định cho ảnh Hero (giảm CLS),
  fetchPriority="high" cho ảnh LCP, code-splitting mặc định của Vite, CSS/JS minify

**Điểm cộng đã làm:**
- Dark Mode (nút bật/tắt trên Header, tự nhận theo hệ điều hành lần đầu)
- Scroll Animation (fade-up so le khi cuộn tới từng section/card)
- Thanh tiến trình cuộn trang (Scroll Progress Bar)
- Theo dõi hành vi người dùng (scroll mốc 25/50/75/100%, click nút "Mua ngay",
  submit form) -> hiển thị Toast thông báo
- Validate dữ liệu form + gửi thực tế về Webhook (cấu hình qua biến môi trường)
- Skeleton Loading cho ảnh Hero

## Chạy thử ở máy local

npm install
npm run dev

## Cấu hình Webhook (điểm cộng)
1. Vào https://webhook.site để lấy 1 URL test miễn phí.
2. Copy file .env.example thành .env, dán URL vào biến VITE_WEBHOOK_URL.
3. Chạy lại npm run dev, submit form và kiểm tra dữ liệu nhận được trên webhook.site.

## Build production

npm run build
npm run preview

## Đưa code lên GitHub

git init
git add .
git commit -m "feat: initial PS5 landing page with scroll animation and dark mode"
git branch -M main
git remote add origin https://github.com/<username>/ps5-landing.git
git push -u origin main

Gợi ý nhánh: làm việc trên dev, mở Pull Request vào main để "chia nhánh khoa học" theo yêu cầu đề bài.

## Deploy lên Vercel (miễn phí)
1. Vào https://vercel.com, đăng nhập bằng GitHub.
2. "Add New Project" -> chọn repo ps5-landing.
3. Vercel tự nhận diện Vite, không cần chỉnh build command (npm run build), output dist.
4. Nếu có dùng Webhook, thêm biến môi trường VITE_WEBHOOK_URL trong tab Settings -> Environment Variables.
5. Deploy -> nhận link https://ps5-landing-xxxx.vercel.app

## Đo điểm PageSpeed Insights
1. Sau khi có link deploy, vào https://pagespeed.web.dev
2. Dán link, chọn tab Mobile, chạy phân tích.
3. Chụp màn hình điểm số để đính kèm khi nộp bài.

Lưu ý để đạt >= 85/100 điểm Mobile:
- Ảnh Hero hiện đang trỏ tới CDN ngoài (herogame.vn) - nên tải ảnh này về,
  nén lại bằng https://squoosh.app sang định dạng WebP kích thước ~640px,
  đặt vào src/assets/ rồi import trực tiếp để Vite tự tối ưu và tự host trên domain của bạn.
- Đây là yếu tố ảnh hưởng điểm số nhiều nhất vì ảnh ngoài không được nén tối ưu.
