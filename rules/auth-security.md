Auth Security

JWT

- Gunakan access token pendek.
- Gunakan refresh token.
- Refresh token wajib disimpan hashed.
- Logout harus revoke refresh token.

Password

- Hash password dengan bcrypt/argon2.
- Jangan pernah return password.
- Jangan log password.

Security

- Helmet wajib aktif.
- CORS hanya domain frontend.
- Rate limit login/register.
- Validasi semua DTO.
- Gunakan Prisma parameterized query.
- Jangan expose stack trace ke user.

Midtrans

- Validasi signature webhook.
- Webhook harus idempotent.
- Jangan percaya status payment dari frontend.
- Status payment hanya dari webhook resmi.
  EOF
