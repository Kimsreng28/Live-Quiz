import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsString,
} from 'class-validator';

export class CreateQuizDto {
  @IsString()
  question: string;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @IsString({ each: true })
  options: string[];

  @IsString()
  @IsIn(['optionA', 'optionB', 'optionC', 'optionD'])
  correctAnswer: string;
}
