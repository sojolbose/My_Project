import React, { useEffect, useState } from "react"
import {useQuery} from "@apollo/client"
import {getContinents} from "../GraphQL/Queries"
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom"


const Continents = () =>{

    const useStyles = makeStyles({
        cardRoot: {
          minWidth: 275,
          color: "blue"
        },
        gridRoot:{
            flexGrow: 10,
            width: "100%"
        },
        title: {
            color:"text.primary",
            fontSize: "120%",
            fontWeight: "bolder"
        },
        sub:{
            fontSize: "100%",
            color: "text.secondary"
        },
        pos: {
          marginBottom: 12,
        },
        button:{
            color: "primary.main"
        }
      });


    const {loading, data} = useQuery(getContinents)
    const [continents, setContinents] = useState([])
    const [loadingFlag, setLoadingFlag] = useState(false)

    useEffect(()=>{
        if(loading){
            setLoadingFlag(true)
        }
        if(data){
            setLoadingFlag(false)
            setContinents(data.continents)
        }
    },[data,loading])
    const classes = useStyles();
    return(
        <div>
            <h1>Continents List</h1>
            {loadingFlag?<h1>Loading...</h1>:
            <>
                <Grid container spacing={1}>{continents.map((continent,id)=>{
                    return(
                        <Grid key={id} item xs = {6}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {continent.name}
                                </Typography>
                                <Typography className={classes.sub} component="h5">
                                    ({continent.code})
                                </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid item xs={12} align="center" >
                                        <Link style={{"textDecoration":"none"}} to={`/${continent.code}`} continent={continent.name}>
                                            <Button className={classes.button} size="small">Learn More</Button>
                                        </Link>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
                </Grid>
            </>
            }
        </div>
        
    )
}

export default Continents