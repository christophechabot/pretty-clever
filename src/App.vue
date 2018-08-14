<template>
  <div id="app">
    <div id="controls">
      <div id="left-controls">
        <svg
          class="reset-button"
          viewBox="0 0 286.052 286.052"
          @click="onReset">
          <path style="fill:currentColor;" d="M78.493,143.181H62.832v-0.125c0-43.623,34.809-80.328,79.201-80.122
            c21.642,0.098,41.523,8.841,55.691,23.135l25.843-24.931c-20.864-21.043-49.693-34.049-81.534-34.049
            c-63.629,0-115.208,51.955-115.298,116.075h-15.84c-9.708,0-13.677,6.49-8.823,14.437l33.799,33.504
            c6.704,6.704,10.736,6.91,17.646,0l33.799-33.504C92.17,149.662,88.192,143.181,78.493,143.181z M283.978,129.236l-33.799-33.433
            c-6.892-6.892-11.156-6.481-17.637,0l-33.799,33.433c-4.854,7.929-0.894,14.419,8.814,14.419h15.635
            c-0.25,43.337-34.943,79.72-79.183,79.514c-21.633-0.089-41.505-8.814-55.691-23.099l-25.843,24.896
            c20.873,21.007,49.702,33.996,81.534,33.996c63.432,0,114.869-51.579,115.28-115.298h15.867
            C284.872,143.655,288.832,137.156,283.978,129.236z"/>
        </svg>
      </div>
      <div id="right-controls">
        <svg
          :class="{ 'undo-button': true, disabled: !canUndo }"
          @click="undo"
          viewBox="0 0 25.64 25.64">
          <path style="fill:currentColor;" d="M10.385,1.499C10.096,1.378,9.76,1.446,9.537,1.667L0.228,8.98c-0.304,0.302-0.304,0.797,0,1.1
            l9.309,7.278c0.148,0.15,0.348,0.229,0.549,0.229c0.102,0,0.203-0.021,0.299-0.059c0.291-0.121,0.465-0.404,0.465-0.719V12.45
            c9.955,0,14.309,2.808,13.646,11.751C28.713,9.893,20.619,6.659,10.85,6.659V2.217C10.849,1.902,10.676,1.619,10.385,1.499z"/>
        </svg>

        <svg
          :class="{ 'redo-button': true, disabled: !canRedo }"
          @click="redo"
          viewBox="0 0 25.64 25.64">
          <path style="fill:currentColor;" d="M10.385,1.499C10.096,1.378,9.76,1.446,9.537,1.667L0.228,8.98c-0.304,0.302-0.304,0.797,0,1.1
            l9.309,7.278c0.148,0.15,0.348,0.229,0.549,0.229c0.102,0,0.203-0.021,0.299-0.059c0.291-0.121,0.465-0.404,0.465-0.719V12.45
            c9.955,0,14.309,2.808,13.646,11.751C28.713,9.893,20.619,6.659,10.85,6.659V2.217C10.849,1.902,10.676,1.619,10.385,1.499z"/>
        </svg>
      </div>
    </div>
    <Rounds/>
    <Rerolls/>
    <PlusOnes/>
    <YellowBlock/>
    <GreenBlock/>
    <RedBlock/>
    <PurpleBlock/>
  </div>
</template>

<script>
import Rounds from '@/components/Rounds';
import Rerolls from '@/components/Rerolls';
import PlusOnes from '@/components/PlusOnes';

import YellowBlock from '@/components/YellowBlock';
import GreenBlock from '@/components/GreenBlock';
import RedBlock from '@/components/RedBlock';
import PurpleBlock from '@/components/PurpleBlock';

const resizeElt = (elt) => {
  const widthRatio = window.innerWidth / elt.clientWidth;
  const heightRatio = window.innerHeight / elt.clientHeight;
  const ratio = Math.min(widthRatio, heightRatio);
  elt.style.transform = `translate(-50%, -50%) scale(${ratio})`;
};

export default {
  name: 'app',
  components: {
    Rounds,
    Rerolls,
    PlusOnes,
    YellowBlock,
    GreenBlock,
    RedBlock,
    PurpleBlock
  },
  methods: {
    onReset() {
      this.$store.dispatch('resetSheet');
    }
  },
  mounted() {
    this.$nextTick(() => {
      resizeElt(this.$el);
    });
    window.addEventListener('resize', () => {
      resizeElt(this.$el);
    });
  }
}
</script>

<style lang="scss">
  @import '@/global.scss';
  @import '@/color-classes.scss';

  // @import url('https://fonts.googleapis.com/css?family=Sriracha');

  body {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    // font-family: 'Sriracha', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: 50% 50%;
    display: inline-block;
    width: 724px;
    font-size: 0;
    #controls {
      padding: 8px;
      text-align: left;
      #left-controls {
        display: inline-block;
      }
      #right-controls {
        float: right;
      }
      .reset-button {
        display: inline-block;
        width: 60px;
        height: 60px;
        padding: 8px 0;
        color: $gray-dark;
        cursor: pointer;
      }
      .undo-button, .redo-button {
        display: inline-block;
        width: 60px;
        height: 60px;
        padding: 8px 8px 8px 0;
        color: $gray-dark;
        cursor: pointer;
        &.disabled {
          color: $gray-light;
          cursor: auto;
          pointer-events: none;
        }
      }
      .redo-button {
        transform: scale(-1, 1);
      }
    }
    #sheet {
      display: inline-block;
      vertical-align: top;
      box-sizing: border-box;
      background-color: $gray-light;
      color: #2c3e50;
      padding: 32px;
      width: 904px;
      > div {
        width: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
