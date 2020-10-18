module GameTime exposing (usFormat)

import DateFormat
import Time exposing (Posix)


usFormat : Posix -> String
usFormat =
    DateFormat.format
        [ DateFormat.monthNameFull
        , DateFormat.text " "
        , DateFormat.dayOfMonthSuffix
        , DateFormat.text ", "
        , DateFormat.yearNumber
        ]
        Time.utc
