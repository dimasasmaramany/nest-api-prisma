import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { generateSlug } from 'src/common/helpers/slug.helper';
import { successResponse } from 'src/common/helpers/response.helper';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    let slug = generateSlug(createCategoryDto.name);

    let isExist = await this.prisma.category.findUnique({
      where: { slug },
    });

    while (isExist) {
      slug = generateSlug(createCategoryDto.name);
      isExist = await this.prisma.category.findUnique({
        where: { slug },
      });
    }

    const category = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
        slug,
      },
    });

    return successResponse(category, 'Category berhasil dibuat');
  }

  async findAll() {
    const category = await this.prisma.category.findMany();
    return successResponse(category);
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return successResponse(category);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
