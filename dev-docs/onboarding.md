# Onboarding

## One-time setup

```bash
npm i -g elm elm-format elm-test
```

## Hot Reloading

Run `elm reactor`

Open at http://localhost:8000

## Development Area: Decision Screen

The decision screen uses the [Elm Narrative Engine](http://elmnarrativeengine.com/) to power the RPG element of the game: conversations, navigation, and object interaction. In short, you provide a DSL to describe locations,
rules, and entities (usually people) and the engine handles implementing those rules.

Adding code to this screen will require an understanding of the package itself, so please check out the
its documentation and examples before starting!

## Development Area: Clicker Economy

The clicker game happening in tandem with the decision screen runs passively. It is only paused when making a decision as it's best not to stress out our younger audience with a real-time component.

### Architecture

There's two key components: the `Economy` and the `Population`.

The `Economy` is the aggregate capital useful to service the `Population`. Some facets include the amount of housing, hospital beds, open seats in school, food, and clothing. This capital is accrued by the `Population`'s labor.

The `Population` is the collection of individual `Person`s who are serviced by the economy. How well the economy services the population will determine the population's happiness and healthiness. Those metrics are used to compute a score for the player.

The current algorithm is at a high level:

```
           (via labor)        (via service)
Population     =>     Economy     =>         Score
```
