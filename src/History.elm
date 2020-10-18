module History exposing (Datum, History, HousingConfig, init, record, viewCharts)

import Economy exposing (Economy)
import Element exposing (Element, html)
import GameTime
import Housing exposing (Housing)
import LineChart
import LineChart.Area as Area
import LineChart.Axis as Axis
import LineChart.Axis.Intersection as Intersection
import LineChart.Colors as Colors
import LineChart.Container as Container
import LineChart.Dots as Dots
import LineChart.Events as Events
import LineChart.Grid as Grid
import LineChart.Interpolation as Interpolation
import LineChart.Junk as Junk
import LineChart.Legends as Legends
import LineChart.Line as Line
import Time exposing (Posix)


type alias Datum =
    { time : Posix
    , number : Float
    }


type alias HousingHistory =
    { available : List Datum
    , occupied : List Datum
    }


type alias PublicHealthHistory =
    { availableBeds : List Datum
    , occupiedBeds : List Datum
    }


type alias History =
    { housing : HousingHistory
    , publicHealth : PublicHealthHistory
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


initPublicHealthHistory : Posix -> Economy -> PublicHealthHistory
initPublicHealthHistory time economy =
    { availableBeds = List.singleton (Datum time (toFloat economy.hospitalBeds))
    , occupiedBeds = List.singleton (Datum time 0)
    }


init : Posix -> Economy -> History
init time economy =
    { housing = initHousingHistory time economy
    , publicHealth = initPublicHealthHistory time economy
    }


recordHousing : Posix -> Economy -> HousingHistory -> HousingHistory
recordHousing time economy history =
    { history
        | available = initHousing time economy.availableHousing :: history.available
        , occupied = initHousing time economy.occupiedHousing :: history.occupied
    }


recordPublicHealth : Posix -> Economy -> PublicHealthHistory -> PublicHealthHistory
recordPublicHealth time economy history =
    { history
        | availableBeds = Datum time (toFloat economy.hospitalBeds) :: history.availableBeds
    }


record : Posix -> Economy -> History -> History
record time economy history =
    { history
        | housing = recordHousing time economy history.housing
        , publicHealth = recordPublicHealth time economy history.publicHealth
    }



-- CONFIG


containerConfig : Container.Config msg
containerConfig =
    Container.custom
        { attributesHtml = []
        , attributesSvg = []
        , size = Container.relative
        , margin = Container.Margin 30 100 30 70
        , id = "line-chart-area"
        }


type alias HousingConfig msg =
    { onHover : List Datum -> msg
    , economy : Economy
    , hinted : List Datum
    }


chartConfig : HousingConfig msg -> LineChart.Config Datum msg
chartConfig { onHover, hinted } =
    { y = Axis.default 450 "housing" .number
    , x = Axis.time Time.utc 1270 "time" (toFloat << Time.posixToMillis << .time)
    , container = containerConfig
    , interpolation = Interpolation.monotone
    , intersection = Intersection.default
    , legends = Legends.default
    , events = Events.hoverMany onHover
    , junk = Junk.hoverMany hinted formatX formatY
    , grid = Grid.dots 1 Colors.gray
    , area = Area.stacked 0.5
    , line = Line.default
    , dots = Dots.custom (Dots.empty 5 1)
    }



-- VIEW


viewCharts : HousingConfig msg -> History -> Element msg
viewCharts housingConfig history =
    html
        (LineChart.viewCustom
            (chartConfig housingConfig)
            [ LineChart.line Colors.pink Dots.diamond "Available Housing" history.housing.available
            , LineChart.line Colors.cyan Dots.circle "Occupied Housing" history.housing.occupied
            ]
        )


formatX : Datum -> String
formatX datum =
    GameTime.usFormat datum.time


formatY : Datum -> String
formatY datum =
    String.fromFloat datum.number
