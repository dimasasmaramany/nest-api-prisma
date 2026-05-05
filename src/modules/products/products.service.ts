import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { emptyResponse, successResponse } from 'src/common/helpers/response.helper';
import { generateSlug } from 'src/common/helpers/slug.helper';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    // ambil path file jadi array
    const imagePaths = files?.map((file) => `/uploads/${file.filename}`) || [];
    // 🔥 generate slug otomatis

    let slug = generateSlug(createProductDto.name);

    // 🔥 pastikan tidak duplicate

    let isExist = await this.prisma.product.findUnique({
      where: { slug },
    });

    while (isExist) {
      slug = generateSlug(createProductDto.name);
      isExist = await this.prisma.product.findUnique({
        where: { slug },
      });
    }
    
    const product = await this.prisma.product.create({
      data: {
        ...createProductDto,
        slug,
        images: imagePaths, // 🔥 Sesuai schema (image Json)
      },
    });
    return successResponse(product, 'Produk berhasil dibuat');
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    if (products.length === 0) {

      return emptyResponse();
    }
    return successResponse(products);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
