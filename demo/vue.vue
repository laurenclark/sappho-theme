<template>
  <div>
    <h1>Bitcoin Price Index</h1>
    <div v-for="currency in info" class="currency">
      {{ currency.description }}:
      <span class="lighten">
        <span v-html="currency.symbol"></span>
        {{ currency.rate_float | currencydecimal }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: null,
      loading: true,
      errored: false
    };
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    }
  },
  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => {
        this.info = response.data.bpi;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

<style lang="sass" scoped>
#myId {
  background-image: none;
}

.myclass {
  color: #7a1e92;
}

.dropdown {
  opacity: 0;
  position: absolute;
  overflow: hidden;
  padding: 20px;
  top: -20px;
  border-radius: 2px;
  transition: all 0.5s;
  transform: translateY(100px);
  will-change: opacity;
  display: none;
  &__background {
    width: 100px;
    height: 100px;
    position: absolute;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
      0 15px 35px rgba(86, 86, 238, 0.15), 0 5px 15px rgba(31, 182, 56, 0.842);
    transition: all 0.3s, opacity 0.1s, transform 0.2s;
    transform-origin: 50% 0;
    display: flex;
    justify-content: center;
    opacity: 0;
  }
  &--color {
    color: red;
  }
}
</style>
