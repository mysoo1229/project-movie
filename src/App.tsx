import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./Components/Header";
import styled from "styled-components";
import Movies from "./Routes/Movies";
import Tv from './Routes/TV';
import Search from './Routes/Search';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 0 60px;

  @media screen and (max-width: 1024px) {
    max-width: 800px;
  }
`;

const Contents = styled.div`
  @media screen and (max-width: 1420px) {
    padding: 0 30px;
  }
`;

function App() {
  return (
    <Container>
      <Router>
        <Header />
        <Contents>
          <Switch>
            <Route path="/tv">
              <Tv />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Movies />
            </Route>
          </Switch>
        </Contents>
      </Router>
    </Container>
  );
}

export default App;
