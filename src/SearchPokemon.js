import React , { useRef, useState }from "react";
import { BiSearch } from "react-icons/bi"
import "./search.css";

const SearchPokemon = () =>{

    let [searched , setSearched] = useState("Let's see...")
    let [pokeData , setPokeData] = useState("") //Will be true only if data retrieve
    let inputRef = useRef(null);

    let click =()=>{
        setPokeData("");
        //Showing that fetching
      
        let fetching = async () =>{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${(inputRef.current.value).toLowerCase()}`);
            if(response.status >= 200 && response.status <= 299){
                const data = response.json();
                return data
            }else{
                throw new Error("Not found.")
            }
        }

        if(inputRef.current.value.length === 0){
            return;
        }else{
            setSearched("loading...");
            fetching().then((data)=>{
                //After fetch retrieve data on last step
                //Get a data!
                setPokeData(data)
                setSearched("Let's see...");
            }).catch((error)=>{
                setSearched("Not found.")
            })
        }
    }

    // useEffect(()=>{
    //     console.log(pokeData , "POKEDATA")
    // },[pokeData])

    return(
        <div className="wrapper">
            <div className="search-section">
                <input type="text" name="name" ref={inputRef}/>
                <button onClick={click}><BiSearch/></button>
            </div>
            {!pokeData && <p>Let search some pokemon here</p>}
            {pokeData ? <LoadPokemon data={pokeData}/> : <p className="wait-for-load">{searched}</p>}
        </div>

    )
}

const LoadPokemon = ({data}) =>{
    console.log(data , "Pokemon data transfered!");

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
    
    let colorForBorder = borderColor(data.types[0].type.name);
    return(
        <>
            <div className="pokemon">
                <div className="character" style={{"border":`3px solid ${colorForBorder}`}}>
                    <div className="pokemon-bg" style={{"background":`linear-gradient(180deg, #FFFFFF 0%, ${colorForBorder} 100%)`}}></div>
                    <img src={data.sprites.other.dream_world.front_default} alt={`${data.name}_img`}/>
                    <h2>{data.name}</h2>
                </div>
                <div className="character-infos">
                    <div style={{"backgroundColor":colorForBorder}}>
                        <p style={{"color":"#737373"}}>ID</p>
                        <p style={{"color":"#252525"}}>{data.id}</p>
                    </div>
                    <div style={{"backgroundColor":colorForBorder}}>
                        <p style={{"color":"#737373"}}>Main type</p>
                        <p style={{"color":"#252525"}}>{data.types[0].type.name}</p>
                    </div>
                    <div style={{"backgroundColor":colorForBorder}}>
                        <p style={{"color":"#737373"}}>Weight</p>
                        <p style={{"color":"#252525"}}>{data.weight}</p>
                    </div>
                    <div style={{"backgroundColor":colorForBorder}}>
                        <p style={{"color":"#737373"}}>Height</p>
                        <p style={{"color":"#252525"}}>{data.height}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPokemon;