module Capital exposing (Capital)

import Housing exposing (Housing)


type alias Capital =
    { housing : List Housing
    , hospitalBeds : Int
    , surgeons : Int
    , openPrimaryEnrollment : Int
    , openSecondaryEnrollment : Int
    , openTertiaryEnrollment : Int
    , food : Int
    , clothing : Int
    , prescriptionDrugs : Int
    }
