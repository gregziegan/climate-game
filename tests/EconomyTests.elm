module EconomyTests exposing (..)

import Economy exposing (Economy)
import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Person exposing (Person)
import Test exposing (..)


boolToNum : Bool -> Int
boolToNum bool =
    if bool then
        1

    else
        0


suite : Test
suite =
    describe "The Economy module"
        [ describe "Economy.provide"
            [ test "tablates correct score for the average individual" <|
                \_ ->
                    let
                        person =
                            Person.average 1

                        economy =
                            { hospitalBeds = 10
                            , prescriptionDrugs = 10
                            , bedrooms = 10
                            , bathrooms = 12
                            , kitchens = 10
                            , livingRooms = 10
                            , extraRooms = 2
                            , surgeons = 10
                            , openPrimaryEnrollment = 10
                            , openSecondaryEnrollment = 10
                            , openTertiaryEnrollment = 10
                            , food = 10
                            , clothing = 10
                            }

                        expectedService =
                            { stats = Economy.idealStats
                            , economy =
                                { economy
                                    | food = economy.food - 1
                                    , clothing = economy.clothing - 1
                                    , prescriptionDrugs = economy.prescriptionDrugs - person.prescriptionsNeeded
                                    , bedrooms = economy.bedrooms - 1
                                    , bathrooms = economy.bathrooms - 1
                                    , kitchens = economy.kitchens - 1
                                    , surgeons = economy.surgeons - person.surgeriesNeeded
                                    , hospitalBeds = economy.hospitalBeds - boolToNum person.needsHospitalization
                                }
                            , person = { person | prescriptionsNeeded = 0 }
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

                        economy =
                            Economy.init

                        expected =
                            { happiness = 1, health = 1 }

                        product =
                            Economy.produce population economy
                    in
                    Expect.equal expected { happiness = product.avgHappiness, health = product.avgHealth }
            , test "returns half the ideal score for a half-served population" <|
                \_ ->
                    let
                        population =
                            List.map Person.average (List.range 0 19)

                        economy =
                            Economy.init

                        expected =
                            { happiness = 1, health = 0.5 }

                        product =
                            Economy.produce population economy
                    in
                    Expect.equal expected { happiness = product.avgHappiness, health = product.avgHealth }
            ]
        ]
