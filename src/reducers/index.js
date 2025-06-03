const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    case "HERO_CREATED":
      let addingNewHero = [...state.heroes, action.payload];
      return {
        ...state,
        heroes: addingNewHero,
        // filteredHeroes:
        //   state.activeFilter === "all"
        //     ? addingNewHero
        //     : addingNewHero.filter(
        //         (item) => item.element === state.activeFilter
        //       ),
      };
    case "HERO_DELETED":
      let deletingingHero = state.heroes.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        heroes: deletingingHero,
        // filteredHeroes:
        //   state.activeFilter === "all"
        //     ? addingNewHero
        //     : addingNewHero.filter(
        //         (item) => item.element === state.activeFilter
        //       ),
      };
    default:
      return state;
  }
};

export default reducer;
