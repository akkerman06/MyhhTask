<script lang="ts">
  export let currency: string;
  export let onChangeValue: (string: number) => void;
  export let onChangeCurrency: (string: string) => void;
  export let value: number = 0;
  export let item: string = "";
</script>

<div>
  <div class="switcher-currency">
    {#each ["RUB", "USD", "EUR", "KZT", "UAH"] as currencyItem}
      <button
        class="button {currency === currencyItem ? 'selected' : ''}"
        on:click={() => onChangeCurrency(currencyItem)}
      >
        {currencyItem}
      </button>
    {/each}
  </div>
  <div class="input_box">
    <input
      class="input {value && value.toString().length >= 9 ? 'small-text' : ''}"
      type="number"
      bind:value
      on:input={(e) => onChangeValue(e.target.value)}
    />
    <span class="currency-cost">{item}</span>
  </div>
</div>

<style>
  .button {
    border: #cdcdcd 2px solid;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: beige;
  }
  .button.selected {
    background-color: cadetblue;
  }
  .switcher-currency {
    display: flex;
    gap: 12px;
  }
  .currency-cost {
    color: gray;
  }
  .input_box {
    max-width: 260px;
    margin: 24px 0;
    padding: 30px 20px 15px;
    border: 1px solid #cdcdcd;
    border-radius: 3px;
  }
  .input {
    width: 100%;
    height: 46px;
    font-size: 44px;
    margin-bottom: 30px;
    outline: 0;
    border: none;
    border-radius: 4px;
    font-weight: 600;
  }
  .input.small-text {
    font-size: 36px;
  }
</style>
