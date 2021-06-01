import { useEffect, useState } from "react";
import error from './../error.jpeg';
import GoogleImageSearch from 'free-google-image-search'

const Item = (id, order) => {
    const [anime, setAnime] = useState({});
    const [image, setImage] = useState(error);

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

    useEffect(() => {
        if (anime && anime.Title){
            // get anime cover here
        } else {
            setImage(error);
        }
    }, [anime])

    return (
      <div className="Item">
        <img 
            src={image}
            alt="if you're seeing this then oops"
            />
      </div>
    );
  }
  
  export default Item;
  