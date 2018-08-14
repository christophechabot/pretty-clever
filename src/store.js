import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rounds: [],
    rerolls: [],
    plusOnes: [],
    yellowBoxes: [],
    yellowBoxesHorizontalBonuses: [],
    yellowBoxesVerticalBonuses: [],
    yellowBoxesDiagonalBonuses: [],
    greenBoxes: [],
    redBoxes: [],
    purpleBoxes: []
  },
  mutations: {
    emptySheet(state) {
      ///////////
      // Rounds
      ///////////
      state.rounds = [
        ...Array.from(new Array(6), () => ({
          value: false
        }))
      ];

      //////////////////////
      // Available Rerolls
      //////////////////////
      state.rerolls = [
        ...Array.from(new Array(7), () => ({ 
          available: false,
          value: false
        }))
      ];
      
      //////////////////////
      // Available Plus ones
      //////////////////////
      state.plusOnes = [
        ...Array.from(new Array(7), () => ({ 
          available: false,
          value: false
        }))
      ];

      //////////
      // Yellow
      //////////
      const yellowBoxesLabels = ['3', '6', '5', '', '2', '1', '', '5', '1', '', '2', '4', '', '3', '4', '6'];
      state.yellowBoxesHorizontalBonuses = [
        { color: 'blue', type: 'blue', highlighted: false },
        { color: 'red', type: 'red', value: 4, highlighted: false },
        { color: 'green', type: 'green', highlighted: false },
        { type: 'fox', highlighted: false }
      ];      
      state.yellowBoxesVerticalBonuses = [
        { score: 10, highlighted: false },
        { score: 14, highlighted: false },
        { score: 16, highlighted: false },
        { score: 20, highlighted: false }
      ];
      state.yellowBoxesDiagonalBonuses = [
        { color: 'black', type: 'plusOne', highlighted: false }
      ];
      state.yellowBoxes = [
        ...Array.from(new Array(16), (val, index) => ({
          label: yellowBoxesLabels[index],
          value: yellowBoxesLabels[index] === ''
        }))
      ];

      //////////
      // Green
      //////////
      const greenBoxesLabels = ['≥1', '≥2', '≥3', '≥4', '≥5', '≥1', '≥2', '≥3', '≥4', '≥5', '≥6'];
      const greenBoxesBonuses = [
        undefined, undefined, undefined,
        { color: 'black', type: 'plusOne' },
        undefined,
        { color: 'blue', type: 'blue' },
        { type: 'fox' },
        undefined,
        { color: 'purple', type: 'purple', value: 6 },
        { color: 'black', type: 'reroll' },
        undefined
      ];
      state.greenBoxes = [
        ...Array.from(new Array(11), (val, index) => ({ 
          score: (index + 1) * (index + 2) / 2,
          label: greenBoxesLabels[index],
          bonus: greenBoxesBonuses[index],
          value: false
        }))
      ];

      //////////
      // Red
      //////////
      const redBoxesLabels = ['', '', '', 'x2', '', '', 'x2', '', 'x2', '', 'x3'];
      const redBoxesBonuses = [
        undefined, undefined,
        { color: 'black', type: 'reroll' },
        undefined,
        { color: 'yellow', type: 'yellow' },
        { color: 'black', type: 'plusOne' },
        undefined,
        { type: 'fox' },
        undefined,
        { color: 'purple', type: 'purple', value: 6 },
        undefined
      ];
      state.redBoxes = [
        ...Array.from(new Array(11), (val, index) => ({
          label: redBoxesLabels[index],
          bonus: redBoxesBonuses[index],
          value: false
        }))
      ];

      //////////
      // Purple
      //////////
      const purpleBoxesLabels = ['', '', '', 'x2', '', '', 'x2', '', 'x2', '', 'x3'];
      const purpleBoxesBonuses = [
        undefined, undefined,
        { color: 'black', type: 'reroll' },
        { color: 'blue', type: 'blue' },
        { color: 'black', type: 'plusOne' },
        { color: 'yellow', type: 'yellow' },
        { type: 'fox' },
        { color: 'black', type: 'reroll' },
        { color: 'green', type: 'green' },
        { color: 'red', type: 'red', value: 6 },
        { color: 'black', type: 'plusOne' }
      ];
      state.purpleBoxes = [
        ...Array.from(new Array(11), (val, index) => ({
          label: purpleBoxesLabels[index],
          bonus: purpleBoxesBonuses[index],
          value: false
        }))
      ];
    },
    tickBox(state, payload) {
      Vue.set(
        state[`${payload.color}Boxes`],
        payload.index,
        Object.assign({}, state[`${payload.color}Boxes`][payload.index], { value: payload.value })
      )
    },
    tickBonus(state, payload) {
      Vue.set(
        state[`${payload.type}s`],
        payload.index,
        Object.assign({}, state[`${payload.type}s`][payload.index], { value: payload.value })
      )
    },
    tickRound(state, index) {
      Vue.set(
        state.rounds,
        index,
        { value: true }
      );
    },
    addBonus(state, type) {
      const index = state[`${type}s`].findIndex(bonus => !bonus.available);
      Vue.set(
        state[`${type}s`],
        index,
        Object.assign({}, state[`${type}s`][index], { available: true })
      );
    },
    addYellowBonus(state, payload) {
      Vue.set(
        state[`yellowBoxes${payload.type}Bonuses`],
        payload.index,
        Object.assign({}, state[`yellowBoxes${payload.type}Bonuses`][payload.index], { highlighted: true })
      );
    }
  },
  actions: {
    resetSheet(context) {
      context.commit('emptySheet', { reset: true });
    },
    emptySheet(context) {
      context.commit('emptySheet');
    },
    tickBox(context, payload) {
      context.commit('tickBox', payload);
      const bonus = context.getters[`${payload.color}Boxes`][payload.index].bonus;
      if (bonus) {
        // Reroll and PluOnes
        if (bonus.type === 'reroll' || bonus.type === 'plusOne') {
          context.commit('addBonus', bonus.type);         
        }
      }
      // Check bonuses if yellow
      if (payload.color === 'yellow') {
        const yellowBoxes = context.getters.yellowBoxes;
        
        // Horizontal
        const row = Math.floor(payload.index / 4);
        if (
          yellowBoxes[4 * row].value &&
          yellowBoxes[4 * row + 1].value &&
          yellowBoxes[4 * row + 2].value &&
          yellowBoxes[4 * row + 3].value
        ) {
          context.commit('addYellowBonus', { type: 'Horizontal', index: row });
        }

        // Vertical
        const col = payload.index % 4;
        if (
          yellowBoxes[col].value &&
          yellowBoxes[4 + col].value &&
          yellowBoxes[8 + col].value &&
          yellowBoxes[12 + col].value
        ) {
          context.commit('addYellowBonus', { type: 'Vertical', index: col });
        }

        // Diagonal
        if ([0, 5, 10, 15].indexOf(payload.index) > -1) {
          if (
            yellowBoxes[0].value &&
            yellowBoxes[5].value &&
            yellowBoxes[10].value &&
            yellowBoxes[15].value
          ) {
            context.commit('addYellowBonus', { type: 'Diagonal', index: 0 });
            context.commit('addBonus', 'plusOne'); 
          }
        }
      }
    },
    tickBonus(context, payload) {
      context.commit('tickBonus', payload);
    },
    tickRound(context, index) {
      context.commit('tickRound', index);
      if (index === 0 || index === 2) {
        context.commit('addBonus', 'reroll');
      } else if (index === 1) {
        context.commit('addBonus', 'plusOne');
      }
    }
  },
  getters: {
    rounds(state) {
      return state.rounds;
    },
    rerolls(state) {
      return state.rerolls;
    },
    plusOnes(state) {
      return state.plusOnes;
    },
    yellowBoxes(state) {
      return state.yellowBoxes;
    },
    yellowBoxesHorizontalBonuses(state) {
      return state.yellowBoxesHorizontalBonuses;
    },
    yellowBoxesVerticalBonuses(state) {
      return state.yellowBoxesVerticalBonuses;
    },
    yellowBoxesDiagonalBonuses(state) {
      return state.yellowBoxesDiagonalBonuses;
    },
    greenBoxes(state) {
      return state.greenBoxes;
    },
    redBoxes(state) {
      return state.redBoxes;
    },
    purpleBoxes(state) {
      return state.purpleBoxes;
    }
  }
})
