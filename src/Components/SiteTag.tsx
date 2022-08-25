import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { ITag } from '../models';

interface TagProps {
  tag: ITag;
}

function SiteTag({ tag }: TagProps) {
  return (
    <div>
      <Typography
        gutterBottom
        variant="subtitle1"
        component="h6"
        align="center"
      >
        {tag.name}
      </Typography>
    </div>
  );
}

export default SiteTag;
