import React from 'react';

type Props = {
  initialIndex: string;
  role: string;
};

const ResourceRights = (props: Props) => {
  return (
    <>
      {props.role === props.initialIndex && props.role}
      {props.role !== props.initialIndex && ', ' + props.role}
    </>
  );
};

export default ResourceRights;
