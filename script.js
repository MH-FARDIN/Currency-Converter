let base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
let dropSelect = document.querySelectorAll(".dropdown select")
let btn = document.querySelector("button")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let msg = document.querySelector(".msg")

// let img = document.querySelector("img")
// let img = element.parentElement.querySelector("img");

// for (code in countryList) {
//     console.log(code, countryList[code])
// }

for (select of dropSelect){
    for(currCode in countryList){
        let newOpt = document.createElement("option")
        newOpt.innerText = currCode
        newOpt.value = currCode
        // In this below code we don't have to write "selected" under newOpt.selected. instead we can define treu or just let the string empty. eg:newOpt.selected=" ". 
        if(select.name === "from" && currCode === "USD"){
            newOpt.selected = "Selected"
        } else if(select.name === "to" && currCode === "BDT"){
            newOpt.selected = "Selected"
        }
        select.append(newOpt)
    }
    select.addEventListener("change", (evt) => {
updateFlag(evt.target)
})

}
const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    // console.log(amtVal)
    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1"
    }
    // console.log(fromCurr, toCurr)
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`
    let responce = await fetch(URL)
    let data = await responce.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    if (rate === undefined) {
        throw new Error("Exchange rate not found");
    }
    // let rate1 = `"${rate}"`
    // console.log(toCurr.value.toLowerCase().value)
    console.log(rate)
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}
let updateFlag = (element)=>{
    let currCode = element.value
    let countryCode = countryList[currCode]
    let img = element.parentElement.querySelector("img");
    // let img = document.querySelector("img")
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    img.src = newSrc

// console.log(newSrc)
}

btn.addEventListener("click", (evt)=>{
evt.preventDefault();
updateExchangeRate();
})
window.addEventListener("load", ()=>{
    updateExchangeRate();
})


