module History exposing (Datum, History, init, record)

import Economy exposing (Economy)
import Housing exposing (Housing)
import Time exposing (Posix)


type alias Datum =
    { time : Posix
    , number : Float
    }


type alias HousingHistory =
    { available : List Datum
    , occupied : List Datum
    }


type alias History =
    { housing : HousingHistory
    }


totalHousing : List Housing -> Float
totalHousing =
    toFloat << List.length


initHousing : Posix -> List Housing -> Datum
initHousing time housing =
    housing
        |> totalHousing
        |> Datum time


initHousingHistory : Posix -> Economy -> HousingHistory
initHousingHistory time economy =
    let
        initHistory =
            List.singleton << initHousing time
    in
    { available = initHistory economy.availableHousing
    , occupied = initHistory economy.occupiedHousing
    }


init : Posix -> Economy -> History
init time economy =
    { housing = initHousingHistory time economy
    }


recordHousing : Posix -> Economy -> HousingHistory -> HousingHistory
recordHousing time economy history =
    { history
        | available = initHousing time economy.availableHousing :: history.available
        , occupied = initHousing time economy.occupiedHousing :: history.occupied
    }


record : Posix -> Economy -> History -> History
record time economy history =
    { history | housing = recordHousing time economy history.housing }
