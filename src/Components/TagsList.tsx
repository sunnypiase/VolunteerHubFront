import { Button, Container, Grid, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePosts } from '../Hooks/posts';
import { useTags } from '../Hooks/tags';
import { IPost } from '../models';
import ErrorMessage from './ErrorMessage';
import SiteLoader from './SiteLoader';

function TagsList() {
  const { tags, error, loading, tagsList, handleTagsChange, handleCleanTags } =
    useTags();

  const { setPosts } = usePosts();

  const handleSelectTags = async () => {
    const response = await axios.get<IPost[]>(
      'https://localhost:7266/api/Post/by-tags' + '?ids=' + tagsList,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    setPosts(response.data);
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
                        checked={tagsList.includes(tag.tagId.toString())}
                      />
                    }
                    label={tag.name}
                    value={tag.tagId}
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
