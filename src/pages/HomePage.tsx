import PoststList from '../Components/PoststList';
import TagsList from '../Components/TagsList';
import VHBar from '../Components/VHBar';
import ScrollToTop from "react-scroll-to-top";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

function RegisterPage() {
  return (
    <div>
      <VHBar />
      <PoststList />
      <ScrollToTop smooth top={400} component={<KeyboardArrowUpRoundedIcon fontSize="large" />} />
    </div>
  );
}

export default RegisterPage;
