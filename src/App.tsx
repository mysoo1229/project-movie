import Header from "./Components/Header";
import styled from "styled-components";
import Movies from "./Routes/Movies";

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Contents = styled.div`
  padding: 0 24px;
`;

function App() {
  return (
    <Container>
      <Header />
      <Contents>
        <Movies />
      </Contents>
    </Container>
  );
}

export default App;
