module Person exposing (Interest, Person, average, canGoToCollege, isQualified, wantsTertiaryEducation)

import Job exposing (Job, Title(..))


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
    }


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
    }
