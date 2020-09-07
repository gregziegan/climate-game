module Job exposing (Job, Title(..), showTitle, train)


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
            "CivilEngineer"

        Programmer ->
            "Programmer"

        SocialWorker ->
            "SocialWorker"

        Teacher ->
            "Teacher"

        Professor ->
            "Professor"

        Carpenter ->
            "Carpenter"

        Electrician ->
            "Electrician"


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
