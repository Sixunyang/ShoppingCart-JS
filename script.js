//The difficulty is that trs added dynamically cannot be bound.

window.onload = function () {
  //1. Create a database and put all products information into it.
  const data = {
    data1: { pname: "Xiaomi 12", price: 649, img: "./image/xiaomi12.webp" },
    data2: { pname: "Redmi note 11", price: 525, img: "./image/Redmi note 11.webp" },
    data3: { pname: "Xiaomi 11", price: 533, img: "./image/Redmi 11.webp" },
    data4: { pname: "Xiaomi 10C", price: 499, img: "./image/Redmi 10C.webp" },
  };
  /*  console.log(data) */

  //2. click buy, then judge, if there is one below, it will click increase; if not, it will generate a new tr
  const buys = document.querySelectorAll(".buy");
  const table = document.querySelector("table");
  const tbody = table.children[1];
  const temp = document.querySelector("#temp");
  let del = document.querySelector(".del");
  let bigCheck = document.querySelector(".bigCheck");
  let total = document.querySelector(".total-amount");
  let increase2 = document.querySelector(".increase2");
  let decrease2 = document.querySelector(".decrease2");

  /* console.log(trs); */
  for (let i = 0; i < 4; i++) {
    buys[i].addEventListener("click", function () {
      let trs = tbody.querySelectorAll("tr");
      /*  console.log(this.getAttribute('data-number')); */
      /*  console.log(trs.length); */
      /*   console.log(this.getAttribute('data-number')); */
      let isExist = false;
      let index = 0;

      for (let i = 0; i < trs.length; i++) {
        if (
          trs[i].getAttribute("data-number") == this.getAttribute("data-number")
        ) {
          isExist = true;
          index = i;
        }
      }
      if (isExist) {
        trs[index].querySelector(".increase2").click();
      } else {
        const newTr = document.createElement("tr");
        newTr.innerHTML = temp.innerHTML;
        const price1 = newTr.querySelector(".price1");
        price1.innerHTML = "$" + data[this.getAttribute("data-number")].price;
        const price2 = newTr.querySelector(".price2");
        price2.innerHTML = "$" + data[this.getAttribute("data-number")].price;
        const pname = newTr.querySelector(".smallpic-info");
        pname.innerHTML = data[this.getAttribute("data-number")].pname;
        const img = newTr.querySelector("img");
        img.src = data[this.getAttribute("data-number")].img;
        const newone = this.getAttribute("data-number");
        newTr.setAttribute("data-number", newone);

        /* newTr.getAttribute('data-number') = this.getAttribute('data-number') */
        /*  newTr = newTr.replace(/{price}/g, '123') */
        /*  console.log(newTr)
                 console.log(price) */
        tbody.appendChild(newTr);
       
        //6. Click delete to delete tr. //7. Click plus to increase the number
        let dels = document.querySelectorAll(".del");
        let increase2 = document.querySelectorAll(".increase2");
        let decrease2 = document.querySelectorAll(".decrease2");

        for (let i = 0; i < dels.length; i++) {
          dels[i].addEventListener("click", function () {
            this.parentNode.parentNode.remove();
            calTotal();
          });
          /* increase2[i].addEventListener("click", function () {
            let num = this.parentNode.previousElementSibling.children[0].value;

            num++;
            this.parentNode.previousElementSibling.children[0].value = num;
            const pri1 =
              this.parentNode.parentNode.parentNode.previousElementSibling.innerHTML.substr(
                1
              );

            this.parentNode.parentNode.parentNode.nextElementSibling.innerHTML =
              "$" + pri1 * num;
            calTotal();
          }); */
          // understand the difference between eventlistener and declare ??????
          increase2[i].onclick = function () {
            let num = this.parentNode.previousElementSibling.children[0].value;

            num++;
            this.parentNode.previousElementSibling.children[0].value = num;
            const pri1 =
              this.parentNode.parentNode.parentNode.previousElementSibling.innerHTML.substr(
                1
              );

            this.parentNode.parentNode.parentNode.nextElementSibling.innerHTML =
              "$" + pri1 * num;
            calTotal();
          };
          decrease2[i].onclick = function () {
            let num = this.parentNode.nextElementSibling.children[0].value;

            num--;

            if (num == 0) {
              this.parentNode.parentNode.parentNode.parentNode.remove();
              calTotal();
            } else {
              this.parentNode.nextElementSibling.children[0].value = num;
              const pri1 =
                this.parentNode.parentNode.parentNode.previousElementSibling.innerHTML.substr(
                  1
                );

              this.parentNode.parentNode.parentNode.nextElementSibling.innerHTML =
                "$" + pri1 * num;
              calTotal();
            }
          };
        }

        calTotal();
      }
      trs = tbody.querySelectorAll("tr");
      let temp3 = null;
      bigCheck.onclick = function () {
        for (let i = 0; i < trs.length; i++) {
          trs[i].querySelector(".small-tab").checked = this.checked;
        }
        if (!this.checked) {
          temp3 = total.innerHTML;

          total.innerHTML = "$" + 0;
        } else {
          total.innerHTML = temp3;
        }
      };
      let temp2 = null;
      for (let i = 0; i < trs.length; i++) {
        trs[i].querySelector(".small-tab").onclick = function () {
          if (!trs[i].querySelector(".small-tab").checked) {
            temp2 = trs[i].querySelector(".price2").innerHTML;
            trs[i].querySelector(".price2").innerHTML = "$" + 0;
          } else {
            trs[i].querySelector(".price2").innerHTML = temp2;
          }
          calTotal();

          let flag = true;
          for (let i = 0; i < trs.length; i++) {
            if (!trs[i].querySelector(".small-tab").checked) {
              flag = false;
            }
          }

          bigCheck.checked = flag;
        };
      }
    });
  }
  
  //3. Click who gets who's data and pass it to the corresponding tr
  //4. There is a problem, when the previous click event is in the loop, the newly added tr cannot be in the loop: then create tr when clicking
  //5. Shopping cart total part
 

  function calTotal() {
    const price2 = tbody.querySelectorAll(".price2");
    let sum = 0;
    for (let i = 0; i < price2.length; i++) {
      sum = sum + parseInt(price2[i].innerText.substr(1));
    }

    total.innerHTML = "Total: $" + sum;
  }

 //The last step: in order to get the method for the tr at the beginning
  del.addEventListener("click", function () {
    this.parentNode.parentNode.remove();
    calTotal();
  });
  increase2.onclick = function () {
    let num = this.parentNode.previousElementSibling.children[0].value;

    num++;
    this.parentNode.previousElementSibling.children[0].value = num;
    const pri1 =
      this.parentNode.parentNode.parentNode.previousElementSibling.innerHTML.substr(
        1
      );

    this.parentNode.parentNode.parentNode.nextElementSibling.innerHTML =
      "$" + pri1 * num;
    calTotal();
  };
  decrease2.onclick = function () {
    let num = this.parentNode.nextElementSibling.children[0].value;

    num--;

    if (num == 0) {
      this.parentNode.parentNode.parentNode.parentNode.remove();
      calTotal();
    } else {
      this.parentNode.nextElementSibling.children[0].value = num;
      const pri1 =
        this.parentNode.parentNode.parentNode.previousElementSibling.innerHTML.substr(
          1
        );

      this.parentNode.parentNode.parentNode.nextElementSibling.innerHTML =
        "$" + pri1 * num;
      calTotal();
    }
  };

  let trs = tbody.querySelector("tr");
  let temp3 = null;
  bigCheck.onclick = function () {
    trs.querySelector(".small-tab").checked = this.checked;

    if (!this.checked) {
      temp3 = total.innerHTML;

      total.innerHTML = "$" + 0;
    } else {
      total.innerHTML = temp3;
    }
  };
  let temp2 = null;

  trs.querySelector(".small-tab").onclick = function () {
    if (!trs.querySelector(".small-tab").checked) {
      temp2 = trs.querySelector(".price2").innerHTML;
      trs.querySelector(".price2").innerHTML = "$" + 0;
    } else {
      trs.querySelector(".price2").innerHTML = temp2;
    }
    calTotal();

    let flag = true;

    if (!trs.querySelector(".small-tab").checked) {
      flag = false;
    }

    bigCheck.checked = flag;
  };
};
