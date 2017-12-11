## Hướng dẫn import, compile, build, run

### 1. Yêu cầu các phụ thuộc
- Node.js v7 hoặc lớn hơn (có thể tải tại [đây](https://nodejs.org/en/download/))
- NPM (Nodejs Package Manager) v5 hoặc lớn hơn (chạy lệnh: `[sudo] npm install npm@latest -g`)
- MySQL 5.7 (có thể tham khảo cài đặt ở [đây](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04))

### 2. Import, compile
- Đảm bảo có đủ các file `package.json` trong 3 thư mục: thư mục gốc của project, thư mục `/frontend` và thư mục `/admin`
- Chạy lệnh: `npm install` tại 3 thư mục để cài đặt các phụ thuộc cho phần server, phần giao diện khách hàng và phần giao diện quản trị tương ứng.

### 3. Build
- Đối với phần server có thể chạy trực tiếp trên Nodejs runtime nên không cần build
- Đối với 2 phần giao diện khách hàng, giao diện quản trị, được xây dựng dựa trên framework ReactJs nên ta cần build bằng lệnh : `npm run-script build` cho mỗi phần ở mỗi thư mục tương ứng.

### 4. Run
- Đảm bảo server MySQL đang hoạt động
- Cài đặt cấu hình trong file config với các thông tin cổng phục vụ (port), cơ sở dữ liệu trên máy cài đặt
- Chạy server với lệnh : `node server/apps/app.js`
- Trên trình duyệt web, nhập vào địa chỉ: `localhost:<port>` và bắt đầu sử dụng website