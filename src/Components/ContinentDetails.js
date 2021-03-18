import React, { useEffect, useState } from "react"
import {useQuery} from "@apollo/client"
import {getContinentDetails} from "../GraphQL/Queries"
import Grid from '@material-ui/core/Grid';

const ContinentDetails = (props) =>{
    const continentCode = props.match.params.continentName
    const [loadingFlag, setLoadingFlag] = useState(false)
    const [continent, setContinent] = useState("")
    const [code, setCode] = useState("")
    const [countryList, setcountryList] = useState([])
    const {loading, data} = useQuery(getContinentDetails, {variables:{continent:continentCode}})
    useEffect(()=>{
        if(loading){
            setLoadingFlag(true)
        }
        if(data){
            setLoadingFlag(false)
            setContinent(data.continents[0].name)
            setCode(data.continents[0].code)
            setcountryList(data.continents[0].countries)
        }
    },[data,loading])


    return(
        <div>
            {loadingFlag?<h1>Loading...</h1>:
            <>
            <h1>{continent}({code})</h1>
            <h2>List of Countries in {continent}</h2>
            <Grid container spacing={5}>
                {countryList.map((country,id)=>{return(
                    <Grid key={id} item xs = {6}>
                        {country.name}
                        {country.code}
                    </Grid>
                )})}
            </Grid>
            </>
        }
        </div>
    )
}

export default ContinentDetails