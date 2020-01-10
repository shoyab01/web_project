var check=function()
{
	if(document.getElementById('new-password').value.length !==0 && document.getElementById('confirmpassword').value.length !== 0)
	{
		if (document.getElementById('uname').value.length > 3 && document.getElementById('uname').value.length <=20) 
		{
			if(document.getElementById('new-password').value === document.getElementById('confirmpassword').value)
			{
        		document.getElementById('submit').disabled = false;
			}
    		else
    		{
        		document.getElementById('submit').disabled = true;
    		}
    	}
	}
    else
    {
    	document.getElementById('submit').disabled = true;
    }
}

var check1=function()
{
	if(document.getElementById('new-password').value.length >=8 && document.getElementById('new-password').value.length<=20)
	{
		document.getElementById('confirmpassword').disabled=false;
	}
	else
	{
		document.getElementById('confirmpassword').disabled=true;	
	}
}

