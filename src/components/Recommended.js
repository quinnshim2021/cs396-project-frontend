import { useEffect, useState } from 'react';
import findPreferences from '../shared/algorithm';

const Recommended = ({anime}) => {
    const BaseUrl = "http://localhost:8081/anime/"; //"https://anime-recommendator.herokuapp.com/anime/"
    // use anime prop to get info about what we liked
    const [preferences, setPreferences] = useState({});

    useEffect(() => {
      setPreferences(findPreferences(anime));
    }, [anime])

    return (
      <div className="Recommended">
        {
          preferences.length === 5 ?
            <div>
              {
                preferences.map((preference) => {
                  return <p>{preference.Title}</p>
                })
              }
            </div>
          :
            <div>
              <p>Complete the Quiz to Find Recommended Shows!</p>
            </div>
        }
      </div>
    );
  }
  
  export default Recommended;
  