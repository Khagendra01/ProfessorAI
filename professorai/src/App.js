import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const Home = () => <div>Home Page</div>;
const OtherPage = () => <div>Other Page</div>;

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/other" exact component={OtherPage} />
      <Redirect from="*" to="/" />
    </Router>
  );
}

export default App;
