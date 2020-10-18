module Population exposing (Population, generate)

import Person exposing (Person)
import Random exposing (Generator)


type alias Population =
    List Person


generate : Generator Population
generate =
    Random.int 5 15
        |> Random.andThen (\len -> Random.list len Person.generate)
