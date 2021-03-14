
const info = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";


fetch(info).then((res) => res.json()).then(handleResponse);

function handleResponse(list) {

  //Variables
  let items = 0;
  let contentCarrito = [];
  let totalCarrito = 0;

  //Indicar items en carrito
  const divCarrito = document.getElementById("divCarrito");
  const pCarrito = document.createElement("p");
  pCarrito.setAttribute("id", "etItems");
  const textCarrito = document.createTextNode(items + " items");
  pCarrito.appendChild(textCarrito);
  divCarrito.appendChild(pCarrito);

  //Crear NAV con nombres de categorias
  list.forEach((element) => {

    const nav = document.getElementById("listCat");
    const navitem = document.createElement("li");
    navitem.setAttribute("class", "nav-item");
    const navlink = document.createElement("a");
    navlink.setAttribute("class", "nav-link");
    navlink.setAttribute("href", "#");
    const text1 = document.createTextNode(element.name);
    navlink.appendChild(text1);
    navitem.appendChild(navlink);
    nav.appendChild(navitem);
  });

  //Crear main section por defecto
  createMainProducts(list[0].name, list[0].products);

  //Cambia el main cuando se hace click en tab de nav
  document.querySelectorAll(".nav-link").forEach(item => {
    item.addEventListener("click", (element) => {
      
      const tit = document.getElementById("cat_tit");
      tit.innerText = element.target.text;

      let listCat = list.filter(det => det.name === element.target.text);
      let listaProducts = listCat[0].products;

      const divProds = document.getElementById("divProductos");

      while (divProds.hasChildNodes()) {
        divProds.removeChild(divProds.firstChild);
      }
      //divProds.innerHTML = "";
      listaProducts.forEach((product) => {
        createCard(product.image, product.name, product.description, product.price);
      });

    });
  });

  //Agrega a carrito cuando hace click en "add to cart"
  document.body.addEventListener("click", function(element) {

    if (element.target.getAttribute("class") == "btn btn-primary") {
      const productName = element.target.parentNode.childNodes[0].innerHTML;
      const productPrice = element.target.parentNode.childNodes[2].innerHTML.replace("$ ", "");

      items = items + 1;
      totalCarrito = totalCarrito + parseFloat(productPrice);
  
      const busqueda = contentCarrito.find( el => el.description === productName );

      if(busqueda === undefined) {
        const newProd = {
          "items": contentCarrito.length + 1,
          "quantity": 1,
          "description": productName,
          "unitPrice": productPrice
        };
        contentCarrito.push(newProd);
      } else{
        for (let i in contentCarrito) {
          if (contentCarrito[i].description == productName) {
            contentCarrito[i].quantity = parseInt(contentCarrito[i].quantity) + 1;
            break; 
          }
        }
      }
      //console.log(items + " " + totalCarrito);
      //console.log(contentCarrito);

      const etItems = document.getElementById("etItems");
      etItems.innerText = items + " items";
    }
  });

  
  //Cambia el main cuando se hace click en carrito de compras
  document.getElementById("carrito").addEventListener("click", function() {

    //Titulo
    const tit = document.getElementById("cat_tit");
    tit.innerText = "Order Detail";

    const divProductos = document.getElementById("divProductos");
    //divProductos.innerHTML = "";
    while (divProductos.hasChildNodes()) {
      divProductos.removeChild(divProductos.firstChild);
    }

    //Table
    const divTable = document.createElement("div");
    divTable.setAttribute("id", "orderTable");

    const table = document.createElement("table");
    table.setAttribute("class", "table table-striped");
    const thead = document.createElement("thead");
    const trH = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.setAttribute("scope", "col");
    const txh1 = document.createTextNode("Item");
    th1.appendChild(txh1);
    const th2 = document.createElement("th");
    th2.setAttribute("scope", "col");
    const txh2 = document.createTextNode("Qty.");
    th2.appendChild(txh2);
    const th3 = document.createElement("th");
    th3.setAttribute("scope", "col");
    const txh3 = document.createTextNode("Description");
    th3.appendChild(txh3);
    const th4 = document.createElement("th");
    th4.setAttribute("scope", "col");
    const txh4 = document.createTextNode("Unit Price");
    th4.appendChild(txh4);
    const th5 = document.createElement("th");
    th5.setAttribute("scope", "col");
    const txh5 = document.createTextNode("Amount");
    th5.appendChild(txh5);
    const th6 = document.createElement("th");
    th6.setAttribute("scope", "col");
    const txh6 = document.createTextNode("Modify");
    th6.appendChild(txh6);

    trH.appendChild(th1);   
    trH.appendChild(th2);  
    trH.appendChild(th3);  
    trH.appendChild(th4);  
    trH.appendChild(th5);  
    trH.appendChild(th6);   
    thead.appendChild(trH);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    
    contentCarrito.forEach((product) => {
      
      const tr = document.createElement("tr");

      const thIt = document.createElement("th");
      thIt.setAttribute("scope", "row");
      const x1 = document.createTextNode(product.items);
      thIt.appendChild(x1);
      const td1 = document.createElement("td");
      const x2 = document.createTextNode(product.quantity);
      td1.appendChild(x2);
      const td2 = document.createElement("td");
      const x3 = document.createTextNode(product.description);
      td2.appendChild(x3);
      const td3 = document.createElement("td");
      const x4 = document.createTextNode(product.unitPrice);
      td3.appendChild(x4);
      const td4 = document.createElement("td");
      const x5 = document.createTextNode(product.unitPrice * product.quantity);
      td4.appendChild(x5);
      const td5 = document.createElement("td");
      const x6 = document.createElement("div");
      x6.setAttribute("class", "row");
      const bt1 = document.createElement("button");
      bt1.setAttribute("type", "button");
      bt1.setAttribute("class", "btn btnTable plus");
      const tb1 = document.createTextNode("+");
      bt1.appendChild(tb1);
      const bt2 = document.createElement("button");
      bt2.setAttribute("type", "button");
      bt2.setAttribute("class", "btn btnTable minus");
      const tb2 = document.createTextNode("-");
      bt2.appendChild(tb2);
      x6.appendChild(bt1);
      x6.appendChild(bt2);

      td5.appendChild(x6);

      tr.appendChild(thIt);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      tbody.appendChild(tr);

    });

    table.appendChild(tbody);

    divTable.appendChild(table);
    divProductos.appendChild(divTable);

    //Total
    const divTotal = document.createElement("div");
    divTotal.setAttribute("id", "orderTotal");
    divTotal.setAttribute("class", "row");

    const divIzq = document.createElement("div");
    divIzq.setAttribute("class", "total-izq");
    const valorTotal = document.createElement("p");
    valorTotal.setAttribute("id", "valorTotal");
    const vt = document.createTextNode("Total: $" + totalCarrito.toFixed(2));
    valorTotal.appendChild(vt);
    divIzq.appendChild(valorTotal);

    const divDer = document.createElement("div");
    divDer.setAttribute("class", "row total-der");
    const bu1 = document.createElement("button");
    bu1.setAttribute("type", "button");
    bu1.setAttribute("class", "btn btnCancel");
    const cancel = document.createTextNode("Cancel");
    bu1.appendChild(cancel);
    const bu2 = document.createElement("button");
    bu2.setAttribute("type", "button");
    bu2.setAttribute("class", "btn btnConfirm");
    const confirm = document.createTextNode("Confirm order");
    bu2.appendChild(confirm);
    divDer.appendChild(bu1);
    divDer.appendChild(bu2);


    divTotal.appendChild(divIzq);
    divTotal.appendChild(divDer);

    divProductos.appendChild(divTotal);

  });

  //Agrega a carrito cuando hace click +
  document.body.addEventListener("click", function(element) {
    if (element.target.getAttribute("class") == "btn btnTable plus") {

      const productName = element.target.parentNode.parentNode.parentNode.childNodes[2].innerHTML;
      //console.log(productName);

      for (let i in contentCarrito) {
        if (contentCarrito[i].description == productName) {
          contentCarrito[i].quantity = parseInt(contentCarrito[i].quantity) + 1;
          items = items + 1;
          totalCarrito = totalCarrito + parseFloat(contentCarrito[i].unitPrice);
          break; 
        }
      }

      document.getElementById("carrito").click(); 
      const etItems = document.getElementById("etItems");
      etItems.innerText = items + " items";
    }
  });

  //Agrega a carrito cuando hace click -
  document.body.addEventListener("click", function(element) {
    if (element.target.getAttribute("class") == "btn btnTable minus") {

      const productName = element.target.parentNode.parentNode.parentNode.childNodes[2].innerHTML;
      //console.log(productName);
      //console.log(contentCarrito);

      for (let i in contentCarrito) {
        if (contentCarrito[i].description == productName) {
          totalCarrito = totalCarrito - parseFloat(contentCarrito[i].unitPrice);

          if(contentCarrito[i].quantity == 1) {
            contentCarrito.splice(i, 1);
            items = items - 1;
          } else {
            contentCarrito[i].quantity = parseInt(contentCarrito[i].quantity) - 1;
            items = items - 1;
          }
          break;
        }
      }

      for (let i in contentCarrito) {
        contentCarrito[i].items = parseInt(i) + 1;
      }

      document.getElementById("carrito").click(); 
      const etItems = document.getElementById("etItems");
      etItems.innerText = items + " items";
    }
  });

  //Confirmar orden
  document.body.addEventListener("click", function(element) {
    if (element.target.getAttribute("class") == "btn btnConfirm") {

      console.log("Listado de productos ordenado:");
      console.log(contentCarrito);
      contentCarrito = [];
      items = 0;
      totalCarrito = 0;

      document.getElementById("carrito").click(); 
    }

    const etItems = document.getElementById("etItems");
    etItems.innerText = items + " items";
  });

  //Cancelar orden - boton Cancel
  document.body.addEventListener("click", function(element) {
    if (element.target.getAttribute("class") == "btn btnCancel") {

      //crearModal();
      const modal = document.getElementById("modal");
      modal.style.display = "block";
    }
  });

  //Modal Cancelar
  document.body.addEventListener("click", function(element) {
    if (element.target.getAttribute("class") == "btn btn-secondary modalBeige") {

      contentCarrito = [];
      items = 0;
      totalCarrito = 0;
      
      modal.style.display = "none";
      document.getElementById("carrito").click(); 
    }
  });

  //Modal No Cancelar
  document.body.addEventListener("click", function(element) {
    if (element.target.getAttribute("class") == "btn btn-secondary modalRojo") {

      modal.style.display = "none";
    }
  });

  //Modal x
  document.body.addEventListener("click", function(element) {
    if (element.target.getAttribute("id") == "btCerrar") {

      modal.style.display = "none";
    }
  });

  

}

