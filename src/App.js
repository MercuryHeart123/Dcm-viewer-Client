import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import React,{ Component } from 'react'
import Home from './pages/home';
import DcmViewer from './pages/dcmviewer'
import Sidebar from './sidebar/Sidebar'
import Navbar from './Navbar'
import Doc from './pages/doc'
import About from './pages/about'
import Contact from './pages/contact'
import CSV2 from './pages/csv'

class App extends Component{

    reloadComponent = () => {
      this.child.ForceUpdate() //call function in child component
    }

    render(){
      return(
              <Router>
                <section style={{maxHeight: '100vh'}}>
                <Navbar reloadCallback={this.reloadComponent}/>
                <section style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}>
                
                  <Sidebar ref={instance => { this.child = instance; }}/>

                <Switch>
                  <Route exact path='/' exact component={Home}/>
                  <Route path='/doc' component={Doc}/>
                  <Route path='/about' component={About}/>
                  <Route path='/contact' component={Contact}/>
                  <Route path='/csv/*' exact component={CSV2}/>
                  <Route path='/dcm/*' exact>
                    <DcmViewer />
                  </Route>
                </Switch>
                </section>
                </section>
              </Router>
      )
    }
}


export default App;