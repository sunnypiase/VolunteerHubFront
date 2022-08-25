import { Button, Container, Grid, Stack } from '@mui/material';
import { useTags } from '../Hooks/tags';
import ErrorMessage from './ErrorMessage';
import SiteLoader from './SiteLoader';
import SiteTag from './SiteTag';

function TagsList() {
  const { tags, error, loading } = useTags();

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <SiteLoader />}

      <Container sx={{ py: 5 }} maxWidth="sm">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {tags.map((tag) => (
            <Grid item key={tag.id} xs={12} sm={6} md={4}>
              <SiteTag tag={tag} key={tag.id} />
            </Grid>
          ))}
        </Grid>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained">Find by tag</Button>
          <Button variant="outlined">Secondary action</Button>
        </Stack>
      </Container>
    </>
  );
}

export default TagsList;
