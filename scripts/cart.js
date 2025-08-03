let cartProducts = getCurrentUser().cart
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");

function removeItem(index) {
	cartProducts.splice(index, 1);
	updateUserCart(cartProducts);
	renderCart();
}
 
function renderCart() {
	const cartTableBody = document.querySelector("#cart-table tbody");

	cartTableBody.innerHTML = "";
	let total = 0;

	cartProducts.forEach((product, index) => {
		total += product.price;

		const row = document.createElement("tr");
		row.innerHTML = `
			<td><span class="remove-btn" onclick="removeItem(${index})">X</span></td>
			<td><img src="${product.image}" alt="${product.title}" width="80" height="110"></td>
			<td>${product.title}</td>
			<td>$${product.price.toFixed(2)}</td>
			`;
		cartTableBody.appendChild(row);
	});

	totalItems.textContent = `Products: ${cartProducts.length}`;
	totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

renderCart();
updateCartCount();
document.getElementById("checkout-btn").addEventListener("click", () => {
  const user = getCurrentUser();
  if (!user || !user.cart || user.cart.length === 0) {
    alert("Your cart is empty. Add some products first.");
    return;
  }

  alert(`Thank you, ${user.userName}! Proceeding to checkout.`);

  user.cart = [];
  sessionStorage.setItem('currentUser', JSON.stringify(user));

  const users = getUsersData();
  const index = users.findIndex(u => u.userName === user.userName);
  if (index !== -1) {
    users[index].cart = [];
    parseUsersData(users);
  }

  
  location.reload();
});

