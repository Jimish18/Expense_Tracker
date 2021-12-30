

let expense_title = document.getElementById("title");
let expense_date = document.getElementById("date");
let expense_amount = document.getElementById("amount");


function showList() 
{
    getLocalStorage();

    let uiString = "";
    let tableBody = document.getElementById("tableBody");
    expenseObj.forEach(function(element,index)
    {
        uiString += `<tr>
                        <td class="title-td">${element.title}</td>
                        <td>${element.date}</td>
                        <td>${element.amount}&#8377;</td>
                        <td><button id="${index}" onclick = "deleteExpense(this.id)">&times;</button></td>
                    </tr>`;

    })
    tableBody.innerHTML = uiString;
}

function clear()
{
    expense_title.value = "";
    expense_amount.value = "";
    expense_date.value = "";

}
function getLocalStorage()
{
    let expenseList = localStorage.getItem("expenseList");

    if (expenseList == null) 
    {
        expenseObj = [];
    }
    else 
    {
        expenseObj = JSON.parse(expenseList);
    }

}

function deleteExpense(index)
{
    getLocalStorage();

    expenseObj.splice(index,1);
    localStorage.setItem("expenseList",JSON.stringify(expenseObj));
    showList();
}


let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click",submitData);

function submitData(e)
{
    getLocalStorage();

    let myExpenseObj = 
    {
        title : expense_title.value,
        date : expense_date.value,
        amount : expense_amount.value
    }

    expenseObj.push(myExpenseObj);
    localStorage.setItem("expenseList",JSON.stringify(expenseObj));
    
    clear();
    showList();

    e.preventDefault();

}

let clearAll = document.getElementById("clearAll");

clearAll.addEventListener("click",function()
{
    let clearResponse = confirm("Are you sure about deleting all data?")

    if(clearResponse)
    {
        localStorage.clear();
        showList();
    }
})

showList();