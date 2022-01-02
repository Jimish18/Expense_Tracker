

let expense_title = document.getElementById("title");
let expense_date = document.getElementById("date");
let expense_amount = document.getElementById("amount");

function validate()
{
    if(expense_title.value.length < 2 || expense_date.value.length < 10 || expense_amount.value < 1)
    {
        return false;
    }
    else
    {
        return true;
    }
}


function showList() 
{
    getLocalStorage();

    let uiString = "";
    let tableBody = document.getElementById("tableBody");
    expenseObj.forEach(function(element,index)
    {
        uiString += `<tr class = "expenseArea">
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

    if(validate())
    {
        expenseObj.push(myExpenseObj);
        localStorage.setItem("expenseList",JSON.stringify(expenseObj));
    }
    else
    {
        alert("Enter valid data");
    }
    
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



let searchArea = document.getElementById("searcharea");

searchArea.addEventListener("input",function()
{
    let inputVal = searchArea.value;

    let allExpenseArea = document.getElementsByClassName("expenseArea");
    // console.log(allExpenseArea);
    Array.from(allExpenseArea).forEach(function(element)
    {
        let trTitle = element.getElementsByTagName("td")[0].innerHTML;
        
        if(trTitle.includes(inputVal))
        {
            element.style.display = "grid";
        }
        else
        {
            element.style.display = "none";
        }
    })


})