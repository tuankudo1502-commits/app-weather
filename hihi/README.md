# 🌤️ SkyScope – Dự Báo Thời Tiết

Website dự báo thời tiết thực thời xây dựng bằng **React + Vite**, tích hợp **OpenWeatherMap API**.

---

## 🗂️ Cấu trúc dự án

```
skyscope/
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                   # React root
    ├── App.jsx                    # Root component (layout + state wiring)
    ├── App.module.css
    │
    ├── styles/
    │   └── global.css             # CSS variables, resets, keyframes
    │
    ├── services/
    │   └── weatherApi.js          # OpenWeatherMap API calls
    │
    ├── hooks/
    │   ├── useWeather.js          # Data-fetching state machine
    │   └── useSearchHistory.js    # localStorage search history
    │
    ├── utils/
    │   └── weatherHelpers.js      # Pure helper functions
    │
    └── components/
        ├── Background.jsx / .css  # Animated star + gradient background
        ├── Header.jsx / .css      # Logo & tagline
        ├── SearchBar.jsx / .css   # City search input + button
        ├── SearchHistory.jsx/.css # Recent searches chips
        ├── ErrorMessage.jsx/.css  # Error banner
        ├── LoadingSpinner.jsx/.css
        ├── WelcomeState.jsx/.css  # Initial empty state + quick cities
        ├── CurrentWeather.jsx/.css# Main weather card
        ├── ForecastCard.jsx/.css  # Single day card
        └── ForecastSection.jsx/.css # 5-day forecast grid
```

---

## 🚀 Cài đặt & chạy

```bash
# 1. Cài dependencies
npm install

# 2. Chạy dev server
npm run dev

# 3. Build production
npm run build
```

---

## 🔑 Cấu hình API Key

Mở `src/services/weatherApi.js` và thay `API_KEY` bằng key của bạn:

```js
const API_KEY = 'your_api_key_here'
```

Đăng ký miễn phí tại: https://openweathermap.org/api

---

## ✨ Tính năng

| Tính năng | Mô tả |
|---|---|
| 🔍 Tìm kiếm | Tìm thời tiết theo tên thành phố |
| 🌡️ Thời tiết thực thời | Nhiệt độ, độ ẩm, gió, tầm nhìn, bình minh/hoàng hôn |
| 📅 Dự báo 5 ngày | Biểu tượng + nhiệt độ max/min mỗi ngày |
| 🕐 Lịch sử tìm kiếm | Lưu & truy cập nhanh các thành phố đã tra |
| ❌ Xử lý lỗi | Thông báo rõ ràng khi nhập sai tên thành phố |
| 📱 Responsive | Hoạt động tốt trên mobile, tablet, desktop |

---

## 🛠️ Công nghệ sử dụng

- **React 18** – UI components
- **Vite** – Build tool & dev server
- **CSS Modules** – Scoped styles per component
- **OpenWeatherMap API** – Dữ liệu thời tiết thực thời
- **localStorage** – Lưu lịch sử tìm kiếm
