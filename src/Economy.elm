module Economy exposing (Economy, Product, Service, Stats, generate, idealStats, init, produce, provide)

import Person exposing (Person)
import Random exposing (Generator)
import Random.Extra exposing (andMap)


type alias Economy =
    { -- permanent
      bedrooms : Int
    , bathrooms : Int
    , kitchens : Int
    , livingRooms : Int
    , extraRooms : Int
    , hospitalBeds : Int

    -- permanent (ish)
    , surgeons : Int
    , openPrimaryEnrollment : Int
    , openSecondaryEnrollment : Int
    , openTertiaryEnrollment : Int

    -- ephemeral
    , food : Int
    , clothing : Int
    , prescriptionDrugs : Int
    }


type alias Stats =
    { happiness : Float
    , health : Float
    }


type alias Service =
    { stats : Stats
    , economy : Economy
    , person : Person
    }


type alias Product =
    { avgHappiness : Float
    , avgHealth : Float
    , economy : Economy
    }


idealStats : Stats
idealStats =
    { happiness = 1.0, health = 1.0 }


init : Economy
init =
    { hospitalBeds = 10
    , prescriptionDrugs = 10
    , bedrooms = 10
    , bathrooms = 12
    , kitchens = 10
    , livingRooms = 10
    , extraRooms = 2
    , surgeons = 10
    , openPrimaryEnrollment = 0
    , openSecondaryEnrollment = 0
    , openTertiaryEnrollment = 0
    , food = 10
    , clothing = 10
    }


genHospitalBeds : Generator Int
genHospitalBeds =
    Random.int 10 20


genPrescriptionDrugs : Generator Int
genPrescriptionDrugs =
    Random.int 10 20


genBedrooms : Generator Int
genBedrooms =
    Random.int 10 20


genBathrooms : Generator Int
genBathrooms =
    Random.int 12 20


genKitchens : Generator Int
genKitchens =
    Random.int 10 20


genLivingRooms : Generator Int
genLivingRooms =
    Random.int 10 20


genExtraRooms : Generator Int
genExtraRooms =
    Random.int 3 10


genSurgeons : Generator Int
genSurgeons =
    Random.constant 0


genOpenPrimaryEnrollment : Generator Int
genOpenPrimaryEnrollment =
    Random.constant 0


genOpenSecondaryEnrollment : Generator Int
genOpenSecondaryEnrollment =
    Random.constant 0


genOpenTertiaryEnrollment : Generator Int
genOpenTertiaryEnrollment =
    Random.constant 0


genFood : Generator Int
genFood =
    Random.int 10 20


genClothing : Generator Int
genClothing =
    Random.int 10 20


generate : Generator Economy
generate =
    Random.map Economy genHospitalBeds
        |> andMap genPrescriptionDrugs
        |> andMap genBedrooms
        |> andMap genBathrooms
        |> andMap genKitchens
        |> andMap genLivingRooms
        |> andMap genExtraRooms
        |> andMap genSurgeons
        |> andMap genOpenPrimaryEnrollment
        |> andMap genOpenSecondaryEnrollment
        |> andMap genOpenTertiaryEnrollment
        |> andMap genFood
        |> andMap genClothing


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
    , flexRoomStats = 0.9
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


provideEducation : Person -> Economy -> ( Economy, Bool )
provideEducation person economy =
    if not person.hasPrimaryEducation then
        let
            remainingSeats =
                economy.openPrimaryEnrollment - 1
        in
        ( { economy | openPrimaryEnrollment = remainingSeats }, remainingSeats >= 0 )

    else if not person.hasSecondaryEducation then
        let
            remainingSeats =
                economy.openSecondaryEnrollment - 1
        in
        ( { economy | openSecondaryEnrollment = remainingSeats }, remainingSeats >= 0 )

    else if Person.canGoToCollege person then
        let
            remainingSeats =
                economy.openTertiaryEnrollment - 1
        in
        ( { economy | openTertiaryEnrollment = remainingSeats }, remainingSeats >= 0 )

    else
        ( economy, True )


