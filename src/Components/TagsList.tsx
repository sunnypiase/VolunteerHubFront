import { Button, Container, Grid, Stack } from '@mui/material';
import { useTags } from '../Hooks/tags';
import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import SiteLoader from './SiteLoader';
import SiteTag from './SiteTag';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

function TagsList() {
  const [currentTagId, setCurrentTagId] = useState(1);

  const [selectedTagsId, setSelectedTagsId] = useState<number[]>([]);

  const [isChecked, setIsChecked] = useState(false);

  const { tags, error, loading } = useTags();

  useEffect(() => {
    updateTagsList();
  }, [isChecked, currentTagId]);

  const updateTagsList = () => {
    //if ckecked add to array
    if (isChecked) {
      //if dont exist in array then add
      if (!(selectedTagsId.indexOf(currentTagId) > -1)) {
        setSelectedTagsId((prev) => [...prev, currentTagId]);
      }
    }
    //else check to remove
    else {
      //if exist tnen remove
      if (selectedTagsId.indexOf(currentTagId) > -1) {
        var copy = [...selectedTagsId];
        var index = copy.indexOf(currentTagId);
        copy.splice(index, 1);
        setSelectedTagsId(copy);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.checked);
    // + for converting string to number
    setCurrentTagId(+event.currentTarget.id);
  };

  //send request by folowing tags
  const buttonClick = () => {
    console.log('selected tags:');
    console.log(selectedTagsId);
  };

  //it was
  useEffect(() => {
    tags.map((tag) => console.log(tag.tagId));
  }, []);

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <SiteLoader />}

      <Container sx={{ py: 4 }} maxWidth="sm">
        {/* End hero unit */}

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Select Tag</FormLabel>
          <FormGroup>
            <Grid container spacing={1}>
              {tags.map((tag) => (
                <Grid item key={tag.tagId} xs={12} sm={6} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name={tag.name}
                        id={tag.tagId?.toString()}
                      />
                    }
                    label={tag.name}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </FormControl>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button onClick={buttonClick} variant="contained">
            Find by tag
          </Button>
          <Button variant="outlined">Secondary action</Button>
        </Stack>
      </Container>
    </>
  );
}

export default TagsList;
