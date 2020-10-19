module Capital exposing (Capital, zero)

import Housing exposing (Housing)


type alias Capital =
    { -- raw materials
      wood : Int
    , metal : Int
    , plastic : Int
    , bricks : Int
    , glass : Int

    -- usable capital
    , housing : List Housing
    , hospitalBeds : Int
    , surgeons : Int
    , openPrimaryEnrollment : Int
    , openSecondaryEnrollment : Int
    , openTertiaryEnrollment : Int
    , food : Int
    , clothing : Int
    , prescriptionDrugs : Int
    }


zero : Capital
zero =
    Capital 0 0 0 0 0 [] 0 0 0 0 0 0 0 0
