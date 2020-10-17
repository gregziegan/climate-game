module Person exposing (Interest, Person, average, canGoToCollege, generate, housingScore, isQualified, wantsTertiaryEducation)

import Housing exposing (Housing, Location(..))
import Job exposing (Job, Title(..))
import Random exposing (Generator)
import Random.Extra as Random exposing (andMap)


type Interest
    = Medical
    | Engineering
    | SocialWork
    | Teaching
    | Trade
    | Unknown


type HealthcareNeed
    = Prescription Int
    | Hospitalization
    | Surgery


type TransitNeed
    = WalkingRoute
    | BikeRoute
    | CarRoute
    | BusRoute
    | TrainRoute


type TertiaryQualification
    = TradeDegree
    | EngineeringDegree
    | SocialWorkDegree
    | MedicalDegree
    | TeachingDegree


type alias Person =
    { id : Int
    , name : String
    , age : Int
    , job : Maybe Job
    , hasPrimaryEducation : Bool
    , hasSecondaryEducation : Bool
    , tertiaryQualifications : List TertiaryQualification

    -- wants
    , interest : Interest
    , wantsLivingRoom : Bool
    , wantsFlexRoom : Bool

    -- needs
    , prescriptionsNeeded : Int
    , surgeriesNeeded : Int
    , needsHospitalization : Bool
    , house : Maybe Housing
    }


average : Int -> Person
average id =
    { id = id
    , name = "Joe"
    , age = 35
    , job = Just (Job.train Carpenter)
    , hasPrimaryEducation = True
    , hasSecondaryEducation = True
    , tertiaryQualifications = [ TradeDegree ]

    -- wants
    , interest = Trade
    , wantsLivingRoom = True
    , wantsFlexRoom = False

    -- needs
    , prescriptionsNeeded = 1
    , surgeriesNeeded = 0
    , needsHospitalization = False
    , house = Nothing
    }


housingScore : Person -> Float
housingScore person =
    case person.house of
        Just house ->
            Housing.score house

        Nothing ->
            0


wantsTertiaryEducation : Person -> Bool
wantsTertiaryEducation person =
    not <|
        case person.interest of
            Medical ->
                List.member MedicalDegree person.tertiaryQualifications

            Engineering ->
                List.member EngineeringDegree person.tertiaryQualifications

            SocialWork ->
                List.member SocialWorkDegree person.tertiaryQualifications

            Teaching ->
                List.member TeachingDegree person.tertiaryQualifications

            Trade ->
                List.member TradeDegree person.tertiaryQualifications

            Unknown ->
                True


canGoToCollege : Person -> Bool
canGoToCollege person =
    person.job == Nothing && person.hasPrimaryEducation && person.hasSecondaryEducation && wantsTertiaryEducation person


isQualified : Job.Title -> Person -> Bool
isQualified title person =
    case title of
        Farmer ->
            person.hasSecondaryEducation

        Doctor ->
            List.member MedicalDegree person.tertiaryQualifications

        Nurse ->
            List.member MedicalDegree person.tertiaryQualifications

        CivilEngineer ->
            List.member EngineeringDegree person.tertiaryQualifications

        Programmer ->
            List.member EngineeringDegree person.tertiaryQualifications

        SocialWorker ->
            List.member SocialWorkDegree person.tertiaryQualifications

        Teacher ->
            List.member TeachingDegree person.tertiaryQualifications

        Professor ->
            List.member TeachingDegree person.tertiaryQualifications

        Carpenter ->
            List.member TradeDegree person.tertiaryQualifications

        Electrician ->
            List.member TradeDegree person.tertiaryQualifications


generate : Generator Person
generate =
    Random.map Person genId
        |> andMap genName
        |> andMap genAge
        |> andMap genJob
        |> andMap genPrimaryEducation
        |> andMap genSecondaryEducation
        |> andMap genTertiaryEducation
        |> andMap genInterest
        |> andMap genWantsLivingRoom
        |> andMap genWantsFlexRoom
        |> andMap genPrescriptionsNeeded
        |> andMap genSurgeriesNeeded
        |> andMap genNeedsHospitalization
        |> andMap genHousing


genId : Generator Int
genId =
    Random.int Random.minInt Random.maxInt


genName : Generator String
genName =
    -- TODO: integrate https://github.com/philipperemy/name-dataset
    Random.uniform "Alexandria" [ "Bernard", "Marquita", "Noam", "Karl" ]


genAge : Generator Int
genAge =
    Random.int 0 100


genJob : Generator (Maybe Job)
genJob =
    Random.map2
        (\n job ->
            if n < 10 then
                Nothing

            else
                Just job
        )
        (Random.int 1 100)
        Job.generate


genPrimaryEducation : Generator Bool
genPrimaryEducation =
    Random.map (\n -> n < 90) (Random.int 1 100)


genSecondaryEducation : Generator Bool
genSecondaryEducation =
    Random.map (\n -> n < 75) (Random.int 1 100)


generateQualification : Generator TertiaryQualification
generateQualification =
    Random.uniform TradeDegree
        [ EngineeringDegree
        , SocialWorkDegree
        , MedicalDegree
        , TeachingDegree
        ]


genTertiaryEducation : Generator (List TertiaryQualification)
genTertiaryEducation =
    Random.int 1 3
        |> Random.andThen (\len -> Random.list len generateQualification)


genInterest : Generator Interest
genInterest =
    Random.uniform Trade
        [ Medical
        , Engineering
        , SocialWork
        , Teaching
        , Unknown
        ]


genWantsLivingRoom =
    Random.bool


genWantsFlexRoom =
    Random.bool


genPrescriptionsNeeded =
    Random.int 0 5


genSurgeriesNeeded =
    Random.int 0 2


genNeedsHospitalization =
    Random.map (\n -> n < 5) (Random.int 1 100)


genHousing =
    Random.constant (Just (Housing.buildHouse Urban))
