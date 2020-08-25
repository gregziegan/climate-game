module Job exposing (Job)

import Location exposing (Location)


type JobTitle
    = Doctor
    | Nurse
    | CivilEngineer
    | Programmer
    | SocialWorker
    | Teacher
    | Professor
    | Carpenter
    | Electrician


type alias Job =
    { title : JobTitle
    , salary : Int
    , location : Location
    }
