import { BrowserRouter, Route } from 'react-router-dom';


import { NewRoom } from "./Pages/NewRoom";
import { Home } from "./Pages/Home";

import { AuthContextProvider } from './contexts/AuthContext';


function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Route path="/" exact component={Home}></Route>
      <Route path="/rooms/new" component={NewRoom}></Route>
    </AuthContextProvider>
    </BrowserRouter>
    );
}

export default App;
