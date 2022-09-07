import { Button, Container, Grid, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useTags } from '../Hooks/tags';
import { IPost } from '../models';
import CustomErrorMessage from './CustomErrorMessage';
import SiteLoader from './SiteLoader';

interface TagsProps {
  setPosts: (posts: IPost[]) => void;
  getPosts: () => void;
  setLoadingPostsCount: (count: number) => void;
}

function TagsList({ setPosts, getPosts, setLoadingPostsCount }: TagsProps) {
  const { tags, error, loading, tagsList, handleTagsChange, handleCleanTags } =
    useTags();

  const handleSelectTags = async () => {
    const response = await axios.get<IPost[]>(
      `${process.env.REACT_APP_API_URL!.trim()}`+'/api/Post/by-tags?ids=' + tagsList,
      {
        withCredentials: true,
      }
    );
    setLoadingPostsCount(3);
    setPosts(response.data);
  };

  const buttonCleanTags = () => {
    handleCleanTags();
    setLoadingPostsCount(3);
    getPosts();
  };

  return (
    <>
      {error && <CustomErrorMessage error={error} />}
      {loading && <SiteLoader />}

      <Container
        sx={{
          backgroundColor: '#F3BD95',
          margin: '0px',
          padding: '2%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          '@media': {
            maxWidth: 'none',
          },
        }}
      >
        {/* End hero unit */}

        <FormControl component="fieldset" variant="standard">
          <Typography
            sx={{
              fontSize: '36px',
              fontWeight: '400',
              textAlign: 'center',
              paddingBottom: '32px',
            }}
          >
            Categories
          </Typography>
          <FormGroup>
            <Grid
              container
              spacing={12}
              direction="row"
              justifyContent="left"
              alignItems="space-evenly"
              sx={{
                width: '100%',
                margin: '0px',
              }}
            >
              {tags.map((tag) => (
                <Grid
                  item
                  key={tag.tagId}
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    padding: '20px 40px!important',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleTagsChange}
                        checked={tagsList.includes(tag.tagId)}
                        sx={{
                          color: 'black',
                          '& .MuiSvgIcon-root': {
                            fontSize: 30,
                          },
                          '&.Mui-checked': {
                            color: '#116660',
                          },
                        }}
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
          <Button
            onClick={buttonCleanTags}
            variant="contained"
            sx={{
              backgroundColor: '#B37E6B',
              borderRadius: '15px',
              '&:hover': {
                backgroundColor: '#9c5e48',
              },
            }}
          >
            Clear
          </Button>
          <Button
            onClick={handleSelectTags}
            variant="contained"
            sx={{
              backgroundColor: '#B37E6B',
              borderRadius: '15px',
              '&:hover': {
                backgroundColor: '#9c5e48',
              },
            }}
          >
            Find
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default TagsList;
