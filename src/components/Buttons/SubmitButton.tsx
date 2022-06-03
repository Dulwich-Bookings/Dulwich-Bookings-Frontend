import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

const SubmitButton: React.FC<{ content: string }> = props => {
  return (
    <div>
      <Button
        variant='contained'
        className='bg-redbg text-XXL normal-case font-inter w-24 h-9 pl-53 pt-18 text-center flex-row shadow-[0_4px_4px-10px_rgba(0,0,0,0.25)]'
      >
        {props.content}
      </Button>
    </div>
  );
};

export default SubmitButton;
