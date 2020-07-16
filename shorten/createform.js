function submitError(errortext)
{
    var createformlabel = document.getElementById("createformlabel");
    if(createformlabel)
        createformlabel.style.display = "none";
    document.getElementById("errortext").innerHTML = errortext;
}

function submitForm()
{
    var thisform = document.getElementById("mainform");
    if(thisform.url.value.length<4)
    {
        submitError("Please enter a valid URL to shorten.");
        thisform.url.focus();
        thisform.url.select();
        return(false);
    }

    var protoregex = /^([-A-Za-z0-9]{1,15}:)/;
    var urlregex = /.\../;
    var test = thisform.url.value.search(urlregex);
    var test2 = thisform.url.value.search(protoregex);
    var precheck = 0;

    if(test2==-1&&test==-1)
    {
        submitError("Please enter a valid URL to shorten.");
        thisform.url.focus();
        thisform.url.select();
        return(false);
    }

    if(thisform.shorturl.value.length)
    {
        if(thisform.shorturl.value.length>30||thisform.shorturl.value.length<5)
        {
            submitError("Custom short URLs must be between 5 and 30 characters long.");
            thisform.shorturl.focus();
            thisform.shorturl.select();
            return(false);
        }
        var shorturlregex = /^[a-zA-Z0-9_]+$/;
        test = thisform.shorturl.value.search(shorturlregex);
        if(test==-1)
        {
            submitError("Custom short URLs can only contain alphanumeric characters and underscores.");
            thisform.shorturl.focus();
            thisform.shorturl.select();
            return(false);
        }
        precheck = 1;
    }


    if(precheck)
    {
        var xhr;
        var url = encodeURIComponent(document.mainform.url.value);
        var shorturl = encodeURIComponent(document.mainform.shorturl.value);
        var params="shorturl="+shorturl;
        //var params="url="+url+"&shorturl="+shorturl+"&format=int1";
        if (window.XMLHttpRequest)
        {
            xhr=new XMLHttpRequest();
        }
        else // for older IE 5/6
        {
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if(!xhr)
            return(true);

        xhr.onreadystatechange = function()
        {
            if(xhr.readyState==4)
            {
                if(xhr.status==406)
                {
                    submitError("The shortened URL you selected is already taken. Try something more unusual.");
                    document.getElementById("mainform").shorturl.focus();
                    document.getElementById("mainform").shorturl.select();
                    //document.getElementById("shorturl").focus();
                    return(false);
                }
                if (xhr.status==200)
                {
                    document.getElementById("mainform").submit();
                    return(true);
                }
                else
                {
                    submitError("Sorry, there was an unexpected error or timeout when submitting your request.");
                    return(false);
                }
            }
        };

        xhr.open("POST","checkurl.php",true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(params);
        return(false);
    }
    return(true);
}

function shortURLChanged()
{
    var thisform = document.getElementById("mainform");
    var options = document.getElementById('options');

    if(thisform.shorturl.value.length>0)
        options.style.display = "none";
    else
        options.style.display = "block";
}

function shorturlon() {
    var box;
    var label;
    var label2;
    var label3;
    var options;
    var statsopt;
    box = document.getElementById('shorturlboxcontainer');
    label = document.getElementById('shorturllabel');
    label2 = document.getElementById('shorturllabel2');
    label3 = document.getElementById('shorturllabel3');
    options = document.getElementById('options');
    label.style.display = "none";
    label2.style.display = "block";
    label3.style.display = "none";
    box.style.display = "block";
    options.style.display = "block";
    document.mainform.shorturl.focus();
}
function shorturloff() {
    var box;
    var label;
    var label2;
    var label3;
    var options;
    var statsopt;
    var radiobutton = document.getElementById('r1');
    radiobutton.checked = true;
    box = document.getElementById('shorturlboxcontainer');
    label = document.getElementById('shorturllabel');
    label2 = document.getElementById('shorturllabel2');
    label3 = document.getElementById('shorturllabel3');
    options = document.getElementById('options');
    label.style.display = "block";
    label2.style.display = "none";
    label3.style.display = "none";
    box.style.display = "none";
    options.style.display = "none";
    document.mainform.shorturl.value = "";
}

const generateRandomString = function(length=8){
return Math.random().toString(20).substr(2, length);
}

function setRandomID(){
	var id = generateRandomString();
	var field = document.getElementById('shorturlbox')
	field.value = id;
	console.log(id);
}

function shortenUrl(){
	console.log("shorteneing");
	$.post('https://cutt.ly/api/api.php?key=f6d64db994f9d81e62993113af14695b1c1dc&short=www.google.com&name=maybegoogleornotgoogleidunno)', function(data) {
    console.log(data);       
});
}