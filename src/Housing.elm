module Housing exposing (Housing, Location(..), buildHouse, generate, score)

import Random exposing (Generator, generate)


type Location
    = Urban
    | Suburban
    | Rural


type alias Housing =
    { water : Float
    , heating : Float
    , electricity : Float
    , internet : Float
    , location : Location
    , quality : Float
    , age : Float
    , bedrooms : Int
    }


buildHouse : Location -> Housing
buildHouse location =
    { water = locationBased location
    , heating = locationBased location
    , electricity = locationBased location
    , internet =
        case location of
            Urban ->
                1

            Suburban ->
                0.8

            Rural ->
                0.4
    , location = location
    , quality = 1.0
    , age = 1
    , bedrooms = 1
    }


locationBased : Location -> Float
locationBased location =
    case location of
        Urban ->
            1.0

        Suburban ->
            1.0

        Rural ->
            1.0



-- QUERY


score : Housing -> Float
score { water, heating, electricity, internet, location, quality, age, bedrooms } =
    1 * water * heating * electricity * amenities location * internet * (quality / age) * toFloat bedrooms


amenities : Location -> Float
amenities location =
    case location of
        Urban ->
            1.0

        Suburban ->
            0.7

        Rural ->
            0.5



-- GENERATE


genLocation : Generator Location
genLocation =
    Random.uniform Urban [ Suburban, Rural ]


generate : Generator Housing
generate =
    Random.map buildHouse genLocation



-- locationScore : Person -> Housing -> Float
-- locationScore person housing =
--     housing.location * person.interest
