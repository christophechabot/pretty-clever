<template>
  <div id="plusones-row">
    <BadgeSquare
      :obj="plusOneBadgeObj"
      :highlighted="false"/>
    <BonusTickBox
      v-for="(plusOne, index) in plusOnes"
      :key="index"
      :obj="plusOne"
      @clicked="onClicked(index)"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BonusTickBox from '@/components/BonusTickBox';

import BadgeSquare from '@/components/svg/BadgeSquare';

export default {
  name: 'PlusOnes',
  data() {
    return {
      plusOneBadgeObj: {
        type: 'plusOne',
        color: 'black'
      }
    };
  },
  components: {
    BonusTickBox,
    BadgeSquare
  },
  computed: {
    ...mapGetters(['plusOnes']),
    tickableIndex: function() {
      return this.plusOnes.findIndex(plusOne => plusOne.available && !plusOne.value);
    }
  },
  methods: {
    onClicked: function(index) {
      if (index === this.tickableIndex) {
        this.$store.dispatch('tickBonus', {
          type: 'plusOne',
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

  #plusones-row {
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
      .badge-square-content span {
        font-size: 32px;
      }
    }
  }
</style>
