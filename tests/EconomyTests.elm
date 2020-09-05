module EconomyTests exposing (..)

import Economy exposing (Economy, Score)
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
                            Person.average

                        economy =
                            Economy.init

                        expectedService =
                            { score = Economy.idealScore
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
        , describe "Economy.totalScore"
            [ test "returns ideal score for a satisfied population" <|
                \_ ->
                    let
                        population =
                            List.repeat 10 Person.average

                        economy =
                            Economy.init
                    in
                    Expect.equal Economy.idealScore (Economy.totalScore population economy)
            , test "returns half the ideal score for a half-served population" <|
                \_ ->
                    let
                        population =
                            List.repeat 20 Person.average

                        economy =
                            Economy.init

                        ideal =
                            Economy.idealScore

                        expectedScore =
                            { ideal | health = 0.5 }
                    in
                    Expect.equal expectedScore (Economy.totalScore population economy)
            ]
        ]
