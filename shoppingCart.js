let productItem = [
    new Product(1, "Apple Magic Keyboard", "371", "img1.jpg"),
    new Product(2, "Apple AirPods 2", "136", "img2.jpg"),
    new Product(3, "Canon EOS 2000D DSLR", "433", "img3.jpg"),
    new Product(4, "Lenovo Yoga TAB 11 YT-J706F", "416", "img4.jpg"),
    new Product(5, "Logitech G432 7.1 Surround Sound", "43", "img5.jpg"),
    new Product(6, "Canon EOS R10", "1463", "img6.jpg"),
    new Product(7, `Apple iPad Pro 2022 11" 128GB`, "1115", "img7.jpg"),
    new Product(8, "Lenovo Tab P12 TB370 Keyboard", "108", "img8.jpg"),
];

showProductGallery(productItem);
showCartTable();

function Product(id, name, price, photo) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.photo = photo;
}

// Add to Cart Button Event Listener
function addToCart(element) {
    let productParent = element.closest("div.product-item");
    let id = productParent.querySelector(".productid").value;
    let price = productParent.querySelector(".price span").innerText;
    let name = productParent.querySelector(".productname").innerText;
    let quantity = productParent.querySelector(".product-quantity").value;

    let cartItem = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
    };

    let cartArray = new Array();
    
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem("shopping-cart")) {
        cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
        const itemIndex = cartArray.findIndex((item) => item.id === id);
        
        if (itemIndex !== -1) {
            cartArray[itemIndex].quantity =
                Number(cartArray[itemIndex].quantity) + Number(quantity);
        } else {
            cartArray.push(cartItem);
        }
    } else {
        cartArray.push(cartItem);
    }
    let cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem("shopping-cart", cartJSON);
    showCartTable();
}

// Remove An Item To The Shopping Cart Table And Update The Total Price
function removeFromCart(element) {
    let productParent = element.closest("div.product-item");
    let id = productParent.querySelector(".productid").value;
    let quantity = productParent.querySelector(".product-quantity").value;

    let cartArray = new Array();
    // If javascript shopping cart session is not empty
    if (sessionStorage.getItem("shopping-cart")) {
        cartArray = JSON.parse(sessionStorage.getItem("shopping-cart"));
        
        const itemIndex = cartArray.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
            cartArray[itemIndex].quantity = Math.max(
                Number(cartArray[itemIndex].quantity) - Number(quantity), 0
            );

            // If the index is 0, remove the product from the list
            if (!cartArray[itemIndex].quantity) {
                cartArray = cartArray.filter(
                    (value, index) => index !== itemIndex
                );
            }
        } else {
            alert("This item is not in your cart");
        }
    }
    let cartJSON = JSON.stringify(cartArray);
    sessionStorage.setItem("shopping-cart", cartJSON);
    showCartTable();
}

// Empty The Cart
function emptyCart() {
    if (sessionStorage.getItem("shopping-cart")) {
        sessionStorage.removeItem("shopping-cart");
        showCartTable();
    }
}

// Show Cart Table And Update The Total Price 
function showCartTable() {
    let cartRowHTML = "";
    let itemCount = 0;
    let grandTotal = 0;

    let price = 0;
    let quantity = 0;
    let subTotal = 0;

    if (sessionStorage.getItem("shopping-cart")) {
        let shoppingCart = JSON.parse(sessionStorage.getItem("shopping-cart"));

        // Iterate javascript shopping cart array
        shoppingCart.forEach(function (item) {
            price = parseFloat(item.price);
            quantity = parseInt(item.quantity);
            subTotal = price * quantity;
            itemCount += quantity;

            cartRowHTML +=
                "<tr>" +
                    "<td>" + item.name + "</td>" +
                    "<td class='text-right'>$" + price.toFixed(2) + "</td>" +
                    "<td class='text-right'>" + quantity + "</td>" +
                    "<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
                "</tr>";
            grandTotal += subTotal;
        });
    }
    document.querySelector("#cartTableBody").innerHTML = cartRowHTML;
    document.querySelector("#itemCount").innerText = itemCount;
    document.querySelector("#totalAmount").innerText = "$" + grandTotal.toFixed(2);
}
    
// Show Product Gallery Function
function showProductGallery(product) {
    //Iterate javascript shopping cart array
    let productHTML = "";
    
    product.forEach(function (item) {
        productHTML +=
            '<div class="product-item">' +
                '<label><input class="productid" type="hidden" value="' + item.id + '"></label>' +
                
                '<div class="image">' +
                    '<img src="./product-images/' + item.photo + '" alt="photo image">' +
                '</div>' +

                '<div class="productname">' + item.name + "</div>" +
                '<div class="price">$<span>' + item.price + "</span></div>" +

                '<div class="cart-action">' +
                    '<input aria-label="Quantity" type="number" class="product-quantity" name="quantity" value="1" size="2" min="1" />' +
                    '<input aria-label="Add" type="submit" value="Add" class="add-to-cart" onClick="addToCart(this)" />' +
                    '<input aria-label="Remove" type="submit" value="Remove" class="remove-from-cart" onClick="removeFromCart(this)" />' +
                "</div>" +
            "</div>";
        ("<tr>");
    });
    document.querySelector("#product-item-container").innerHTML = productHTML;
}
