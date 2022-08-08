import React from 'react';

export const textAreaToHTML = (textArea: string): JSX.Element[] => {
  const items = textArea.split('\n');

  return items.map((item, key) => (
    <span key={key}>
      {item}
      <br />
    </span>
  ));
};
