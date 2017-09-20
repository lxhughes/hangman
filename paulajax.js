// Paulajax by Paul Hughes
//
// passindata: data to pass to remote url script. Passed in form like:
// var1=1&var2=2
// myid: javascript id to put the return
// url: URL to hit
// optional method: GET if you don't want post, anything else for post
// optional mode: 'append' to append to myid instead of replace
// optional endcode: javascript to execute when the function returns
// example use with php script that echoes, capitalized, whatever it gets 
// in $_POST['var']: an input that will capitalize itself as you type
//
// <script src="paulajax.js"></script>
// <input type=text id="a1" onkeyup="exchange('a1', 'toupper.php', this.value);">



//function exchange(passindata, myid, url, method)
function exchange(myid, url, passindata, method, mode, endcode)
{
if(method!="GET") method="POST";
if(method=="GET") passindata=encodeURI(passindata);

var xmlHttp;
try
  {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
    if(method=="POST") {
      if (xmlHttp.overrideMimeType) {
         	// set type accordingly to anticipated content type
        xmlHttp.overrideMimeType('text/html');
      }
    }

  }
catch (e)
  {
  // Internet Explorer
  try
    {
    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
  catch (e)
    {
    try
      {
      xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    catch (e)
      {
      alert("Your browser does not support AJAX!");
      return false;
      }
    }
  }
  xmlHttp.onreadystatechange=function()
    {
    if(xmlHttp.readyState==4)
      {
      elem=document.getElementById(myid);

      var elemNodeName = elem.nodeName;
      if (elemNodeName == "input" || elemNodeName == "INPUT" || elemNodeName == "select" || elemNodeName == "SELECT" || elemNodeName == "option" || elemNodeName == "OPTION" || elemNodeName == "textarea" || elemNodeName == "TEXTAREA") {
        if(mode=='append') {
          elem.value+=xmlHttp.responseText;
	} else {
          elem.value=xmlHttp.responseText;
        }
      } else {
	if(mode=='append') {
        elem.innerHTML+=xmlHttp.responseText;
	} else {
        elem.innerHTML=xmlHttp.responseText;
	}
      }
      if(endcode) {
        eval(endcode);
      }
    }
  }
  if((passindata.length>0)&&(method=="GET")) {
    url+="?"+passindata;
  }
  xmlHttp.open(method,url,true);
  if((method=="POST")&&(passindata.length>0)) {
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-length", passindata.length);
    xmlHttp.setRequestHeader("Connection", "close");
  }
  xmlHttp.send(passindata);
}

