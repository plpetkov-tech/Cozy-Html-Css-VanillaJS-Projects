const currencyElement1 = document.getElementById("currency-1");
const currencyElement2 = document.getElementById("currency-2");
const amount = document.getElementById("amount-one");
const amount2 = document.getElementById("amount-two");
const rateElement = document.getElementById('rate');
const swap = document.getElementById("swap");

// Fetch exchange rate and update DOM
function calculate(){
    const currency_one = currencyElement1.value;
    const currency_two = currencyElement2.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res=> res.json())
    .then(data=> {
        const rate = data.rates[currency_two];
        console.log(rate)
        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amount2.value = (amount.value*rate).toFixed(2);
    });
}

// Event listeners
currencyElement1.addEventListener('change', calculate);
amount.addEventListener('input', calculate);
currencyElement2.addEventListener('change', calculate);
amount2.addEventListener('input', calculate);

swap.addEventListener('click', ()=>{
    const tmp = currencyElement1.value;
    currencyElement1.value = currencyElement2.value;
    currencyElement2.value = tmp;
    calculate();
})

calculate();