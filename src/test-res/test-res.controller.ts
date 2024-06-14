import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestResService } from './test-res.service';
import { CreateTestReDto } from './dto/create-test-re.dto';
import { UpdateTestReDto } from './dto/update-test-re.dto';

@Controller('test-res')
export class TestResController {
  constructor(private readonly testResService: TestResService) {}

  @Post()
  create(@Body() createTestReDto: CreateTestReDto) {
    return this.testResService.create(createTestReDto);
  }

  @Get()
  findAll() {
    return this.testResService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testResService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestReDto: UpdateTestReDto) {
    return this.testResService.update(+id, updateTestReDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testResService.remove(+id);
  }
}
