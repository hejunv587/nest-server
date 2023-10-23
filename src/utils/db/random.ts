import { Project } from '../../projects/entities/project.entity';
import { mock } from 'mockjs';
import { generateCustomID } from '../../utils/customId.service';

// 自定义建筑名称数组
const buildingNames = [
  '捷顺科技中心',
  '腾讯大厦',
  '湾厦中心',
  '壹方城',
  '星光大厦',
  '世纪大厦',
];

// 定义模拟数据规则，生成多条数据
export const getRandomProjects = (): Project[] => {
  const mockdata = mock({
    'list|3-5': [
      {
        'name|1': buildingNames, // 从建筑名称数组中随机选择一个
        manager: '@cname', // 随机生成中文名
        'department|1': ['代理一部', '代理二部'], // 从数组中随机选择一个部门
        'area|1': ['南山区', '福田区', '罗湖区'], // 从数组中随机选择一个区域
      },
    ],
  });
  mockdata.list.forEach((element) => {
    element.id = generateCustomID('a05');
  });
  return mockdata.list;
};
