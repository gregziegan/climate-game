module Job exposing (Job, Title(..), description, generate, showTitle, train, work)

import Capital exposing (Capital)
import Housing
import Random exposing (Generator)


type Title
    = Farmer
    | Doctor
    | Nurse
    | CivilEngineer
    | Programmer
    | SocialWorker
    | Teacher
    | Professor
    | Carpenter
    | Electrician
    | Lumberjack


type alias Job =
    { title : Title
    , salary : Int

    -- , location : Location
    }


showTitle : Title -> String
showTitle title =
    case title of
        Farmer ->
            "Farmer"

        Doctor ->
            "Doctor"

        Nurse ->
            "Nurse"

        CivilEngineer ->
            "Civil Engineer"

        Programmer ->
            "Programmer"

        SocialWorker ->
            "Social Worker"

        Teacher ->
            "Teacher"

        Professor ->
            "Professor"

        Carpenter ->
            "Carpenter"

        Electrician ->
            "Electrician"

        Lumberjack ->
            "Lumberjack"


description : Title -> String
description title =
    case title of
        Farmer ->
            "produce food"

        Doctor ->
            "perform surgeries; prescribe drugs"

        Nurse ->
            "prescribe drugs"

        CivilEngineer ->
            "build housing"

        Programmer ->
            "increase efficiency"

        SocialWorker ->
            "increase happiness"

        Teacher ->
            "train citizens for jobs and more school"

        Professor ->
            "train citizens for jobs"

        Carpenter ->
            "build housing"

        Electrician ->
            "build housing"

        Lumberjack ->
            "gather wood"


train : Title -> Job
train title =
    case title of
        Doctor ->
            { title = title, salary = 100000 }

        Nurse ->
            { title = title, salary = 80000 }

        CivilEngineer ->
            { title = title, salary = 70000 }

        Programmer ->
            { title = title, salary = 80000 }

        SocialWorker ->
            { title = title, salary = 65000 }

        Teacher ->
            { title = title, salary = 75000 }

        Professor ->
            { title = title, salary = 85000 }

        Carpenter ->
            { title = title, salary = 50000 }

        Electrician ->
            { title = title, salary = 55000 }

        Farmer ->
            { title = title, salary = 50000 }

        Lumberjack ->
            { title = title, salary = 50000 }


classSize : number
classSize =
    30


work : Capital -> Job -> Capital
work capital job =
    case job.title of
        Farmer ->
            { capital | food = 50 }

        Doctor ->
            { capital | surgeons = capital.surgeons + 1, prescriptionDrugs = capital.prescriptionDrugs + 1 }

        Nurse ->
            { capital | hospitalBeds = capital.hospitalBeds + 5, prescriptionDrugs = capital.prescriptionDrugs + 3 }

        CivilEngineer ->
            { capital
                | housing =
                    if capital.wood > 0 then
                        Housing.buildHouse Housing.Urban :: capital.housing

                    else
                        capital.housing
            }

        Programmer ->
            capital

        SocialWorker ->
            { capital | prescriptionDrugs = capital.prescriptionDrugs + 2 }

        Teacher ->
            { capital | openSecondaryEnrollment = capital.openSecondaryEnrollment + classSize }

        Professor ->
            { capital | openTertiaryEnrollment = capital.openTertiaryEnrollment + classSize }

        Carpenter ->
            capital

        Electrician ->
            capital

        Lumberjack ->
            { capital
                | wood = capital.wood + 1
                , metal = capital.metal + 1
                , plastic = capital.wood + 1
                , bricks = capital.bricks + 1
                , glass = capital.glass + 1
            }


generate : Generator Job
generate =
    Random.uniform Farmer [ Doctor, Nurse, CivilEngineer, Programmer, SocialWorker, Teacher, Professor, Carpenter, Electrician, Lumberjack ]
        |> Random.map train
