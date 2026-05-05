import { BadRequestException } from '@nestjs/common';
import { diskStorage, Options } from 'multer';
import { MulterError } from 'multer';
import { extname } from 'path';

// 🔥 CONFIG UPLOAD (storage + size + type)
export const uploadOptions: Options = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      // Generate nama file unik: timestamp + random + ekstensi asli
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return cb(
        new BadRequestException('Hanya file gambar (jpg, jpeg, png)') as any,
        false,
      );
    }
    cb(null, true);
  },
};

// 🔥 HANDLE ERROR MULTER
export const handleUploadError = (error: any) => {
  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      throw new BadRequestException('Ukuran file maksimal 5MB');
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      throw new BadRequestException('Jumlah file melebihi batas (maks 5)');
    }
  }
  throw error;
};