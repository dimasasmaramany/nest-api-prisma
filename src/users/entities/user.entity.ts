// src/users/entities/user.entity.ts

export class User {
  id: number;
  email: string;
  name: string | null; // Sesuai dengan String? di Prisma
  password?: string; // Opsional atau disembunyikan saat dikembalikan ke client
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
