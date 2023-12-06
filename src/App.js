import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from './pages/SignupPage';
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import { auth, db } from './firebase';
import PrivateRoutes from './components/common/PrivateRoutes';
import CreateAPodcastPage from './pages/CreateAPodcast';
import PodcastsPage from './pages/Podcasts';
import PodcastDetailsPage from './pages/PodcastDetails';
import CreateAnEpisodePage from './pages/CreateAnEpisode';

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    const UnsubscribeAuth=onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubscribeSnapshot=onSnapshot(
          doc(db, "users", user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData=userDoc.data();
              dispatch(
                setUser({
                  name:userData.name,
                  email:userData.email,
                  uid:user.uid,
                })
              );
            }
          },
          (error)=>{
            console.log("Error fetching user detail" , error);
          }
        );
        return ()=>{
          unsubscribeSnapshot();
        };

      }
    })

    

  }, []);
  

  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage/>}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/profile" element={<Profile/>}/>
            <Route path='/create-a-podcast' element={<CreateAPodcastPage/>}/>
            <Route path='/podcasts' element={<PodcastsPage/>}/>
            <Route path='/podcast/:id' element={<PodcastDetailsPage/>}/>
            <Route path='/podcast/:id/create-episode' element={<CreateAnEpisodePage/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
