import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './PokemonList.scss';

export const PokemonList = (props) => {

  const { ln } = props;
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
      <div className='pokemon-container'>
        <h1>Most wanted pokemons</h1>
        <table className='table'>
          <thead className="table-dark">
            <tr>
              <th scope='col'>#</th>
              <th scope='col'><FormattedMessage id='image' /></th>
              <th scope='col'><FormattedMessage id='name' /></th>
              <th scope='col'><FormattedMessage id='description' /></th>
              <th scope='col'><FormattedMessage id='height' /></th>
              <th scope='col'><FormattedMessage id='weight' /></th>
              <th scope='col'><FormattedMessage id='type' /></th>
            </tr>
          </thead>
          <tbody>
          {data.map((d, i) => (
              <tr>
                <th scope='row'>{i+1}</th>
                <td><img src={d.ThumbnailImage} alt={d.name + " image"}/></td>
                <td>{d.name}</td>
                <td>{d.description}</td>
                <td>{d.height}</td>
                <td>{d.weight}</td>
                <td>{d.type.map((type) => (
                  <tr>
                    <span className="badge bg-secondary">{type}</span>
                  </tr>                    
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
