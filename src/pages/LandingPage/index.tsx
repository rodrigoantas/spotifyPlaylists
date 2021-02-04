import React, { useCallback, useEffect, useState} from 'react';
import axios from 'axios'

import filtersApi from './../../services/filters-api';

import Dropdown from '../../components/Dropdown'
import TimePicker from '../../components/TimePicker'
import NumberInput from '../../components/NumberInput'
import SearchInput from '../../components/SearchInput'
import Card from '../../components/Card'


import { Header, Content } from './styles';


 interface IPlaylists {
   id: string;
   name: string;
   description: string;
   images: Array<{url: string;}>;
   tracks: {
     total: number;
   }
   external_urls: {
     spotify: string;
   }
 }


 interface ILists {
   id: string;
   name: string;
   values: Array<IValues>
 }

 interface IValues {
   value: string;
   name: string;
 }
  interface IDropdownCountry {
   selectedCountry: string;
   listOfCountries:ILists;
 }

 interface IDropdownLocales {
  selectedLocale: string;
  listOfLocales: ILists;
}

interface ITimetampPicker {
  selectedValue: string;
  id: string;
  name: string;
}

interface ILimit {
  selectedValue: string;
  id: string;
  name: string;
}
interface IOffset {
  selectedValue: string;
  id: string;
  name: string;
}


const client_id = ''; // Your client id
const client_secret = ''; // Your secret


const LandingPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<IPlaylists[]>();
  const [token, setToken] = useState(''); 
  const [search, setSearch] = useState(''); 
  const [locale, setLocale] = useState({} as IDropdownLocales); 
  const [country, setCountry] = useState({} as IDropdownCountry); 
  const [timestamp, setTimestamp] = useState({} as ITimetampPicker); 
  const [limit, setLimit] = useState({} as ILimit); 
  const [offset, setOffset] = useState({} as IOffset);
  // state to change every 30 seconds
  const [change, setChange] = useState(false)


  // useEffect to load the token. it requires a client_id and client_secret.
  useEffect(() => { 
    
     async function loadToken() {

      await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(`${client_id}:${client_secret}`)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token) 

    });}

    loadToken();

  }, []);

  // function and useeffect to trigger every 30 seconds
  const myInterval = () => {
    setChange(true)
    console.log('30 seconds')
  }
  useEffect(() => {
    const timer = setInterval(() => myInterval() , 30000)

    return () => clearInterval(timer)
  },[])

  
  

  useEffect(() => {
       async function loadPlaylists() {

        // getting the spotify api with the authorization header and params.
        await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            'Authorization' : `Bearer ${token}`
          },
              params : { 
                country: country.selectedCountry ? country.selectedCountry : undefined,
                locale: locale.selectedLocale ? locale.selectedLocale : undefined,
                timestamp: timestamp && timestamp.selectedValue ? `${timestamp.selectedValue}:00` : undefined,
                limit: limit ? limit.selectedValue : undefined,
                offset: offset ? Number(offset.selectedValue) : undefined,
              }
            })
            .then(playlistsResponse => {
              
              setPlaylists(playlistsResponse.data.playlists.items)
              setChange(false)
            
            });
      }

        loadPlaylists();
   
 

  }, [token, country, locale, offset, timestamp, limit, change]);


 
  // useEffect to load the filters and set the filters in their state.
  useEffect(() => {
    async function loadFilters() {
      await filtersApi.get('/').then(filtersResponse => {
      setCountry({
        selectedCountry: '',
        listOfCountries: filtersResponse.data.filters[1],
      })
      setLocale({
        selectedLocale: '',
        listOfLocales: filtersResponse.data.filters[0],
      })
       setTimestamp({
         selectedValue: new Date().toISOString(),
         name: filtersResponse.data.filters[2].name,
         id: filtersResponse.data.filters[2].id
       })
       setLimit({
         selectedValue: '20',
         id: filtersResponse.data.filters[3].id,
         name: filtersResponse.data.filters[3].name,
       })
       setOffset({
        selectedValue: '0',
        id: filtersResponse.data.filters[4].id,
        name: filtersResponse.data.filters[4].name,
      })
    })
    }
    loadFilters();
  }, [])


 
  // list of functions to handle the change in their respectives inputs.
  const handleCountryChanged = useCallback((val: any)=> {
    if (val === 'en_US') {
      val = 'US'
      setCountry({
      selectedCountry: val,
      listOfCountries: country.listOfCountries
    })
    } else {
      setCountry({
        selectedCountry: val,
        listOfCountries: country.listOfCountries
      })
    } 
  }, [country])

  const handleLocaleChanged = useCallback((val: any)=> {
      setLocale({
        selectedLocale: val,
        listOfLocales: locale.listOfLocales
      })
  }, [locale])

  const handleTimePickerChanged = useCallback((val: any)=> {
    setTimestamp({
      selectedValue: val,
      name: timestamp.name,
      id: timestamp.id
    })
}, [timestamp])

const handleLimitChanged = useCallback((val: any)=> {
  setLimit({
    selectedValue: val,
    name: limit.name,
    id: limit.id
  })
}, [limit])

const handleOffsetChanged = useCallback((val: any)=> {
  setOffset({
    selectedValue: val,
    name: offset.name,
    id: offset.id
  })
}, [offset])


  return (
    <>
    <Header>
      <SearchInput setSearch={setSearch}/>
          {country.listOfCountries && country && <Dropdown filter={country.listOfCountries} selectedValue={country.selectedCountry} changed={handleCountryChanged} options={country.listOfCountries.values}/>} 
          {locale.listOfLocales && locale && <Dropdown filter={locale.listOfLocales} selectedValue={locale.selectedLocale} changed={handleLocaleChanged} options={country.listOfCountries.values}/>} 

            <TimePicker filter={timestamp} changed={(e)=> {handleTimePickerChanged(e)}}/>
            <NumberInput placeholder="Padrão: 20" changed={handleLimitChanged} filter={limit}/> 
            <NumberInput placeholder="Padrão: 0" changed={handleOffsetChanged} filter={offset}/> 

          
    </Header>
    <Content>
      {search && playlists?.length ? 
          playlists?.filter(playlist => playlist.name.toLowerCase().includes(search.toLowerCase())).map(playlist => <Card key={playlist.id} playlist={playlist}/>)
          : playlists?.map(playlist => <Card key={playlist.id} playlist={playlist}/>)
        } 
    </Content>
      
    
    </>
  )

}

export default LandingPage