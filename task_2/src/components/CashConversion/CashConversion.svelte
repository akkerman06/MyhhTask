<script lang="ts">
  import { onMount } from "svelte";
  import Block from "./Block.svelte";

  let fromCurrency: string = "RUB";
  let toCurrency: string = "USD";
  let fromPrice: number = 0;
  let toPrice: number = 0;

  let rates: any = {};
  onMount(async () => {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/49e7a40dbb10903ad631779b/latest/USD"
    );
    const json = await response.json();
    rates = json.conversion_rates;
  });

  const onChangeFromPrice = (value: any) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    toPrice = Number(result.toFixed(3));
    fromPrice = value;
  };
  const onChangeToPrice = (value: any) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    fromPrice = Number(result.toFixed(3));
    toPrice = value;
  };

  let fromCurrencyChanged = fromCurrency;
  let toCurrencyChanged = toCurrency;

  $: if (fromCurrencyChanged !== fromCurrency) {
    onChangeFromPrice(fromPrice);
    fromCurrencyChanged = fromCurrency;
  }

  $: if (toCurrencyChanged !== toCurrency) {
    onChangeFromPrice(fromPrice);
    toCurrencyChanged = toCurrency;
  }

  function formatCurrencyRate(rate: number) {
    return rate % 1 === 0 ? rate.toFixed(0) : rate.toFixed(3);
  }
</script>

<div class="conversion">
  <h1>Конвератация валют</h1>
  <div class="conversion_blocks">
    <Block
      value={fromPrice}
      currency={fromCurrency}
      onChangeCurrency={(value) => (fromCurrency = value)}
      onChangeValue={onChangeFromPrice}
      item={`1 ${fromCurrency} = ${formatCurrencyRate((1 / rates[fromCurrency]) * rates[toCurrency])} ${toCurrency}`}
    />
    <Block
      value={toPrice}
      currency={toCurrency}
      onChangeCurrency={(value) => (toCurrency = value)}
      onChangeValue={onChangeToPrice}
      item={`1 ${toCurrency} = ${formatCurrencyRate((1 / rates[toCurrency]) * rates[fromCurrency])} ${fromCurrency}`}
    />
  </div>
</div>

<style module>
  .conversion {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
  .conversion_blocks {
    display: flex;
    gap: 50px;
  }
</style>
