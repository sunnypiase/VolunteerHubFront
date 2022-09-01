import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import ScrollToTop from 'react-scroll-to-top';
import PoststList from '../Components/PoststList';
import VHBar from '../Components/VHBar';

function RegisterPage() {
  return (
    <div>
      <VHBar />
      <PoststList />
      <ScrollToTop
        smooth
        top={400}
        component={<KeyboardArrowUpRoundedIcon fontSize="large" />}
      />
    </div>
  );
}

export default RegisterPage;
