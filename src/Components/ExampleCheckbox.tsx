import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
} from '@mui/material';
import { useEffect } from 'react';

const cards = [1, 2, 3, 4, 5, 6];

export default function ExampleCheckbox() {
  const [currentTagId, setCurrentTagId] = React.useState(1);

  const [selectedTagsId, setSelectedTagsId] = React.useState<number[]>([]);

  const [isChecked, setIsChecked] = React.useState(false);
  //for constatn check
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

  const buttonClick = () => {
    console.log('selected tags:');
    console.log(selectedTagsId);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Select Tag</FormLabel>
          <FormGroup>
            {cards.map((card) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name={card.toString()}
                    id={card.toString()}
                  />
                }
                label={card.toString()}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Box>
      <Button onClick={buttonClick}>Click me</Button>
      {/* тута є для прикладу мапінг 
      
      пав
      пав*/}
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <pre>{JSON.stringify(setSelectedTagsId, null, 2)}</pre>
      </Container>
    </>
  );
}
