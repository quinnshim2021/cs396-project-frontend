import { useEffect, useState } from "react";
import error from './../error.jpeg';
import loadingGif from './../loading.gif';

const Item = ({id, handler}) => {
    const [anime, setAnime] = useState({});
    const [image, setImage] = useState(error);
    const [loading, setLoading] = useState(true);
    const loadingImage = loadingGif;
    const BaseUrl = /* "http://localhost:8081/anime/"; // */"https://anime-recommendator.herokuapp.com/anime/"

    /* get anime */
    useEffect(() => {
        (async() => {
            setLoading(true);
            const BASEURL = BaseUrl
            fetch(BASEURL + id)
                .then(res => res.json())
                .then((result) => {
                        setAnime(result)
                        setImage(result.Url)
                        setLoading(false);
                    }
                )
                .catch(() => {
                    setAnime(error);
                    setLoading(false);
                })

        })();
    }, [id])

    return (
      <div className="Item" onClick={(e) => {
                e.preventDefault();
                handler(anime);
            }
          }> {/* once an anime is clicked, send it back to Quiz's handler */}
          {
              loading ?
                <img 
                    src={loadingImage}
                    alt="if you're seeing this then oops, please reload the page"
                    />
              :
              <img 
                src={image}
                alt="if you're seeing this then oops, please reload the page"
                />
          }
      </div>
    );
  }
  
  export default Item;
  