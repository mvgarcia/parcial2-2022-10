import { LOCALES } from './i18n/locales';
import React, { useContext, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import messages from './i18n/messages';
import { NavBar } from './shared/components/NavBar';
import { PokemonList } from './pages/pokemon-list/PokemonList';
import './App.scss';
import { ThemeContext } from './hooks/ThemeProvider';
import BarChart from './components/BarChart';

function App() {
  const ln = navigator.language;
  const [language, setLanguage] = useState(LOCALES.SPANISH);

  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

  useEffect(() => {
    if(ln==='en'){
      setLanguage(LOCALES.ENGLISH)
    }
    if(ln==='es'){
      setLanguage(LOCALES.SPANISH)
    }
    if (darkMode){
      setLanguage(LOCALES.ENGLISH)
    }    
    else{
      setLanguage(LOCALES.SPANISH)
    }
  });

  const API_ESP = 'https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/f8357c439bbb7b4bd3dc6e8807c52105fb137ec6/pokemon-es.json ';
  const API_EN = 'https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json';
  const [data, setData] = useState([]);

  useEffect(() => {
    if(ln === 'en-us') {
      fetch(API_EN)
      .then(response => response.json())
      .then(data => setData(data));
    }
    else{
      fetch(API_ESP)
      .then(response => response.json())
      .then(data => setData(data));
    }
});

  
  return (
    <>
      <IntlProvider locale={language} messages={messages[language]}>
        <Router>
          <NavBar></NavBar>
          <Routes>
            <Route exact path='/' element={<PokemonList ln={language}></PokemonList>} />
            <Route exact path='/report' element={<BarChart width={600} height={400} data={data}></BarChart>} />
            <Route
              path='*'
              element={
                <main style={{ padding: '1rem' }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Router>
      </IntlProvider>
    </>
  );
}

export default App;
