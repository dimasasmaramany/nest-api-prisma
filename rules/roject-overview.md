# 01-project-overview.md

## Project
Backend API untuk aplikasi e-commerce.

## Stack
- Framework: NestJS
- ORM: Prisma
- Database: PostgreSQL / MySQL
- Auth: JWT + Refresh Token
- Cache: Redis
- Queue: BullMQ
- Storage: Local Storage
- Payment Gateway: Midtrans

## Modul Utama
- Auth
- Users
- Roles & Permissions
- Products
- Categories
- Brands
- Inventory
- Cart
- Checkout
- Orders
- Payments
- Shipping
- Reviews
- Coupons
- Notifications
- Reports

## Aturan Umum
- Semua logic bisnis berada di service.
- Controller hanya menerima request dan mengembalikan response.
- Semua input wajib menggunakan DTO.
- Semua endpoint private wajib memakai JWT Guard.
- Semua role wajib dicek dengan Role Guard.
EOF

cat > ecommerce-api/rules/02-task.md <<'EOF'
# 02-task.md

## Tujuan
Mencatat task backend e-commerce.

## Format Task

### Nama Task
Status: TODO / IN_PROGRESS / REVIEW / TESTING / DONE

### Deskripsi
Jelaskan fitur backend yang dibuat.

### Checklist
- [ ] Buat module
- [ ] Buat controller
- [ ] Buat service
- [ ] Buat repository jika dibutuhkan
- [ ] Buat DTO
- [ ] Buat Prisma model
- [ ] Buat migration
- [ ] Buat guard jika private
- [ ] Buat test
- [ ] Update dokumentasi API

## Modul Prioritas
- [ ] Auth
- [ ] User
- [ ] Product
- [ ] Category
- [ ] Cart
- [ ] Checkout
- [ ] Order
- [ ] Payment Midtrans
- [ ] Inventory
- [ ] Shipping
EOF

cat > ecommerce-api/rules/03-flow.md <<'EOF'
# 03-flow.md

## Flow Utama E-Commerce

### Register
User input data → validasi DTO → hash password → simpan user → response success.

### Login
User input email/password → validasi → cek user → cek password → generate JWT → generate refresh token → response token.

### Checkout
Customer checkout → validasi cart → cek stok → buat order → buat payment Midtrans → response payment token/url.

### Payment Webhook
Midtrans kirim webhook → validasi signature → update payment → update order → kurangi stok → kirim notifikasi.

### Order
Customer buat order → admin proses → warehouse packing → input resi → shipped → completed.
EOF

cat > ecommerce-api/rules/04-roles-permission.md <<'EOF'
# 04-roles-permission.md

## Roles

### super_admin
- Mengelola semua data
- Mengelola admin
- Mengakses laporan
- Mengubah konfigurasi sistem

### admin
- Mengelola produk
- Mengelola kategori
- Mengelola order
- Mengelola voucher
- Melihat laporan

### warehouse
- Melihat order masuk
- Mengelola stok
- Packing order
- Input nomor resi
- Update status pengiriman

### customer
- Melihat produk
- Cart
- Checkout
- Payment
- Riwayat order
- Review produk
- Wishlist

## Rules
- Customer tidak boleh akses endpoint admin.
- Admin tidak boleh menghapus super_admin.
- Warehouse tidak boleh mengubah harga produk.
- User hanya boleh melihat order miliknya sendiri.
EOF

cat > ecommerce-api/rules/05-backend-architecture.md <<'EOF'
# 05-backend-architecture.md

## Arsitektur NestJS

Controller
↓
Service
↓
Repository / Prisma Service
↓
Database

## Rules
- Controller tidak boleh berisi business logic.
- Service berisi business logic.
- DTO wajib untuk request body.
- Guard untuk authentication dan authorization.
- Interceptor untuk transform response.
- Filter untuk error handling.
- Queue digunakan untuk proses berat.
- Redis digunakan untuk cache dan rate limit.
EOF

cat > ecommerce-api/rules/06-backend-structure.md <<'EOF'
# 06-backend-structure.md

## Struktur Folder

```txt
src/
  modules/
    auth/
    users/
    products/
    categories/
    brands/
    cart/
    checkout/
    orders/
    payments/
    inventory/
    shipping/
    reviews/
    coupons/
    notifications/
    reports/
  common/
    guards/
    decorators/
    filters/
    interceptors/
    pipes/
    utils/
  config/
  prisma/
  queues/
  storage/

  