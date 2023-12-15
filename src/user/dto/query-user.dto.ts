import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto {
  @ApiProperty({ description: '页号', example: '1' })
  pageNum: number;

  @ApiProperty({ description: '单页记录数', example: '10' })
  pageSize: number;

  @ApiProperty({
    description: '名字(查询条件)',
    example: '周星驰',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: '手机(查询条件)',
    example: '17612345678',
    required: false,
  })
  mobile?: string;

  @ApiProperty({
    description: '是否启用(查询条件)',
    example: true,
    required: false,
  })
  isusing?: boolean;

  @ApiProperty({
    description: '创建时间的开始时间(查询条件)',
    example: '2023-01-01',
    required: false,
  })
  beginTime?: string;

  @ApiProperty({
    description: '创建时间的结束时间(查询条件)',
    example: '2023-12-31',
    required: false,
  })
  endTime?: string;

  @ApiProperty({
    description: '创建时间的开始时间结束时间组合(查询条件)',
    example: ['2023-01-01', '2023-12-31'],
    required: false,
  })
  dateRange?: string[]; // 假设这是一个字符串数组，包含开始和结束时间
}
