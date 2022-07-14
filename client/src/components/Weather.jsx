import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiLoaderAlt } from 'react-icons/bi';

const Weather = () => {
const [weather, setweather] = useState("");
const [loading, setLoading] = useState(false);
const [query, setQuery] = useState("");

const search = async (e) => {
  if(e.key === 'Enter') {
    setweather("");
    setLoading(true);
    if(query) {
      try {
        const data = await axios.get(`http://localhost:8000/weather?q=${query}`);
        setweather(data);
        setQuery('');
        setLoading(false);
      }
      catch {
        setLoading(false);
        setQuery('');
        toast.error("Invalid City! ❌");
      }
    }
  }
}

return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-8 w-96 cursor-pointer rounded-3xl bg-[#fff]">
        <ToastContainer />
        <div className="-mb-20 -translate-y-1/2 transform">
          {!loading ? (
            <div class="pt-2 relative mx-auto text-gray-600">
              <input type="text"className="border-2 ml-7 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"placeholder="Search a city..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
            </div>
          ): (
            <div className='text-center mb-4 dark:text-black'>
              <BiLoaderAlt size={40} className="spinner-border animate-spin inline-block rounded-full" />
            </div>
          )}
        </div>
        {weather && (
          <div className="mt-20 flex items-center justify-center">
            <div className="bg-white p-8 bg-opacity-80 rounded-3xl flex space-x-12 items-center shadow-md">
              <div>
                <img alt="icon" src={weather?.data?.current?.condition?.icon}/>
                <p className="text-center text-gray-500 mt-2 text-sm">{weather?.data?.current?.condition?.text}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-right text-gray-900">{weather?.data?.current?.temp_f}°F</p>
                <p className="text-gray-500 text-sm">{weather?.data?.location?.name}, {weather?.data?.location?.region}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 

export default Weather;
