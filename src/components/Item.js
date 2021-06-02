import { useEffect, useState } from "react";
import error from './../error.jpeg';
import loadingGif from './../loading.gif';

const Item = ({id, handler}) => {
    const [anime, setAnime] = useState({});
    const [image, setImage] = useState(error);
    const [loading, setLoading] = useState(true);
    const loadingImage = loadingGif;
    const BaseUrl = /* "http://localhost:8081/anime/"; // */"https://anime-recommendator.herokuapp.com/anime/"
    const BaseCoverUrl = /* "http://localhost:8081/cover/"; // */ "https://anime-recommendator.herokuapp.com/cover/"

    /* get anime */
    useEffect(() => {
        (async() => {
            const BASEURL = BaseUrl
            fetch(BASEURL + id)
                .then(res => res.json())
                .then((result) => {
                        setAnime(result)
                    }
                )
                .catch(() => {
                    setAnime(error);
                })

        })();
    }, [id])

    /* get the image for the anime */
    useEffect(() => {
        setLoading(true);
        if (anime && anime.Title){
            (async() => {
                const words = anime.Title.replace(/[/]/g, " ").split(" ");
                let query = "";
                words.map((word) => query += word + "+")
                const BASEURL = BaseCoverUrl;
                fetch(BASEURL + query)
                    .then(res => res.json())
                    .then((result) => {
                        setImage(result);
                        setLoading(false);
                    })
                    .catch(() => {
                        setImage(error);
                        setLoading(false);
                    })
            })();
        } else {
            setImage(error);
            setLoading(false);
        }
    }, [anime])

    return (
      <div className="Item" onClick={(e) => {e.preventDefault(); handler(anime)}}> {/* once an anime is clicked, send it back to Quiz's handler */}
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
  