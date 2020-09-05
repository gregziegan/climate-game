module Person exposing (Person, average)

import Job exposing (Job)


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


type alias Years =
    Int


type Qualification
    = MedicalDegree Years
    | EngineeringDegree Years
    | SocialWorkDegree Years
    | TeachingDegree Years
    | TradeDegree Years


type TransitNeed
    = WalkingRoute
    | BikeRoute
    | CarRoute
    | BusRoute
    | TrainRoute


type alias Person =
    { name : String
    , age : Int
    , jobs : List Job
    , qualifications : List Qualification

    -- wants
    , interest : Interest
    , wantsLivingRoom : Bool
    , wantsFlexRoom : Bool

    -- needs
    , prescriptionsNeeded : Int
    , surgeriesNeeded : Int
    , needsHospitalization : Bool
    }


average : Person
average =
    { name = "Joe"
    , age = 35
    , jobs = []
    , qualifications = []

    -- wants
    , interest = Trade
    , wantsLivingRoom = True
    , wantsFlexRoom = False

    -- needs
    , prescriptionsNeeded = 1
    , surgeriesNeeded = 0
    , needsHospitalization = False
    }
