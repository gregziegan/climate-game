module Cultivators exposing (Cultivators, harvest)

import Earth exposing (Earth)
import Job exposing (Title(..))
import Materials
import Person exposing (Person)
import Pollution exposing (Pollution)
import Population exposing (Population)


type alias Cultivators =
    Population


harvestHelp : Person -> ( Earth, Materials.Raw, Pollution ) -> ( Earth, Materials.Raw, Pollution )
harvestHelp person ( earth, materials, pollution ) =
    case person.job of
        Just job ->
            case job.title of
                Lumberjack ->
                    let
                        treesCut =
                            10
                    in
                    ( { earth | trees = earth.trees - treesCut }
                    , { materials | wood = treesCut * 40 }
                    , { pollution | air = pollution.air + 1, water = pollution.water + 1 }
                    )

                _ ->
                    ( earth, materials, pollution )

        Nothing ->
            ( earth, materials, pollution )


harvest : Earth -> Cultivators -> ( Earth, Materials.Raw, Pollution )
harvest earth cultivators =
    List.foldl harvestHelp ( earth, Materials.noRaw, Pollution.none ) cultivators
