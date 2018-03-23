function SaveItem() {
    if(Validate())
        {
	var name = document.forms.ReminderForm.date.value;
    var data=[];
    data.push(document.forms.ReminderForm.amount.value);
    data.push(document.forms.ReminderForm.reminder.value);
	localStorage.setItem(name, JSON.stringify(data));
	doShowAll();
}
	
}
function Validate()
{
    var date=document.forms.ReminderForm.date;
    var amount=document.forms.ReminderForm.amount;
    var reminder=document.forms.ReminderForm.reminder;
    if (amount.value=="" || reminder.value=="")
        {
            if (date.value=="2013-01-01"){
                date.style.border="1px solid red";
            }
                amount.style.border="1px solid red";
            reminder.style.border="1px solid red";
            date.style.border="1px solid red";
            return false;
        }
else{
return true;
}
    
}
function ModifyItem() {
    
	var date = document.forms.ReminderForm.date.value;
	document.forms.ReminderForm.amount.value=JSON.parse(localStorage.getItem(date))[0];
     document.forms.ReminderForm.reminder.value= JSON.parse(localStorage.getItem(date))[1];                                                    
	doShowAll();
}

function RemoveItem() {
            var date = document.forms.ReminderForm.date.value;
            document.forms.ReminderForm.reminder.value = localStorage.removeItem(date);
            doShowAll();


}

function ClearAll() {
	localStorage.clear();
	doShowAll();
}

// dynamically draw the table

function doShowAll() {
	if (CheckBrowser()) {
		var key = "";
		var list ="<tr><th>Date</th><th>Amount</th><th><th>Reminder</th></th></tr>\n";
		var i = 0;
		for (i = 0; i <= localStorage.length - 1; i++) {
			key = localStorage.key(i);
            
			list += "<tr><td>" + key + "</td><td><td>" + JSON.parse(localStorage.getItem(key))[0]  + "</td></td>\n<td>"+ JSON.parse(localStorage.getItem(key))[1] + "</td></tr>\n"
					;
		}
		if (list == "<tr><th>Date</th><th>Amount</th><th><th>Reminder</th></th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}
		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot store ListOfDebt as your browser do not support local storage');
	}
}


/*
 * Checking the browser compatibility.
 * 
 * Alternately can use Modernizr scripts- JavaScript library that helps us to
 * detect the browser support for HTML5 and CSS features Example - <script
 * type="text/javascript" src="modernizr.min.js"></script>
 * 
 * if (Modernizr.localstorage) { //use localStorage object to store data } else {
 * alert('Cannot store user preferences as your browser do not support local
 * storage'); }
 */
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
			return false;
	}
}