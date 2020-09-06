module Economy exposing (Economy, Score, Service, idealScore, init, provide, totalScore)

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
    , food : Int
    , clothing : Int
    }


type alias Score =
    { happiness : Float
    , health : Float
    }


type alias Service =
    { score : Score
    , economy : Economy
    , person : Person
    }


idealScore : Score
idealScore =
    { happiness = 1.0, health = 1.0 }


init : Economy
init =
    { hospitalBeds = 10
    , surgeons = 10
    , prescriptionDrugs = 10
    , bedrooms = 10
    , bathrooms = 12
    , kitchens = 10
    , livingRooms = 10
    , extraRooms = 2
    , food = 10
    , clothing = 10
    }


healthModifiers =
    { food = 0
    , clothing = 0.5
    , surgery = 0
    , prescription = 0
    , hospitalization = 0.25
    }


housingModifiers =
    { bedroom = 0
    , bathroom = 0
    , kitchen = 0.8
    , livingRoom = 0.3
    , flexRoomScore = 0.9
    }


transitModifiers =
    { walking = 1 -- TODO: ableist algorithm, need to factor in accessibility ASAP
    , biking = 0.75
    , car = 0.3
    , train = 0.8
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
    , { person | needsHospitalization = (bedsNeeded - economy.hospitalBeds) >= 0 }
    )


provideBedroom : Economy -> Economy
provideBedroom economy =
    { economy | bedrooms = economy.bedrooms - 1 }


provideBathroom : Economy -> Economy
provideBathroom economy =
    { economy | bathrooms = economy.bathrooms - 1 }


provideKitchen : Economy -> Economy
provideKitchen economy =
    { economy | kitchens = economy.kitchens - 1 }


provideFood : Economy -> Economy
provideFood economy =
    { economy | food = economy.food - 1 }


foodScore : Service -> Service
foodScore ({ score, economy } as service) =
    let
        updatedEconomy =
            provideFood economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedEconomy.food >= 0 then
                score

            else
                { score | health = healthModifiers.food * score.health }
    }


provideClothes : Economy -> Economy
provideClothes economy =
    { economy | clothing = economy.clothing - 1 }


clothingScore : Service -> Service
clothingScore ({ score, economy } as service) =
    let
        updatedEconomy =
            provideClothes economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedEconomy.clothing >= 0 then
                score

            else
                { score | health = healthModifiers.clothing * score.health }
    }


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


bedroomScore : Service -> Service
bedroomScore ({ score, economy } as service) =
    let
        updatedEconomy =
            provideBedroom economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedEconomy.bedrooms >= 0 then
                score

            else
                { score | health = housingModifiers.bedroom * score.health }
    }


bathroomScore : Service -> Service
bathroomScore ({ score, economy } as service) =
    let
        updatedEconomy =
            provideBathroom economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedEconomy.bathrooms >= 0 then
                score

            else
                { score | health = housingModifiers.bathroom * score.health }
    }


kitchenScore : Service -> Service
kitchenScore ({ score, economy } as service) =
    let
        updatedEconomy =
            provideKitchen economy
    in
    { service
        | economy = updatedEconomy
        , score =
            if updatedEconomy.kitchens >= 0 then
                score

            else
                { score | health = housingModifiers.kitchen * score.health }
    }


provide : Person -> Economy -> Service
provide person economy =
    let
        service =
            { score = idealScore, economy = economy, person = person }
    in
    service
        |> foodScore



-- |> clothingScore
-- |> prescriptionScore
-- |> surgeryScore
-- |> hospitalizationScore
-- |> bedroomScore
-- |> bathroomScore
-- |> kitchenScore


toTuple : Score -> ( Float, Float )
toTuple { happiness, health } =
    ( happiness, health )


totalScore : List Person -> Economy -> Score
totalScore population economy =
    let
        provideHelp person serviced =
            let
                currentEconomy =
                    Maybe.map .economy (List.head serviced) |> Maybe.withDefault economy

                service =
                    provide person currentEconomy
            in
            service :: serviced

        services =
            List.foldl provideHelp [] population

        ( happiness, health ) =
            List.unzip (List.map (toTuple << .score) services)

        popSize =
            toFloat (List.length population)
    in
    { happiness = List.sum happiness / popSize, health = List.sum health / popSize }
