module Main exposing (main)

import Browser
import Dict exposing (Dict)
import Economy exposing (Economy, Score, Service)
import Element exposing (Color, Element, alignRight, alignTop, centerX, centerY, column, el, fill, fillPortion, height, html, image, padding, paragraph, px, rgb255, row, spacing, text, textColumn, width)
import Element.Background as Background
import Element.Border as Border
import Element.Input exposing (button)
import Element.Region exposing (heading)
import Html exposing (Html)
import List
import NarrativeEngine.Core.Rules as Rules
import NarrativeEngine.Core.WorldModel as WorldModel
import NarrativeEngine.Debug
import NarrativeEngine.Syntax.EntityParser as EntityParser
import NarrativeEngine.Syntax.Helpers as SyntaxHelpers
import NarrativeEngine.Syntax.NarrativeParser as NarrativeParser
import NarrativeEngine.Syntax.RuleParser as RuleParser
import Person exposing (Person)
import Time



-- First we define our world model


{-| Our story world is filled with entities. An entity is an ID with "tags,"
"stats," and "links" (which the narrative engine uses), plus any additional fields
you want to add for your own code to use, like a name or file path to an image for
example. This pattern is known as the "Entity Component System" design pattern.

In this case, we "extend" the engine's "narrative component" with a "named component"
(via Elm's extensible records). You could continue extending it with as many
components as you want.

Note that the narrative engine won't be aware of any of these fields.

-}
type alias ExtraFields =
    NamedComponent {}


{-| The "named component" which in this case adds the "name" and "description"
fields, which we will use in our code below.

Defining this as an extensible record, allows us to combine more components together
in `ExtraFields` if we wanted to.

-}
type alias NamedComponent a =
    { a
        | name : String
        , description : String
    }


{-| Our concrete entity which extends the narrative engine's component with our own
set of components.
-}
type alias Entity =
    WorldModel.NarrativeComponent ExtraFields


{-| Our concrete world model using our extended entities.
-}
type alias MyWorldModel =
    Dict WorldModel.ID Entity


{-| A simple helper that makes it easy to define entities using the entity syntax in
a visually organized way. The first string is the entity definition syntax. The next
two strings are the entity's name and description respectively, which get put into
extra fields record.

If you had more components with more fields, you could modify this helper to include
them.

-}
entity : String -> String -> String -> ( String, ExtraFields )
entity entityString name description =
    ( entityString, { name = name, description = description } )


{-| The list of all of the entities and their initial state in initial world
model. These will be parsed into a `MyWorldModel` later.

The `entity` helper is a nice visual way to build this up, but you could also import
this from another source, such as a spreadsheet.

Capitalizing entity IDs is just a convention, but it visually helps make entities
stand out. Also note that we are using characters/choices/locations because it is
convenient for this example, but there is nothing requiring us to use those specific
tags. You can design your world model however you want.

Note that the world model is stateful and needs to be stored in the model.

-}
initialWorldModelSpec : List ( String, ExtraFields )
initialWorldModelSpec =
    [ -- locations
      entity "OFFICE.location"
        "Presidential office"
        "Office of the president (you)."
    , entity "OFFICE_ENTRANCE.location"
        "Entrance to your office"
        "News crews and protestors show up here time to time."

    -- characters
    , entity "PLAYER.current_location=OFFICE_ENTRANCE"
        "Yourself"
        "You are the president of your country."
    , entity "LEGISLATOR.character.upset.current_location=OFFICE"
        "Legislator"
        "Always busy drafting bills for our country."

    -- choices
    , entity "SIGN.choice.current_location=OFFICE"
        "Sign bill"
        -- notice that this description uses the cycling narrative syntax, in this
        -- case to only show the first part once.
        "Approve the legislator's bill"
    , entity "VETO.choice.current_location=OFFICE"
        "Veto"
        -- notice that this description uses the conditional narrative syntax
        "Veto the legislator's bill"
    , entity "EXPLAIN.choice.current_location=OFFICE"
        "Explain further"
        -- notice that this description uses the random cycling narrative syntax (it
        -- will cycle through each option in a random order each time you click it)
        "{?Could you explain further?|Alright, let me hear more.|Please continue.}"
    ]



-- Time to define our rules


{-| Just like entities, rules follow the ECS pattern, so we can add other fields to
them if we want. In this case we won't have any extra fields, but we will link each
rule's ID to a separate Dict that holds all of the narrative. This is a slightly
different way of doing ECS that separates the "narrative component" data from the
rules, which may make it easier to import narrative from another source, like a
spreadsheet for example. As long as the IDs of the rules and the associated content
are the same, we can link them up as needed. (You could take the same approach for
looking up the entity descriptions instead of including them as an extra field in if
you prefer.)

You could also add extra fields to each rule, like a sound effect file for example,
and access it directly from the rule record, but in this case we do not.

-}
type alias MyRule =
    Rules.Rule {}


{-| Our concrete "rule book" type.
-}
type alias Rules =
    Dict String MyRule


{-| This is the type that can be parsed into a `MyRule`. Each rule consists of a rule
syntax string and a record of extra fields (no extra fields in this case). This way
we can write our rules in a simple string syntax and parse it into the `MyRule` type.
-}
type alias RulesSpec =
    Dict Rules.RuleID ( String, {} )


{-| A simple rule builder helper to make `RulesSpec`s in a nice way. Note these rules
don't have any extra fields, but if they did you could modify this function to
include them.
-}
rule_______________________ : String -> String -> RulesSpec -> RulesSpec
rule_______________________ k v dict =
    Dict.insert k ( v, {} ) dict


{-| All the rules that govern our story (you might think of it as our "rulebook").
These have no state, so they do not need to be stored in our model. These are
written in the rule syntax, and will be parsed into `MyRule`s later.

The `rule_______________________` helper is a nice visual way to write all of the
rules, but you don't have to do it this way if you don't want to. You also could
import this data from another source, such as a spreadsheet.

Each rule's key is used in `narrative_content` below to look up the associated narrative.

-}
rulesSpec : RulesSpec
rulesSpec =
    Dict.empty
        -- First we define some generic rules.  We have more specific rules below
        -- that will take precedence over these if they also match.
        --
        -- This one applies to interacting with any entity that has a "location" tag,
        -- which will "move" the player to that location.  It uses special matcher
        -- "$", which will get replaced with the ID of the actual entity the player
        -- interacted with.
        |> rule_______________________ "moving around"
            """
            ON: *.location
            DO: PLAYER.current_location=$
            """
        -- Here's one that adds any "choice" to the player's inventory (if it isn't
        -- already there).  Again, "$" will be replaced with the ID of the entity
        -- interacted with.
        |> rule_______________________ "making choices"
            """
            ON: *.choice.!current_location=PLAYER
            DO: $.current_location=PLAYER
            """


{-| A simple helper to build up a dictionary of narrative content in a visually
organized way.
-}
content__________________________________ : String -> String -> Dict String String -> Dict String String
content__________________________________ =
    Dict.insert


{-| A dictionary of narrative content keyed by the rule IDs with the text that should
display when that rule matches. As with rules and entities, you could import this
data from an external source, such as a spreadsheet
-}
narrative_content : Dict String String
narrative_content =
    Dict.empty
        |> content__________________________________ "entering the office for the first time"
            "You're eager to start your first day as president. What to do first?"
        |> content__________________________________ "introducing the legislator"
            "Hey Malcolm, how's it going?"
        |> content__________________________________ "moving around"
            "You go explore over there."


{-| Our model holds any state needed for the game. In our case it has our world
model, the current story text, the debug info, and keeps track of how many times we
have called each rule (used for cycling narrative text).
-}
type alias Model =
    { worldModel : MyWorldModel
    , story : String
    , ruleCounts : Dict String Int
    , population : List Person
    , economy : Economy
    , debug : NarrativeEngine.Debug.State
    }


{-| This gets called from `main` with the fully parsed initial world model passed in.
-}
initialModel : MyWorldModel -> ( Model, Cmd Msg )
initialModel initialWorldModel =
    ( { worldModel = initialWorldModel
      , story = "You're a democratically elected president: do the work to give your people happy and healthy lives."
      , ruleCounts = Dict.empty
      , population = List.repeat 10 Person.average
      , economy = Economy.init
      , debug = NarrativeEngine.Debug.init
      }
    , Cmd.none
    )



-- A couple of helpers to lookup the name and description info from an entity ID
-- (this is the "System" in ECS for the `NamedComponent`).
-- Note the description gets passed through the narrative parser (this has to happen
-- at call time since it depends on the state at that time).


getDescription : NarrativeParser.Config Entity -> WorldModel.ID -> MyWorldModel -> String
getDescription config entityID worldModel_ =
    Dict.get entityID worldModel_
        |> Maybe.map .description
        |> Maybe.withDefault ("ERROR can't find entity " ++ entityID)
        |> NarrativeParser.parse config
        -- The parser can break up a narrative into chunks (for pagination for
        -- example), but in our case we use the whole thing, so we just take the
        -- head.
        |> List.head
        |> Maybe.withDefault ("ERROR parsing narrative content for " ++ entityID)


getName : WorldModel.ID -> MyWorldModel -> String
getName entityID worldModel_ =
    Dict.get entityID worldModel_
        |> Maybe.map .name
        |> Maybe.withDefault ("ERROR can't find entity " ++ entityID)


{-| A helper to make the config required for `NarrativeParser.parse`.

Notice how we define a function for "name". You could make any kind of function
here. In this case we always return an `Ok`, but it is better to return an `Err
"reason..."` if the function fails, to display better parsing errors.

-}
makeConfig : WorldModel.ID -> Rules.RuleID -> Model -> NarrativeParser.Config Entity
makeConfig trigger matchedRule model =
    { cycleIndex = Dict.get matchedRule model.ruleCounts |> Maybe.withDefault 0
    , propKeywords = Dict.singleton "name" (\id -> Ok <| getName id model.worldModel)
    , worldModel = model.worldModel
    , trigger = trigger
    }


{-| We only have 2 messages - interacting with an entity, and updating the debug bar
when the player searches the world model. But you could have other messages as well
if desired, and handle them in `update`.
-}
type Msg
    = InteractWith WorldModel.ID
    | UpdateDebugSearchText String
    | Tick
    | HarvestFood


{-| We update our game whenever the player clicks on an entity. We need to check if
any of our rules matched, and if so, we need to apply the changes, and set the new
story text. We also track how many times each rule was triggered (used in cycling
narrative syntax).

The fully parsed `Rules` get passed in from `main`.

-}
update : Rules -> Msg -> Model -> ( Model, Cmd Msg )
update rules msg ({ economy } as model) =
    case msg of
        InteractWith trigger ->
            -- we need to check if any rule matched
            case Rules.findMatchingRule trigger rules model.worldModel of
                Just ( matchedRuleID, { changes } ) ->
                    ( { model
                        | worldModel = WorldModel.applyChanges changes trigger model.worldModel
                        , story =
                            -- get the story from narrative content (we also need to
                            -- parse it)
                            Dict.get matchedRuleID narrative_content
                                |> Maybe.withDefault ("ERROR finding narrative content for " ++ matchedRuleID)
                                |> NarrativeParser.parse (makeConfig trigger matchedRuleID model)
                                -- The parser can break up a narrative into chunks
                                -- (for pagination for example), but in our case we
                                -- use the whole thing, so we just take the head.
                                |> List.head
                                |> Maybe.withDefault ("ERROR parsing narrative content for " ++ matchedRuleID)
                        , ruleCounts = Dict.update matchedRuleID (Maybe.map ((+) 1) >> Maybe.withDefault 1 >> Just) model.ruleCounts
                        , debug =
                            model.debug
                                |> NarrativeEngine.Debug.setLastMatchedRuleId matchedRuleID
                                |> NarrativeEngine.Debug.setLastInteractionId trigger
                      }
                    , Cmd.none
                    )

                Nothing ->
                    -- no rule matched, so lets just show the description of the
                    -- entity that the player interacted with
                    ( { model
                        | story = getDescription (makeConfig trigger trigger model) trigger model.worldModel
                        , ruleCounts = Dict.update trigger (Maybe.map ((+) 1) >> Maybe.withDefault 1 >> Just) model.ruleCounts
                        , debug =
                            model.debug
                                |> NarrativeEngine.Debug.setLastMatchedRuleId trigger
                                |> NarrativeEngine.Debug.setLastInteractionId trigger
                      }
                    , Cmd.none
                    )

        UpdateDebugSearchText searchText ->
            ( { model | debug = NarrativeEngine.Debug.updateSearch searchText model.debug }, Cmd.none )

        HarvestFood ->
            ( { model | economy = { economy | food = economy.food + 1 } }, Cmd.none )

        Tick ->
            ( { model | population = Person.average :: model.population }, Cmd.none )


{-| A helper to make queries from a query syntax string. Make sure the syntax is
correct or this defaults to an empty list.
-}
query : String -> MyWorldModel -> List ( WorldModel.ID, Entity )
query q worldModel =
    RuleParser.parseMatcher q
        |> Result.map (\parsedMatcher -> WorldModel.query parsedMatcher worldModel)
        |> Result.withDefault []


{-| A helper to make assertions from a query syntax string. Make sure the syntax is
correct or this defaults to false.
-}
assert : String -> MyWorldModel -> Bool
assert q worldModel =
    not <| List.isEmpty <| query q worldModel


clickerEarth : Model -> Element Msg
clickerEarth model =
    button [ width (px 100), height (px 100), Background.image "./public/earth.svg" ]
        { onPress = Just HarvestFood, label = text "" }


farmer : Int -> Element Msg
farmer id =
    image [ width (px 32), height (px 64) ] { src = "./public/farmer" ++ String.fromInt id ++ ".png", description = "An 8-bit representation of a farmer." }


farmers : Model -> Element Msg
farmers model =
    row [] (List.map farmer <| List.range 0 2)


clickerEconomy : Model -> Element Msg
clickerEconomy model =
    column [ width fill ]
        [ farmers model
        ]


trainFarmer : Model -> Element Msg
trainFarmer model =
    button [] { onPress = Nothing, label = text "Train a farmer to produce food!" }


clickerStore : Model -> Element Msg
clickerStore model =
    column [ width fill ]
        [ trainFarmer model ]


clickerGame : Model -> Element Msg
clickerGame model =
    row [ width fill, centerY, spacing 30, padding 10 ]
        [ clickerEarth model
        , clickerEconomy model
        , clickerStore model
        ]


viewEntities : List ( WorldModel.ID, Entity ) -> Element Msg
viewEntities entities =
    column [ padding 10 ] (List.map viewEntity entities)


percent : Float -> String
percent num =
    String.fromInt (round (num * 100)) ++ "%"


choiceColumn : Model -> Element Msg
choiceColumn model =
    let
        -- we can get links and stats directly
        currentLocation =
            WorldModel.getLink "PLAYER" "current_location" model.worldModel
                |> Maybe.withDefault "ERROR getting current location"

        locations =
            query "*.location" model.worldModel
                |> List.filter (\( locationID, _ ) -> locationID /= currentLocation)

        choices =
            query "*.choice.current_location=(link PLAYER.current_location)" model.worldModel

        characters =
            query "*.character.current_location=(link PLAYER.current_location)" model.worldModel

        score =
            Economy.totalScore model.population model.economy
    in
    column [ spacing 5, Border.width 2, padding 5, Border.rounded 3, Border.color (rgb255 0 0 255) ]
        (List.concat
            [ if List.isEmpty choices then
                []

              else
                [ paragraph [ heading 3 ] [ text "Choices:" ]
                , viewEntities choices
                ]
            , if List.isEmpty characters then
                []

              else
                [ paragraph [ heading 3 ] [ text "People in the room:" ]
                , viewEntities characters
                ]
            , if List.isEmpty locations then
                []

              else
                [ paragraph [ heading 3 ] [ text "Places you can go:" ]
                , viewEntities locations
                ]
            , [ paragraph [ heading 3 ] [ text "Score:" ]
              , paragraph [] [ text (percent score.happiness ++ " of your citizens are happy") ]
              , paragraph [] [ text (percent score.health ++ " of your citizens are healthy") ]
              ]
            ]
        )


storyColumn : Model -> Element Msg
storyColumn model =
    textColumn [ padding 10, alignTop ]
        [ paragraph [] [ text model.story ]
        ]


view : Model -> Html Msg
view model =
    let
        -- we can get links and stats directly
        currentLocation =
            WorldModel.getLink "PLAYER" "current_location" model.worldModel
                |> Maybe.withDefault "ERROR getting current location"
    in
    Element.layout [ centerX, width (fillPortion 3) ]
        (column [ spacing 10 ]
            [ html (NarrativeEngine.Debug.debugBar UpdateDebugSearchText model.worldModel model.debug)
            , paragraph [ heading 1 ] [ text ("You are currently located in the " ++ getName currentLocation model.worldModel) ]
            , paragraph [ heading 2 ] [ text <| getDescription (makeConfig currentLocation currentLocation model) currentLocation model.worldModel ]
            , row [ spacing 10 ]
                [ choiceColumn model
                , storyColumn model
                ]
            , clickerGame model
            ]
        )


viewEntity : ( WorldModel.ID, Entity ) -> Element Msg
viewEntity ( id, { name } ) =
    button [] { onPress = Just (InteractWith id), label = text name }


second =
    1000


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every (5 * second) (\_ -> Tick)
        ]


main : Program () Model Msg
main =
    let
        addExtraEntityFields { name, description } { tags, stats, links } =
            { tags = tags
            , stats = stats
            , links = links
            , name = name
            , description = description
            }

        addExtraRuleFields extraFields rule =
            rule

        parsedData =
            Result.map3 (\parsedInitialWorldModel narrative parsedRules -> ( parsedInitialWorldModel, parsedRules ))
                (EntityParser.parseMany addExtraEntityFields initialWorldModelSpec)
                (NarrativeParser.parseMany narrative_content)
                (RuleParser.parseRules addExtraRuleFields rulesSpec)
    in
    Browser.document
        { init =
            \_ ->
                parsedData
                    |> Result.map Tuple.first
                    |> Result.withDefault Dict.empty
                    |> initialModel
        , view =
            \model ->
                { title = "Leader Game"
                , body =
                    [ case parsedData of
                        Ok _ ->
                            view model

                        Err errors ->
                            -- Just show the errors, model is ignored
                            SyntaxHelpers.parseErrorsView errors
                    ]
                }
        , update =
            parsedData
                |> Result.map Tuple.second
                |> Result.withDefault Dict.empty
                |> update
        , subscriptions = subscriptions
        }
