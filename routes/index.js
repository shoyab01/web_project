var express = require('express');
var router = express.Router();
var sql = require('mysql');
var session = require('express-session');
//var sanitizer = require('sanitizer');
const bodyParser = require('body-parser');



const conn = sql.createConnection({
	host:'localhost',
	user:'dev',
	password:'password',
	database:'sample'	
});





function checkSignIn(req,res,next){
   if(req.session.uname){
      next();
   } else {
   	  req.flash('checkSignInData',req.body);
      res.redirect('/login');
   }
}




function refine(user_string)
{
	pos_Arr=new Array();
	for(var i = 0;i<user_string.length;i++)
	{
		if(user_string[i] === "'" || user_string[i] === '"' || user_string[i] === '\\')
		{
			pos_Arr.push(i);
		}
	}
	for(var i = 0;i<pos_Arr.length;i++)
	{
		pos_Arr[i] += i;
		var user_string = [user_string.slice(0, pos_Arr[i]), "\\", user_string.slice(pos_Arr[i])].join('');
	}
	pos_Arr = [];
	return user_string;
}



router.get('/questionforum/question_info/:qid',function(req,res,next){
	conn.query(`select username,title,question,qdate from questions where question_id = '${req.params.qid}}'`,function(err1,result1){
		if(err1) throw err1;
		if(result1.length === 0)
		{
			res.render('error.pug',{loglog: req.session.uname});
		}
		else
		{
			conn.query(`select answer,username,adate from answers where answer_id = ${req.params.qid}`,function(err2,result2){
			    if(err2) throw err2;
				req.session.anspage = req.params.qid;
				req.session.askpage = undefined;
				req.session.qfpage = undefined;
				var question_infoCombine = req.flash('loginConfirmData');

				if(question_infoCombine.length !== 0)
				{
					var question_infoPostAnswer = question_infoCombine[0].answerbody;
					res.render('question_info', {title:result1[0]["title"],data1: result1, data2:result2,data3:req.params.qid, PostAnswer:question_infoPostAnswer, loglog: req.session.uname});

				}
				else
				{
					res.render('question_info', {title:result1[0]["title"],data1 : result1, data2 : result2, data3 : req.params.qid, loglog: req.session.uname});	
				}					
		    });
	    }	
	});

});


router.post('/questionforum/question_info/postanswer/:aid',checkSignIn,function(req,res,next){
	req.session.askpage = undefined;
	req.session.qfpage = undefined;
	conn.query(`insert into answers(answer_id,answer,username,adate) values(${req.session.anspage},'${refine(req.body.answerbody)}','${refine(req.session.uname)}',now())`,function(err,result){
		if(err) throw err;
		res.redirect("/questionforum/question_info/"+ req.params.aid);
	});
});

/* GET home page. */
router.get('/',function(req, res, next){
	res.render('startbutton',{loglog: req.session.uname});
});



router.get('/questionforum',function(req,res,next){
	req.session.anspage = undefined;
	req.session.askpage = undefined;
	req.session.qfpage = 1;
	conn.query(`select title,question_id from questions`,function(err,result){
		if(err) throw err;
		res.render('questions', {data: result, loglog: req.session.uname, loglog: req.session.uname});
	});
});



router.post('/questionforum/postquestion',checkSignIn,function(req,res,next){
	req.session.askpage = 1;
	req.session.anspage = undefined;
	req.session.qfpage = undefined;
	conn.query(`insert into questions (question,username,title,qdate) values ('${refine(req.body.body)}','${refine(req.session.uname)}','${refine(req.body.title)}',now())`,function(err,result){
		if(err) throw err;
		res.redirect('/questionforum');
	});
});





router.get('/ask', function(req, res, next){
	req.session.anspage = undefined;
	req.session.askpage = 1;
	req.session.qfpage = undefined;
	var askCombine = req.flash('loginConfirmData');
	if(askCombine.length !== 0)
	{
		var askTitle = askCombine[0].title;
		var askBody = askCombine[0].body;
		res.render("ask",{titleAsk:askTitle, bodyAsk:askBody, loglog: req.session.uname});	
	}
	else
	{
		res.render("ask",{loglog: req.session.uname});
	}
});



router.get('/login',function(req, res, next){
	if(req.session.uname)
	{
		res.redirect('/questionforum');
	}
	else
	{
		res.render('login',{loglog: req.session.uname});
	}
});



router.get('/signup', function(req, res, next){
		res.render('signup',{loglog: req.session.uname});
});





