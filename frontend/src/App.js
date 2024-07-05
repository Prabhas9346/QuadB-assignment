import axios from 'axios';
import './App.css';
import { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContentEl from './components/ContentEl';

class App extends Component {
  state = { componentdata: [], theme: false, reload: false };

  checktheme = (checkedel) => {
    this.setState({ theme: checkedel });
  };

  reloadApp = () => {
    this.setState({ reload: !this.state.reload });
  };

  componentDidMount = async () => {
    const response = await axios.get('http://localhost:8000/');
    const data = response.data;
    this.setState({ componentdata: Object.values(data) });
  };

  render() {
    const { componentdata, theme } = this.state;
    const classofBrowserComp = !theme ? 'Browserrouter1' : 'Browserrouter1 lightTheme';

    return (
      <BrowserRouter>
        <div className={classofBrowserComp}>
          <Header componentdata={componentdata} checktheme={this.checktheme} reloadApp={this.reloadApp} />
          <div className="content">
            <Routes>
              {componentdata.map((ele, index) => {
                const { name } = ele;
                const location = '/' + name.replace('/', '-');
                return (
                  <>
                    {index === 0 && <Route path="/" element={<ContentEl ele={ele} />} />}
                    <Route path={location} element={<ContentEl ele={ele} />} />
                  </>
                );
              })}
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
