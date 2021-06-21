import React , { useState , useEffect}  from "react";
import "./categories.css";
import { BsArrowRightShort , BsArrowLeftShort } from "react-icons/bs"

let CategoriesPokemon = () =>{

    let [loaded , setLoaded] = useState(false);
    let [navigateUrl , setNavigateUrl] = useState({});
    
    //Set all specific pokemon data
    let [allPokemon , setAllpokemon] = useState([]);

    let fetchCategories = async (url) =>{
        let result = await fetch(url);
        if(result.status >= 200 && result.status <= 299){
            let data = await result.json();
            return data
        }else{
            console.log("Can't fetch data");
        }
    }
    
    const pageChangeHadle = (direction) =>{
        if(direction === "next"){
            setAllpokemon([])
            loadCategories(navigateUrl.next);
        }else{
            setAllpokemon([])
            loadCategories(navigateUrl.previous);
        }

    }

    //Start fetching data
    const loadCategories = (url) =>{
        fetchCategories(url).then((data)=>{
            setLoaded(true);
            setNavigateUrl({next:data.next,previous:data.previous})
            // console.log(data , "Data receive!");
            data.results.forEach((eachPokemon)=>{
                // console.log(eachPokemon)
                
                let eachFetch = async () =>{
                    let result = await fetch(eachPokemon.url);
                    if(result.status >= 200 && result.status <= 299){
        
                        let data = await  result.json();
                        return data
                    }else{
                        console.log(`Can't fetch ${eachPokemon.name}`)
                    }
                }
        
                eachFetch().then((eachPokemonData)=> setAllpokemon((prevPokemon)=> [...prevPokemon , eachPokemonData]));
            });
        })
    }

    useEffect(()=>{
        loadCategories("https://pokeapi.co/api/v2/pokemon");
    },[]);
    
    if(loaded){

        return(
            <div>
                <div className="buttons-top">
                    <button onClick={()=> pageChangeHadle("previous")} className={navigateUrl.previous === null ? "disabled" : ""} disabled={navigateUrl.previous === null ? true : false}><BsArrowLeftShort/></button>
                    <button onClick={()=> pageChangeHadle("next")}><BsArrowRightShort/></button>
                </div>
                <div className="pokemon-categories-cate">
                    {allPokemon.map((eachPokemon)=>{
                         let borderColor = (type) =>{
                            const colorsData = {
                                normal:"#D1D1D1",
                                fighting:"#B47878",
                                flying:"#8CABD0",
                                poison:"#929F92",
                                ground:"#BDA19B",
                                rock:"#A49D9D",
                                bug:"#BEAB8F",
                                ghost:"#B5C2C2",
                                steel:"#DBCAC4",
                                fire:"#CE8787",
                                water:"#B5C0D1",
                                grass:"#94A598",
                                electric:"#F8EF98",
                                psychic:"#CEBCD7",
                                ice:"#A7C3C9",
                                dragon:"#A39597",
                                darl:"#7C7683",
                                fairy:"#D2BCCC",
                                unknown:"#C4C4C4",
                                shadow:"#868686"
                            }
                    
                            return colorsData[type];
                        }
                        
                        let colorForBorder = borderColor(eachPokemon.types[0].type.name);

                        return(
                            <div className="pokemon-cate" key={eachPokemon.name}>
                                <div className="character-cate" style={{"border":`3px solid ${colorForBorder}`}}>
                                    <div className="pokemon-bg-cate" style={{"background":`linear-gradient(180deg, #FFFFFF 0%, ${colorForBorder} 100%)`}}></div>
                                    <img src={eachPokemon.sprites.other.dream_world.front_default} alt={`${eachPokemon.name}_img`}/>
                                    <h2>{eachPokemon.name}</h2>
                                </div>
                                <div className="character-infos-cate">
                                    <div style={{"backgroundColor":colorForBorder}}>
                                        <p style={{"color":"#737373"}}>ID</p>
                                        <p style={{"color":"#252525"}}>{eachPokemon.id}</p>
                                    </div>
                                    <div style={{"backgroundColor":colorForBorder}}>
                                        <p style={{"color":"#737373"}}>Main type</p>
                                        <p style={{"color":"#252525"}}>{eachPokemon.types[0].type.name}</p>
                                    </div>
                                    <div style={{"backgroundColor":colorForBorder}}>
                                        <p style={{"color":"#737373"}}>Weight</p>
                                        <p style={{"color":"#252525"}}>{eachPokemon.weight}</p>
                                    </div>
                                    <div style={{"backgroundColor":colorForBorder}}>
                                        <p style={{"color":"#737373"}}>Height</p>
                                        <p style={{"color":"#252525"}}>{eachPokemon.height}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="buttons-under">
                    <button onClick={()=> pageChangeHadle("previous")} className={navigateUrl.previous === null ? "disabled" : ""} disabled={navigateUrl.previous === null ? true : false}><BsArrowLeftShort/></button>
                    <button onClick={()=> pageChangeHadle("next")}><BsArrowRightShort/></button>
                </div>
            </div>
        )
    }

    return(
        <p>Loading...</p>
    )
}

export default CategoriesPokemon;

