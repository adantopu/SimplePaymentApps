

//let amount = depositInputAmount;
//let timestamp = new Date().toUTCString();

// get input value
function getInputValue(inputValueId){
    const inputValue = document.getElementById(inputValueId);
    const valueId = inputValue.value;
    const amountId = parseFloat(valueId);
    inputValue.value = ' ';
    return amountId;
};

// get update text at amount area
function updateInputAreaText(textAreaId,amountId){
    const amountInput = document.getElementById(textAreaId);
    const amountText = amountInput.innerText;
    const finalAmount = parseFloat(amountText);
    amountInput.innerText = finalAmount + amountId;
}

// update balance 
function updateBalance(amountId, isAdd){
    const totalBalance = document.getElementById('balance_text');
    const totalBalanceText = totalBalance.innerText;
    const totalBalanceAmount = parseFloat(totalBalanceText);
    if (isAdd){
        totalBalance.innerText = totalBalanceAmount + amountId;
    }else{
        totalBalance.innerText = totalBalanceAmount - amountId;
    }
}

// get deposit and update total deposit
document.getElementById('deposit_button').addEventListener('click', function(){
    const depositInputAmount = getInputValue('deposit_input');
    if (depositInputAmount > 0){
        updateInputAreaText('deposit_text',depositInputAmount)
        //update balance with deposit input
        updateBalance(depositInputAmount, true);
    };


    let depositInputAmountDec = parseFloat(depositInputAmount).toFixed(2)
    console.log(depositInputAmountDec);//for testing purpose

    //process POST deposit data 
    fetch('http://localhost:3000/payment/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"deposit_amount":depositInputAmountDec})
    });
});

// get withdraw and update total withdraw
document.getElementById('withdraw_button').addEventListener('click', function(){
    const withdrawalInputAmount = getInputValue('withdraw_input');
    //get current balance
    const totalBalance = document.getElementById('balance_text');
    const totalBalanceText = totalBalance.innerText;
    const totalBalanceAmount = parseFloat(totalBalanceText);
    if(withdrawalInputAmount > 0 && withdrawalInputAmount < totalBalanceAmount){
        updateInputAreaText('withdraw_text',withdrawalInputAmount)
        //update balance with withdraw input total
        updateBalance(withdrawalInputAmount, false)
    };

    let withdrawalInputAmountDec = parseFloat(withdrawalInputAmount).toFixed(2)
    //console.log(withdrawalInputAmountDec);//for testing purpose

    //process POST withdraw data 
    fetch('http://localhost:3000/payment/withdraw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"withdraw_amount":withdrawalInputAmountDec})
    });

    if(withdrawalInputAmount > totalBalanceAmount){
        alert("Sorry! You can't withdraw more than your balance amount. Please enter a less amount than your balance amount.");
    };
});