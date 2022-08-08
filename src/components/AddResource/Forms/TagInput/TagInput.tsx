import React, { useEffect, useState } from 'react';

import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import { Button, ButtonGroup, Grid, Stack } from '@mui/material';
import { TagData } from '@/modules/tag/types';
import TagChip from '@/components/AddResource/Forms/TagInput/TagChip/TagChip';
import { InputValidation } from '@/modules/inputValidation/types';

type Props = {
  inputClassName?: string; // Optional ClassNames for Input
  inputValidation?: InputValidation;
  tags: TagData[];
  updateTags: (data: TagData[]) => void;
  required?: boolean;
};

const TagInput = (props: Props) => {
  const [tagInputValue, setTagInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);

  useEffect(() => {
    props.updateTags(selectedTags);
  }, [selectedTags]);

  // Helper Functions
  const isTagAlreadySelected = (tag: TagData) => selectedTags.filter(t => t.id === tag.id).length !== 0;
  const isTagNameMatch = (tag: TagData, input: string) => tag.name.toUpperCase().indexOf(input.toUpperCase()) > -1;

  const tagDelete = (tagToDelete: number) => () => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToDelete));
  };

  const TagChangeHandler = (input: string): void => {
    setTagInputValue(input);
    setFilteredTags(props.tags.filter(tag => isTagNameMatch(tag, input) && !isTagAlreadySelected(tag)));
    if (input.trim() === '') setFilteredTags([]);
  };

  const TagFocusHandler = (input: string) => {
    setFilteredTags(props.tags.filter(tag => isTagNameMatch(tag, input) && !isTagAlreadySelected(tag)));
    setShowTags(true);
  };

  const TagBlurHandler = () => {
    setShowTags(false);
  };
  return (
    <div className={props.inputClassName}>
      <Stack
        className='w-full'
        sx={{
          '& .MuiButtonGroup-root': {
            zIndex: 1,
          },
        }}
      >
        <Grid container className='w-full'>
          <Grid item className='w-1/2 relative'>
            <Stack>
              <InputWithoutBorder
                inputHandleOnChange={input => TagChangeHandler(input.target.value)}
                inputHandleOnFocus={input => TagFocusHandler(input.target.value)}
                inputHandleOnBlur={event => event && TagBlurHandler()}
                inputValue={tagInputValue}
                labelText='Choose Tags'
                labelClassName='text-textGray text-xl font-inter'
                inputPlaceholder='Type to add tag'
                inputType='text'
                inputClassName='bg-bgGray rounded-xl w-full focus-within:bg-bgWhite'
                inputValidation={props.inputValidation}
                required={props.required}
              />
              {showTags && (
                <ButtonGroup
                  orientation='vertical'
                  className='w-full shadow-lg rounded max-h-28 overflow-auto background-bgWhite absolute mt-24'
                  variant='contained'
                  disableElevation
                >
                  {filteredTags.map(tag => (
                    <Button
                      key={tag.id}
                      className='min-h-11 w-full border-bgWhite bg-bgWhite text-bgBlack hover:bg-dulwichRedHover'
                      onMouseDown={() => {
                        if (selectedTags.filter(tags => tags.id === tag.id).length === 0) {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          setSelectedTags([...selectedTags!, props.tags.find(tags => tags.id === tag.id)!]);
                        }
                        setTagInputValue('');
                        setFilteredTags([]);
                      }}
                    >
                      {tag.name}
                    </Button>
                  ))}
                </ButtonGroup>
              )}
            </Stack>
          </Grid>
          <Grid container item className={'pt-12 pl-1 w-1/2 max-h-40 overflow-auto'} spacing={1}>
            {selectedTags.map(tag => (
              <TagChip key={tag.id} tagData={tag} onDelete={tagDelete(tag.id)} />
            ))}
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default TagInput;
