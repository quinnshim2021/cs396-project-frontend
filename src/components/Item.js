import { useEffect, useState } from "react";
import error from './../error.jpeg';
import loadingI from './../loading.gif';

const Item = (id, order) => {
    const [anime, setAnime] = useState({});
    const [image, setImage] = useState(error);
    const [loading, setLoading] = useState(true);
    const loadingImage = loadingI;

    /* get the new anime from the db */
    useEffect(() => {
        fetch(`https://anime-recommendator.herokuapp.com/anime/${id.id}`)
            .then(res => res.json())
            .then((result) => {
                    setAnime(result)
                }
            )
            .catch(() => {
                setImage(error);
            })
    }, [id]);

    /* get the image for the anime */
    useEffect(() => {
        setLoading(true);
        if (anime && anime.Title){
            const words = anime.Title.split(" ");
            let query = "";
            words.map((word) => query += word + "+")
            const BASEURL = "https://anime-recommendator.herokuapp.com/cover/";
            // const BASEURL = "http://localhost:8081/cover/";
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
        } else {
            setImage(error);
            setLoading(false);
        }
    }, [anime])

    return (
      <div className="Item">
          {
              loading ?
                <img 
                    src={loadingImage}
                    alt="if you're seeing this then oops"
                    />
              :
              <img 
                src={image}
                alt="if you're seeing this then oops"
                />
          }
      </div>
    );
  }
  
  export default Item;
  