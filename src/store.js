import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rounds: [],
    rerolls: [],
    plusOnes: [],
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
        if (bonus.type === 'reroll' || bonus.type === 'plusOne') {
          context.commit('addBonus', bonus.type);         
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