//Funcion para crear main section de productos
function createMainProducts(name, list) {

  const title = document.getElementById("cat_name");

  const h2 = document.createElement("h2");
  h2.setAttribute("id", "cat_tit");
  const txt = document.createTextNode(name);
  h2.appendChild(txt);
  title.appendChild(h2);

  list.forEach((product) => {
    createCard(product.image, product.name, product.description, product.price);
  });
}

//Funcion para crear una card de productos
function createCard(image, name, description, price) {

  
  const divProductos = document.getElementById("divProductos");
  const divCard = document.createElement("div");
  divCard.setAttribute("class", "card");

  const img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", image);
  img.setAttribute("alt", name);
  divCard.appendChild(img);

  const divBody = document.createElement("div");
  divBody.setAttribute("class", "card-body");
  const h5c = document.createElement("h5");
  h5c.setAttribute("class", "card-title");
  const t5 = document.createTextNode(name);
  h5c.appendChild(t5);
  divBody.appendChild(h5c);
  const pd = document.createElement("p");
  pd.setAttribute("class", "card-text des");
  const tdes = document.createTextNode(description);
  pd.appendChild(tdes);
  divBody.appendChild(pd);
  const pp = document.createElement("p");
  pp.setAttribute("class", "card-text pre");
  const tpre = document.createTextNode("$ " + price);
  pp.appendChild(tpre);
  divBody.appendChild(pp);
  const but = document.createElement("a");
  but.setAttribute("class", "btn btn-primary");
  but.setAttribute("type", "button");
  const tbut = document.createTextNode("Add to cart");
  but.appendChild(tbut);
  divBody.appendChild(but);

  divCard.appendChild(divBody);

  divProductos.appendChild(divCard);

}

