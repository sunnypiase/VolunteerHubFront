import { Button, Container, Grid, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from 'react';
import { useTags } from '../Hooks/tags';
import ErrorMessage from './ErrorMessage';
import SiteLoader from './SiteLoader';

function TagsList() {
  const { tags, error, loading } = useTags();
  const [tagsList, setTagsList] = useState<string[]>([]);

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = tagsList.indexOf(event.target.value);
    //add skill if dont exist
    if (index === -1) {
      setTagsList((prev) => [...prev, event.target.value]);
      //else remove skill
    } else {
      setTagsList(tagsList.filter((tag) => tag !== event.target.value));
    }
  };

  const handleCleanTags = () => {
    setTagsList([]);
  };

  const handleSelectTags = () => {
    console.log({ tagsList });
  };

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
                        onChange={handleTagsChange}
                        checked={tagsList.includes(tag.name)}
                      />
                    }
                    label={tag.name}
                    value={tag.name}
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
          <Button onClick={handleSelectTags} variant="contained">
            Find by tag
          </Button>
          <Button onClick={handleCleanTags} variant="outlined">
            Clean tags
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default TagsList;
