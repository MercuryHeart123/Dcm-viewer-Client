import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import DcmViewer from './pages/dcmviewer'
import Sidebar from './sidebar/Sidebar'
import Navbar from './Navbar'
import Doc from './pages/doc'
import About from './pages/about'
import Contact from './pages/contact'
import { Scrollbars } from 'react-custom-scrollbars' 
function App() {
  return (
    <Router>
      <Navbar />
      <section style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
      
        <Sidebar />

      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/doc' component={Doc}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/dcm/:folder/:id' exact>
          <DcmViewer/>
        </Route>
      </Switch>
      </section>
    </Router>
  );
}

export default App;

{/* <div class="background">
                <div class="container-countdown-desktop">
    
      <div id="desktop-countdown">
        <ul>
          <li><span id="desktop-days"></span>days</li>
          <li><span id="desktop-hours"></span>Hours</li>
          <li><span id="desktop-minutes"></span>Minutes</li>
          <li><span id="desktop-seconds"></span>Seconds</li>
        </ul>
      </div>
      <script>
      const xsecond = 1000,
            xminute = xsecond * 60,
            xhour = xminute * 60,
            xday = xhour * 24;
    
      let xbirthday = "Sep 30, 2021 00:00:00",
          xcountDown = new Date(xbirthday).getTime(),
          k = setInterval(function() {    
    
            let xnow = new Date().getTime(),
                xdistance = xcountDown - xnow;
    
            document.getElementById("desktop-days").innerText = Math.floor(xdistance / (xday)),
              document.getElementById("desktop-hours").innerText = Math.floor((xdistance % (xday)) / (xhour)),
              document.getElementById("desktop-minutes").innerText = Math.floor((xdistance % (xhour)) / (xminute)),
              document.getElementById("desktop-seconds").innerText = Math.floor((xdistance % (xminute)) / xsecond);
    

          }, 0)
    </script>
      
    </div>
                
            </div> */}