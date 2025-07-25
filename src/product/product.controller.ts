import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/enum/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.Admin, UserRole.Admin_Stock)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Req() req: Request,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp('^(image\\/jpeg|image\\/png|image\\/jpg)$'),
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10, // 10MB
        })
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        }),
    )
    file?: Express.Multer.File,
  ) {
    const jwt_token = req.headers.authorization;
    console.log(file);
    return this.productService.create(createProductDto, jwt_token, file);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(id);
  }
}
