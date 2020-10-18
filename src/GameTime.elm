module GameTime exposing (..)

import DateFormat
import Time exposing (Posix)


ourFormatter : Posix -> String
ourFormatter =
    DateFormat.format
        [ DateFormat.monthNameFull
        , DateFormat.text " "
        , DateFormat.dayOfMonthSuffix
        , DateFormat.text ", "
        , DateFormat.yearNumber
        ]
        Time.utc
