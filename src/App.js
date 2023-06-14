import Get from './components/get/Get';
import Add from './components/add/Add';
import Search from './components/search/Search';
import Feedback from './components/feedback/Feedback';
import Loader from './components/loader/Loader';

function App() {

  return (
    <div className="container-sm">
      <h1>Todo Manager</h1>
      <Loader />
      <Feedback />
      <Add />
      <Search />      
      <Get />
    </div>
  );
}

export default App;