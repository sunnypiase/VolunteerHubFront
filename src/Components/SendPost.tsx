import { Button, Grid, InputLabel, MenuItem, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import { Form, Formik } from 'formik';
import { useSendPost } from '../Hooks/sendPost';
import CustomErrorMessage from './CustomErrorMessage';
import PostSimpleView from './PostSimpleView';

function SendPost() {
  const {
    receiverPost,
    error,
    selectedPostId,
    currentUserPosts,
    selectedPost,
    handleChangeTitle,
    handleSendPost,
    navigateToCreatePost,
  } = useSendPost();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PostSimpleView
            post={receiverPost}
            isDetailsVisible={false}
            setCurrentPost={(receiverPost) => {}}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="post-title-label">
            Select your post or create new one
          </InputLabel>
          <Select
            labelId="post-title-label"
            id="post-title"
            value={selectedPostId}
            onChange={handleChangeTitle}
          >
            {currentUserPosts.map((post) => (
              <MenuItem key={post.postId} value={post.postId}>
                {post.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={6}>
          {selectedPostId && selectedPost && (
            <PostSimpleView
              post={selectedPost}
              isDetailsVisible={false}
              setCurrentPost={(selectedPost) => {}}
            />
          )}
        </Grid>

        {selectedPost && (
          <Formik
            initialValues={{
              title: '',
              description: '',
            }}
            onSubmit={(values) => {
              handleSendPost(values);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Grid
                    item
                    sx={{
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <TextField
                      name="title"
                      required
                      id="title"
                      label="Message title"
                      autoFocus
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-field"
                      sx={{ width: '45%' }}
                    />
                    <TextField
                      required
                      multiline
                      rows={4}
                      id="description"
                      label="Message description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="input-field"
                      sx={{ width: '45%' }}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: 'rgba(17, 102, 96, 0.7)',
                        color: '#FFFCFC',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '15px',
                        width: '40%',
                        margin: '15px 0px 10px 0px',
                        borderRadius: '15px',
                        '&:hover': {
                          backgroundColor: '#044945',
                        },
                      }}
                    >
                      Send your post
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
        <Button
          variant="contained"
          sx={{
            borderRadius: 28,
            position: 'fixed',
            bottom: '2%',
            right: '2%',
            zIndex: 2000,
          }}
          onClick={navigateToCreatePost}
        >
          Create new post
        </Button>
        {error && <CustomErrorMessage error={error} />}
      </Grid>
    </>
  );
}

export default SendPost;
