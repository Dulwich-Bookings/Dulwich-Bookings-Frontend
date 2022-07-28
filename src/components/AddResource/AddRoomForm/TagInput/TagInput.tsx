import React, { useEffect, useState } from 'react';

import InputWithoutBorder from '@/components/Inputs/InputWithoutBorder/InputWithoutBorder';
import { Button, ButtonGroup, Grid, Stack } from '@mui/material';
import { TagData } from '@/modules/tag/types';
import TagChip from '@/components/AddResource/AddRoomForm/TagInput/TagChip/TagChip';

type Props = {
  inputClassName?: string; // Optional ClassNames for Input
  tags: TagData[];
  updateTags: (data: TagData[]) => void;
};

const TagInput = (props: Props) => {
  const [tagInputValue, setTagInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);

  useEffect(() => {
    props.updateTags(selectedTags);
  }, [selectedTags]);

  const tagDelete = (tagToDelete: number) => () => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagToDelete));
  };

  const TagChangeHandler = (input: string): void => {
    setTagInputValue(input);
    setFilteredTags(props.tags.filter(tag => tag.name.match(new RegExp(input, 'i'))));
    if (input.trim() === '') {
      setFilteredTags([]);
    }
  };

  const TagFocusHandler = (input: string) => {
    setFilteredTags(props.tags.filter(tag => tag.name.match(new RegExp(input, 'i'))));
    setShowTags(true);
  };

  const TagBlurHandler = () => {
    setShowTags(false);
  };
  return (
    <>
      <Stack className={props.inputClassName}>
        <InputWithoutBorder
          inputHandleOnChange={input => TagChangeHandler(input.target.value)}
          inputHandleOnFocus={input => TagFocusHandler(input.target.value)}
          inputHandleOnBlur={event => event && TagBlurHandler()}
          inputValue={tagInputValue}
          labelText='Choose Tags'
          labelClassName='text-[#404040] text-xl font-inter'
          inputPlaceholder='Type to add tag'
          inputType='text'
          inputClassName='bg-bgGray rounded-xl w-full focus-within:bg-bgWhite'
        />
        {showTags && (
          <ButtonGroup
            orientation='vertical'
            className='w-full shadow-lg rounded max-h-36 overflow-auto'
            variant='contained'
            disableElevation
          >
            {filteredTags.map(tag => (
              <Button
                key={tag.id}
                className='min-h-11 w-full border-bgWhite bg-bgWhite text-bgBlack hover:bg-dulwichRed hover:bg-opacity-10'
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
      <Grid container className={'pl-2 pt-12 w-3/12 max-h-40 overflow-auto pr-6'} spacing={1}>
        {selectedTags.map(tag => (
          <TagChip key={tag.id} tagData={tag} onDelete={tagDelete(tag.id)} />
        ))}
      </Grid>
    </>
  );
};

export default TagInput;
