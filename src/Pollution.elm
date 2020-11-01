module Pollution exposing (Pollution, none)


type alias Pollution =
    { air : Int
    , plastic : Int
    , soil : Int
    , water : Int
    }


none : Pollution
none =
    Pollution 0 0 0 0
