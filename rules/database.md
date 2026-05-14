Naming

- Table: snake_case
- Column: snake_case
- Relation: jelas dan konsisten
- ID: UUID
- Timestamp wajib: created_at, updated_at
- Soft delete jika data penting: deleted_at

Tables

- users
- roles
- products
- product_images
- categories
- brands
- carts
- cart_items
- orders
- order_items
- payments
- shipments
- shipping_addresses
- reviews
- coupons
- inventory_logs

Rules

- Jangan hapus transaksi penting secara permanen.
- Gunakan transaction saat checkout.
- Stock tidak boleh minus.
- Payment webhook harus idempotent.
  EOF
