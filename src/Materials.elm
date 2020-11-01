module Materials exposing (Raw, Refined, noRaw, noRefined)


type alias Raw =
    { wood : Int
    , silica : Int
    }


noRaw : Raw
noRaw =
    Raw 0 0


type alias Refined =
    { lumber : Int
    , glass : Int
    }


noRefined : Refined
noRefined =
    Refined 0 0
