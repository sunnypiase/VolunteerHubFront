import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

function Modal({ children, title, onClose }: ModalProps) {
  return (
    <>
      <div
        className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
        onClick={onClose}
      ></div>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flexGrow: 1, justifyItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {'post.title'}
          </Typography>
        </CardContent>
      </Card>
      <div className="w-[38.5em] p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2">
        <h1 className="text-2xl text-center mb-2">{title}</h1>
        {children}
      </div>
    </>
  );
}

export default Modal;
