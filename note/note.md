Dưới đây là giải thích chi tiết về từng thư mục trong dự án :



## Chức Năng Chính

Quản lý sự kiện cá nhân
Đăng ký/Đăng nhập người dùng
CRUD (Create, Read, Update, Delete) sự kiện
Phân quyền người dùng
Lọc và tìm kiếm sự kiện

---

## **Backend (Phần xử lý server với Express.js)**  

### **1. `config/`**  
- Chứa các file cấu hình của hệ thống, ví dụ:
  - `db.js`: Cấu hình kết nối cơ sở dữ liệu (MongoDB, PostgreSQL, MySQL, v.v.).
  - `env.js`: Đọc các biến môi trường từ `.env`.
  <!-- - `passport.js`: Cấu hình xác thực nếu dùng Passport.js. -->

---

### **2. `controllers/`**  
- Chứa các file xử lý logic nghiệp vụ cho từng module.
- Ví dụ:
  - `eventController.js`: Xử lý các yêu cầu liên quan đến sự kiện.
  - `userController.js`: Xử lý logic liên quan đến người dùng.

---

### **3. `data/`**  
- Có thể chứa dữ liệu mẫu hoặc file seed dữ liệu khi khởi tạo database.
- Ví dụ:
  - `eventData.js`: Danh sách sự kiện mẫu.
  - `userData.js`: Danh sách người dùng mẫu.

---

### **4. `middlewares/`**  
- Chứa các middleware tùy chỉnh để xử lý request trước khi đến controller.
- Ví dụ:
  - `authMiddleware.js`: Kiểm tra người dùng đã đăng nhập chưa.
  - `errorMiddleware.js`: Xử lý lỗi chung cho API.

---

### **5. `models/`**  
- Chứa các định nghĩa model cho database (nếu sử dụng ORM như Mongoose, Sequelize).
- Ví dụ:
  - `eventModel.js`: Định nghĩa cấu trúc dữ liệu cho sự kiện.
  - `userModel.js`: Định nghĩa cấu trúc dữ liệu cho người dùng.

---

### **6. `routers/`**  
- Chứa các route điều hướng request đến đúng controller.
- Ví dụ:
  - `eventRoutes.js`: Các endpoint liên quan đến sự kiện.
  - `userRoutes.js`: Các endpoint liên quan đến người dùng.

---

### **7. `utils/`**  
- Chứa các hàm tiện ích dùng chung trong hệ thống.
- Ví dụ:
  - `generateToken.js`: Tạo JWT token.
  - `dateFormatter.js`: Định dạng ngày tháng.

---

### **8. `app.js`**  
- Khởi tạo ứng dụng Express, cấu hình middleware, và import routes.

---

### **9. `server.js`**  
- File chính để chạy server, lắng nghe cổng và khởi động ứng dụng.

---

## **Frontend (Giao diện người dùng - nếu có tách biệt frontend riêng )**  
  Phần này sử dụng  `react js` kết hợp với `ejs`
### **1. `public/`**  
- Chứa tài nguyên tĩnh như:
  - **CSS**: Các file stylesheet.
  - **JS**: Các file script frontend.
  - **Images**: Hình ảnh cần dùng trong giao diện.

---

### **2. `src/`**  
- Chứa mã nguồn chính của frontend, có thể bao gồm:
  - **components/**: Các thành phần giao diện  (phần header, footer ) 
  - **pages/**: Các trang chính của ứng dụng  (phần main) 
  - **services/**: Gọi API từ backend.
  - **App.ejs**: File chính của frontend. ( là layout của trang we:  header, footer giữ nguyên chỉ thay đổi phần main )

---



## khi đẩy lên git cần tạo file .gitignore để không đẩy lên những thư mục không cần thiết 