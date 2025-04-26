function confirmPayment() {
  const selected = document.getElementById("payment-method").value;

  // If no card selected, show error
  if (!selected) {
    alert("Please select a payment method before proceeding.");
    return;
  }

  // If "Add a new card" is selected, the redirect already happens in handlePaymentMethod()
  if (selected === "new") return;

  // Proceed with confirmation
  document.getElementById('billing-info').style.display = 'none';
  document.getElementById('confirmation-message').style.display = 'block';
}


function handlePaymentMethod() {
  const selected = document.getElementById("payment-method").value;
  if (selected === "new") {
    window.location.href = "payment.html";
  }
}

window.onload = () => {
  document.getElementById("payment-method").selectedIndex = 0;
};
