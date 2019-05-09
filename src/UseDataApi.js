import React, { useState, useReducer, useEffect } from 'react' 
import axios from 'axios' 
import { dataFetchReducer } from './dataFetchReducer'

function UseDataApi (initialUrl, initialData) {
    const [url, setUrl] = useState(initialUrl) 
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData
    })

    useEffect(() => {
        let didCancel = false 

        async function fetchData() {
            dispatch({ type: 'FETCH_INIT' })

            try {
                const result = await axios(url)

                if(!didCancel){
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
                }
            } catch(error) {
                if(!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' })
                }
            }
        }

        fetchData() 

        return () => {
            didCancel = true 
        }
    }, [url])

    const doFetch = url => setUrl(url)

    return { ...state, doFetch }
}

export default UseDataApi