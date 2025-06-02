
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from './utils/theme';
import './assets/css/reset.css';
import './assets/css/common.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Aside from './components/Aside';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import SearchUser from './routes/SearchUser';
import BattleTags from './routes/BattleTags';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: sans-serif;
    font-family: "Do Hyeon", sans-serif;
  }
  .main-wrapper{
    padding: 80px 50px 150px 250px!important;
    min-height: 100vh;
    /* background-image: radial-gradient(circle at center center, transparent,rgb(255,255,255)),linear-gradient(309deg, rgba(90, 90, 90,0.05) 0%, rgba(90, 90, 90,0.05) 50%,rgba(206, 206, 206,0.05) 50%, rgba(206, 206, 206,0.05) 100%),linear-gradient(39deg, rgba(13, 13, 13,0.05) 0%, rgba(13, 13, 13,0.05) 50%,rgba(189, 189, 189,0.05) 50%, rgba(189, 189, 189,0.05) 100%),linear-gradient(144deg, rgba(249, 249, 249,0.05) 0%, rgba(249, 249, 249,0.05) 50%,rgba(111, 111, 111,0.05) 50%, rgba(111, 111, 111,0.05) 100%),linear-gradient(166deg, rgba(231, 231, 231,0.05) 0%, rgba(231, 231, 231,0.05) 50%,rgba(220, 220, 220,0.05) 50%, rgba(220, 220, 220,0.05) 100%),linear-gradient(212deg, rgba(80, 80, 80,0.05) 0%, rgba(80, 80, 80,0.05) 50%,rgba(243, 243, 243,0.05) 50%, rgba(243, 243, 243,0.05) 100%),radial-gradient(circle at center center, hsl(107,19%,100%),hsl(107,19%,100%)); */
    /* background-image: repeating-linear-gradient(90deg, hsla(196,0%,79%,0.06) 0px, hsla(196,0%,79%,0.06) 1px,transparent 1px, transparent 96px),repeating-linear-gradient(0deg, hsla(196,0%,79%,0.06) 0px, hsla(196,0%,79%,0.06) 1px,transparent 1px, transparent 96px),repeating-linear-gradient(0deg, hsla(196,0%,79%,0.09) 0px, hsla(196,0%,79%,0.09) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(90deg, hsla(196,0%,79%,0.09) 0px, hsla(196,0%,79%,0.09) 1px,transparent 1px, transparent 12px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255)); */
    background-image: repeating-linear-gradient(45deg, rgba(194, 194, 194,0.1) 0px, rgba(194, 194, 194,0.1) 2px,transparent 2px, transparent 4px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255),rgb(255,255,255));
  }
  .content-wrapper{
    max-width: 1200px;
    margin: 0 auto;
  }
  input{
    /* border: 1px solid  ${props=> props.theme.colors.deep_gray}; */
    padding: 10px;
    border-radius: 5px;
    color : ${props=> props.theme.colors.txt};
    font-family: "Noto Sans KR", sans-serif;
  }
`;

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div className='pr'>
        <Header />
        <Aside />
        <div className='main-wrapper'>
          <div className='content-wrapper'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/sign-up" element={<Signup />}></Route>
            <Route path="/search" element={<SearchUser />}></Route>
            <Route path="/battletag" element={<BattleTags />}></Route>
          </Routes>
          </div>

        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
