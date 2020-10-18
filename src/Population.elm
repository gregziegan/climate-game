module Population exposing (Population, canTrain, generate, train)

import Job exposing (Title)
import Person exposing (Person)
import Random exposing (Generator)


type alias Population =
    List Person



-- QUERY


canTrain : Job.Title -> Population -> Bool
canTrain title population =
    List.any (\person -> person.job == Nothing && Person.isQualified title person) population



-- ALTER


trainHelp : Job.Title -> Population -> Population -> Population
trainHelp title newPop population =
    case population of
        [] ->
            newPop

        person :: rest ->
            if person.job == Nothing && Person.isQualified title person then
                List.append newPop ({ person | job = Just (Job.train title) } :: rest)

            else
                trainHelp title (person :: newPop) rest


train : Title -> Population -> Population
train title population =
    trainHelp title [] population



-- GENERATE


generate : Generator Population
generate =
    Random.int 5 15
        |> Random.andThen (\len -> Random.list len Person.generate)
