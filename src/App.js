import React, { useState } from 'react'
import UseDataApi from './UseDataApi'
import './App.css'

function App() {
  const [query, setQuery] = useState('redux') 
  const { data, isLoading, isError, doFetch } = UseDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  )

  return (
    <div className="App">
      <form onSubmit={(e) => {
        doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
        e.preventDefault() 
      }}>
        <input 
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type='button'>
          Search
        </button>
      </form>
      { isError && <div>Something went wrong...</div> }
      { isLoading 
        ? ( <div>Loading...</div> ) 
        : (
            <ul>
              {data.hits.map(item => (
                <li key={item.objectID}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))}
            </ul>
          )
      }
    </div>
  );
}

export default App;
