module Earth exposing (Earth, init, view)

import Element exposing (Element, height, px, text, width)
import Element.Background as Background
import Element.Input exposing (button)


type alias PPM =
    Int



-- Parts Per Million


type alias Earth =
    { trees : Int
    , silica : Int
    , co2 : PPM
    }


trillion : Int
trillion =
    1000000000000


init : Earth
init =
    { trees = 3 * trillion
    , silica = 1 * trillion
    , co2 = 410 -- as of 2020
    }


view : { onPress : msg } -> Element msg
view { onPress } =
    button [ width (px 280), height (px 280), Background.image "./public/EarthGame.svg" ]
        { onPress = Just onPress, label = text "" }
