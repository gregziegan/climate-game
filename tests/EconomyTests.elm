module EconomyTests exposing (..)

import Economy exposing (Economy)
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Housing exposing (Housing)
import Person exposing (Person)
import Test exposing (..)


boolToNum : Bool -> Int
boolToNum bool =
    if bool then
        1

    else
        0


economy : Economy
economy =
    { occupiedHousing = []
    , availableHousing = List.repeat 10 (Housing.buildHouse Housing.Urban)
    , hospitalBeds = 10
    , prescriptionDrugs = 10
    , surgeons = 10
    , openPrimaryEnrollment = 0
    , openSecondaryEnrollment = 0
    , openTertiaryEnrollment = 0
    , food = 10
    , clothing = 10
    }


suite : Test
suite =
    describe "The Economy module"
        [ describe "Economy.provide"
            [ test "tablates correct score for the average individual" <|
                \_ ->
                    let
                        person =
                            Person.average 1

                        expectedService =
                            { stats = Economy.idealStats
                            , economy =
                                { economy
                                    | occupiedHousing = List.take 1 economy.availableHousing
                                    , availableHousing = List.drop 1 economy.availableHousing
                                    , food = economy.food - 1
                                    , clothing = economy.clothing - 1
                                    , prescriptionDrugs = economy.prescriptionDrugs - person.prescriptionsNeeded
                                    , surgeons = economy.surgeons - person.surgeriesNeeded
                                    , hospitalBeds = economy.hospitalBeds - boolToNum person.needsHospitalization
                                }
                            , person = { person | prescriptionsNeeded = 0, house = List.head economy.availableHousing }
                            }
                    in
                    Expect.equal expectedService (Economy.provide person economy)
            ]
        , describe "Economy.produce"
            [ test "returns ideal happiness and healthiness for a satisfied population" <|
                \_ ->
                    let
                        population =
                            List.map Person.average (List.range 0 9)

                        expected =
                            { happiness = 1, health = 1 }

                        product =
                            Economy.distribute population economy
                    in
                    Expect.equal expected { happiness = product.avgHappiness, health = product.avgHealth }
            , test "returns half the ideal score for a half-served population" <|
                \_ ->
                    let
                        population =
                            List.map Person.average (List.range 0 19)

                        expected =
                            { happiness = 1, health = 0.5 }

                        product =
                            Economy.distribute population economy
                    in
                    Expect.equal expected { happiness = product.avgHappiness, health = product.avgHealth }
            ]
        ]
