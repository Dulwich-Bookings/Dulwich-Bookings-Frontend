import React from 'react';
import { locationImages } from '@/consts/constants';

type Props = {
  schoolId: number;
};

const HomeBanner = ({ schoolId }: Props) => {
  return <img className='object-cover w-screen h-72' src={locationImages.find(location => location.id === schoolId)?.img} />;
};

export default HomeBanner;
