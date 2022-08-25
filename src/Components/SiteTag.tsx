import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { ITag } from '../models';

interface TagProps {
  tag: ITag;
}

function SiteTag({ tag }: TagProps) {
  return (
    <div>
      <Card
        sx={{
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '56.25%',
          }}
          //image="https://source.unsplash.com/random"
          alt="random"
        /> */}
        <CardContent sx={{ flexGrow: 1, justifyItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="h4" align="center">
            {tag.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default SiteTag;
