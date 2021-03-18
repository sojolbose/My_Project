import {gql} from "@apollo/client"

export const getContinents =  gql`
query {
  continents(filter:{}){
    code
    name
  }
}
`

export const getContinentDetails = gql`
query($continent: String){
    continents(filter:{
      code:{
        eq:$continent
      }
    }){
      code
      name
      countries{
        name
      }
    }
  }
`