import Container from "./components/ui/Container";
import Heading from "./components/ui/Heading";
import { CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Container>
      <div className='flex justify-center items-center gap-8'>
        <Heading title='LOADING...' />
        <CircularProgress />
      </div>
    </Container>
  );
};

export default Loading;
