module Economy exposing (Economy, Score, Service, init, provide)

import Person exposing (Person)


type alias Economy =
    { hospitalBeds : Int
    , surgeons : Int
    , prescriptionDrugs : Int
    , bedrooms : Int
    , bathrooms : Int
    , kitchens : Int
    , livingRooms : Int
    , extraRooms : Int
    }


type alias Score =
    { happiness : Float
    , health : Float
    }


init : Economy
init =
    { hospitalBeds = 100
    , surgeons = 10
    , prescriptionDrugs = 10
    , bedrooms = 1000
    , bathrooms = 1200
    , kitchens = 1000
    , livingRooms = 1000
    , extraRooms = 200
    }


healthModifiers =
    { surgery = 1.0
    , prescription = 1.0
    , hospitalization = 0.75
    }


housingModifiers =
    { bedroom = 1
    , bathroom = 1
    , kitchen = 0.8
    , livingRoom = 0.3
    , flexRoomScore = 0.1
    }


transitModifiers =
    { walking = 1 -- TODO: ableist algorithm, need to factor in accessibility ASAP
    , biking = 0.75
    , car = 0.3
    , train = 0.8
    }


type alias Service =
    { score : Score
    , economy : Economy
    , person : Person
    }


provideDrugs : Person -> Economy -> ( Economy, Person )
provideDrugs person economy =
    ( { economy | prescriptionDrugs = economy.prescriptionDrugs - person.prescriptionsNeeded }
    , { person | prescriptionsNeeded = max (person.prescriptionsNeeded - economy.prescriptionDrugs) 0 }
    )


performSurgeries : Person -> Economy -> ( Economy, Person )
performSurgeries person economy =
    ( { economy | surgeons = economy.surgeons - person.surgeriesNeeded }
    , { person | surgeriesNeeded = max (person.surgeriesNeeded - economy.surgeons) 0 }
    )


hospitalize : Person -> Economy -> ( Economy, Person )
hospitalize person economy =
    let
        bedsNeeded =
            if person.needsHospitalization then
                1

            else
                0
    in
    ( { economy | hospitalBeds = economy.hospitalBeds - bedsNeeded }
    , { person | needsHospitalization = (bedsNeeded - economy.hospitalBeds) > 0 }
    )


provideRoom : Economy -> Economy
provideRoom economy =
    { economy | bedrooms = economy.bedrooms - 1 }


prescriptionScore : Service -> Service
prescriptionScore ({ person, score, economy } as service) =
    let
        ( updatedEconomy, updatedPerson ) =
            provideDrugs person economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedPerson.prescriptionsNeeded >= 0 then
                score

            else
                { score | health = healthModifiers.prescription * score.health }
        , person = updatedPerson
    }


surgeryScore : Service -> Service
surgeryScore ({ person, score, economy } as service) =
    let
        ( updatedEconomy, updatedPerson ) =
            performSurgeries person economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedPerson.surgeriesNeeded >= 0 then
                score

            else
                { score | health = healthModifiers.surgery * score.health }
        , person = updatedPerson
    }


hospitalizationScore : Service -> Service
hospitalizationScore ({ person, score, economy } as service) =
    let
        ( updatedEconomy, updatedPerson ) =
            hospitalize person economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedPerson.needsHospitalization then
                { score | health = healthModifiers.hospitalization * score.health }

            else
                score
        , person = updatedPerson
    }


neededRoomScore : Service -> Service
neededRoomScore ({ score, economy } as service) =
    let
        updatedEconomy =
            provideRoom economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedEconomy.bedrooms >= 0 then
                score

            else
                { score | happiness = housingModifiers.bedroom * score.happiness }
    }


provide : Person -> Economy -> Service
provide person economy =
    let
        score =
            { happiness = 1.0, health = 1.0 }

        service =
            { score = score, economy = economy, person = person }
    in
    service
        |> prescriptionScore
        |> surgeryScore
        |> hospitalizationScore
        |> neededRoomScore
