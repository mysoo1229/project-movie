import Header from "./Components/Header";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

function App() {
  return (
    <Container>
      <Header />
    </Container>
  );
}

export default App;
