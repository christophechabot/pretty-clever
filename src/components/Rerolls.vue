<template>
  <div id="rerolls-row">
    <BadgeSquare
      :obj="rerollBadgeObj"
      :highlighted="false"/>
    <BonusTickBox
      v-for="(reroll, index) in rerolls"
      :key="index"
      :obj="reroll"
      @clicked="onClicked(index)"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BonusTickBox from '@/components/BonusTickBox';

import BadgeSquare from '@/components/svg/BadgeSquare';

export default {
  name: 'Rerolls',
  data() {
    return {
      rerollBadgeObj: {
        type: 'reroll',
        color: 'black'
      }
    };
  },
  components: {
    BonusTickBox,
    BadgeSquare
  },
  computed: {
    ...mapGetters(['rerolls']),
    tickableIndex: function() {
      return this.rerolls.findIndex(reroll => reroll.available && !reroll.value);
    }
  },
  methods: {
    onClicked: function(index) {
      if (index === this.tickableIndex) {
        this.$store.dispatch('tickBonus', {
          type: 'reroll',
          index,
          value: true
        });  
      }
    }
  }
};
</script>


<style lang="scss">
  @import '@/global.scss';

  #rerolls-row {
    background-color: $gray-light;
    padding: 16px 0;
    margin-bottom: 4px;
    .badge-square,
    .bonus-tick-box {
      display: inline-block;
      vertical-align: middle;
    }
    .badge-square {
      width: 46px;
      height: 46px;
      margin-right: 12px;
      .badge-square-content .reroll {
        width: 34px;
        height: 34px;
      }
    }
  }
</style>
