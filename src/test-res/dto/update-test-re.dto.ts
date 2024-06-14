import { PartialType } from '@nestjs/mapped-types';
import { CreateTestReDto } from './create-test-re.dto';

export class UpdateTestReDto extends PartialType(CreateTestReDto) {}