router.post('/loginconfirm', function(req, res, next) {
		conn.query(`select email from useraccounts where email='${req.body.email}'`,function(err,result){
		if(err) throw err;
		if(result.length===0)
		{
			res.render('login',{title:'*The email address that you have entered did not match any account in the Database. Please login again with correct credentials.', loglog: req.session.uname});
		}
	
	else
	{
	   
		conn.query(`select password,username from useraccounts where email='${req.body.email}'`,function(err,result){
			if(err) throw err;
			if(result[0]['password']==='')
			{
				res.render('signup',{title:'*You have not yet registered, please fill below details to get registered.', loglog: req.session.uname});
			}
			else
			{
				if(req.body.password===result[0]['password'])
				{
					
					req.session.uname = result[0]["username"];
					if(req.session.uname)
					{
						var temp = req.flash('checkSignInData');
						req.session.cookie.maxAge = 1800000;// 1800000; //half an hour
					    if(req.session.anspage > 0 && req.session.askpage === undefined && req.session.qfpage === undefined)
						{
							if(temp.length === 0)
							{
								res.redirect('/questionforum');
							}
							else
							{
								req.flash('loginConfirmData',temp);
							  	res.redirect("/questionforum/question_info/"+req.session.anspage);
						    }
						}
						else if(req.session.qfpage !== undefined && req.session.anspage === undefined && req.session.askpage === undefined)
						{
							res.redirect('/questionforum');
						}
						else if(req.session.anspage === undefined && req.session.askpage === 1 && req.session.qfpage === undefined)
						{
							if(temp.length === 0)
							{
								res.redirect('/questionforum');
							}
							else
							{
								req.flash('loginConfirmData',temp);
								res.redirect('/ask');
							}
						}
						else
						{
							res.redirect("/questionforum");
						}
					}
					else
					{
						res.redirect('/login');
					}
					
				}
				else
				{
					res.render('login',{title:'*Looks like you have entered wrong password, try again...', loglog: req.session.uname});
				}
			}
		});
	}
});
});


router.post('/enterdata', function(req, res, next) {
	conn.query(`select email from useraccounts where email='${req.body.email}'`,function(err,result){
		if(err) throw err;
		if(result.length===0)
		{
			res.render('signup',{title:'*The email address that you have entered did not match any account in the Database. Please register only CSE students.', loglog: req.session.uname});
		}
		else
		{
		conn.query(`select password from useraccounts where email='${req.body.email}'`,function(err,result){
		if(err) throw err;
		if(result[0]['password']==='')
		{
			conn.query(`select username from useraccounts where username='${req.body.username}'`,function(err,result){
				if(err) throw err;
				if(result.length===0)
				{
					conn.query(`update useraccounts set username='${refine(req.body.username)}',password='${refine(req.body.password)}' where email='${req.body.email}'`,function(err,result){
						if(err) throw err;

						req.session.uname = refine(req.body.username);
						res.render('clicktocontinue',{loglog: req.session.uname});
					});
				}
				else
				{
					res.render('signup',{title:'Username already exists, please choose a different username.', loglog: req.session.uname});
				}
			});
		}
		else
		{
			res.render('login',{title:'User Already Exists! Login or choose another email id.', loglog: req.session.uname});
		}
	});
		}

	});
});


router.get('/clicktocontinue', function(req, res, next){
	if(req.session.uname)
	{
		var temp = req.flash('checkSignInData');
	 	if(req.session.anspage > 0 && req.session.askpage === undefined && req.session.qfpage === undefined)
		{
			if(temp.length === 0)
			{
				res.redirect('/questionforum');
			}
			else
			{
				req.flash('loginConfirmData',temp);
				res.redirect("/questionforum/question_info/"+req.session.anspage);
			}
		}
		else if(req.session.anspage === undefined && req.session.askpage === undefined && req.session.qfpage === undefined)
		{
			res.redirect("/questionforum");
		}
		else if(req.session.askpage !== undefined && req.session.anspage === undefined && req.session.qfpage === undefined)
		{
			if(temp.length === 0)
			{
				res.redirect('/questionforum');
			}
			else
			{
				req.flash('loginConfirmData',temp);
				res.redirect('/ask');
			}
		}
		else
		{
			res.redirect("/questionforum");
		}
	}
	else
	{
		res.render('login',{loglog: req.session.uname});
	}
});


router.get('/logout',(req,res) => {
	if(req.session.uname)
	{
    	req.session.destroy((err) => {
        	if(err) throw err;
        	res.redirect('/');
    });
    }
    else
    {
    	res.redirect('/');
    }
});


module.exports = router;