foodStats : Service -> Service
foodStats ({ stats, economy } as service) =
    let
        updatedEconomy =
            provideFood economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedEconomy.food >= 0 then
                stats

            else
                { stats | health = healthModifiers.food * stats.health }
    }


provideClothes : Economy -> Economy
provideClothes economy =
    { economy | clothing = economy.clothing - 1 }


clothingStats : Service -> Service
clothingStats ({ stats, economy } as service) =
    let
        updatedEconomy =
            provideClothes economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedEconomy.clothing >= 0 then
                stats

            else
                { stats | health = healthModifiers.clothing * stats.health }
    }


prescriptionStats : Service -> Service
prescriptionStats ({ person, stats, economy } as service) =
    let
        ( updatedEconomy, updatedPerson ) =
            provideDrugs person economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedPerson.prescriptionsNeeded >= 0 then
                stats

            else
                { stats | health = healthModifiers.prescription * stats.health }
        , person = updatedPerson
    }


surgeryStats : Service -> Service
surgeryStats ({ person, stats, economy } as service) =
    let
        ( updatedEconomy, updatedPerson ) =
            performSurgeries person economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedPerson.surgeriesNeeded >= 0 then
                stats

            else
                { stats | health = healthModifiers.surgery * stats.health }
        , person = updatedPerson
    }


hospitalizationStats : Service -> Service
hospitalizationStats ({ person, stats, economy } as service) =
    let
        ( updatedEconomy, updatedPerson ) =
            hospitalize person economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedPerson.needsHospitalization then
                { stats | health = healthModifiers.hospitalization * stats.health }

            else
                stats
        , person = updatedPerson
    }


bedroomStats : Service -> Service
bedroomStats ({ stats, economy } as service) =
    let
        updatedEconomy =
            provideBedroom economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedEconomy.bedrooms >= 0 then
                stats

            else
                { stats | health = housingModifiers.bedroom * stats.health }
    }


bathroomStats : Service -> Service
bathroomStats ({ stats, economy } as service) =
    let
        updatedEconomy =
            provideBathroom economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedEconomy.bathrooms >= 0 then
                stats

            else
                { stats | health = housingModifiers.bathroom * stats.health }
    }


kitchenStats : Service -> Service
kitchenStats ({ stats, economy } as service) =
    let
        updatedEconomy =
            provideKitchen economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if updatedEconomy.kitchens >= 0 then
                stats

            else
                { stats | health = housingModifiers.kitchen * stats.health }
    }


educationStats : Service -> Service
educationStats ({ person, stats, economy } as service) =
    let
        ( updatedEconomy, openSeats ) =
            provideEducation person economy
    in
    { service
        | economy = updatedEconomy
        , stats =
            if openSeats then
                stats

            else
                { stats | happiness = stats.happiness * 0.75 }
    }


provideHelp : Person -> ( List Service, Economy ) -> ( List Service, Economy )
provideHelp person ( serviced, economy ) =
    let
        currentEconomy =
            Maybe.map .economy (List.head serviced) |> Maybe.withDefault economy

        service =
            provide person currentEconomy
    in
    ( service :: serviced, currentEconomy )


provide : Person -> Economy -> Service
provide person economy =
    let
        service =
            { stats = idealStats, economy = economy, person = person }
    in
    service
        |> foodStats
        |> clothingStats
        |> prescriptionStats
        |> surgeryStats
        |> hospitalizationStats
        |> bedroomStats
        |> bathroomStats
        |> kitchenStats
        |> educationStats


toTuple : Stats -> ( Float, Float )
toTuple { happiness, health } =
    ( happiness, health )


produce : List Person -> Economy -> Product
produce population economy =
    let
        ( services, currentEconomy ) =
            List.foldl provideHelp ( [], economy ) population

        ( happiness, health ) =
            List.unzip (List.map (toTuple << .stats) services)

        popSize =
            toFloat (List.length population)
    in
    { avgHappiness = List.sum happiness / popSize, avgHealth = List.sum health / popSize, economy = currentEconomy }
