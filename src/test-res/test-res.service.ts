import { Injectable } from '@nestjs/common';
import { CreateTestReDto } from './dto/create-test-re.dto';
import { UpdateTestReDto } from './dto/update-test-re.dto';

@Injectable()
export class TestResService {
  create(createTestReDto: CreateTestReDto) {
    return 'This action adds a new testRe';
  }

  findAll() {
    return `This action returns all testRes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testRe`;
  }

  update(id: number, updateTestReDto: UpdateTestReDto) {
    return `This action updates a #${id} testRe`;
  }

  remove(id: number) {
    return `This action removes a #${id} testRe`;
  }
}
