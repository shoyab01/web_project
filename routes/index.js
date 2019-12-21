var express = require('express');
var router = express.Router();
var sql = require('mysql');
var session = require('express-session');
var sanitizer = require('sanitizer');
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
	conn.query(`select count(*) from questions`,function(err3,result3){
		if(err3) throw err3;
		if(req.params.qid<=result3[0]['count(*)'] && req.params.qid >=1)
		{
			conn.query(`select username,title,question from questions where question_id = '${req.params.qid}'`,function(err1,result1){
				if(err1) throw err1;
				conn.query(`select answer,username from answers where answer_id = '${req.params.qid}'`,function(err2,result2){
					if(err2) throw err2;
					req.session.anspage = req.params.qid;
					var question_infoCombine = req.flash('loginConfirmData');

					if(question_infoCombine.length !== 0)
					{
						var question_infoPostAnswer = question_infoCombine[0].answerbody;
						res.render('question_info', {title:result1[0]["title"],data1: result1, data2:result2,data3:req.params.qid, PostAnswer:question_infoPostAnswer});

					}
					else
					{
						res.render('question_info', {title:result1[0]["title"],data1 : result1, data2 : result2, data3 : req.params.qid});	
					}					
				});
		
			});
		}
		else
		{
			res.render('error');
		}
	});
});


router.post('/questionforum/question_info/postanswer/:aid',checkSignIn,function(req,res,next){
	conn.query(`insert into answers(answer_id,answer,username) values(${req.params.aid},'${refine(req.body.answerbody)}','${refine(req.session.uname)}')`,function(err,result){
		if(err) throw err;
		res.redirect("/questionforum/question_info/"+ req.params.aid);
	});
});

/* GET home page. */
router.get('/',function(req, res, next){
	res.render('startbutton');
});



router.get('/questionforum',function(req,res,next){
	req.session.anspage = null;
	conn.query(`select username,title,question from questions`,function(err,result){
		if(err) throw err;
		res.render('questions', {data: result});
	});
});



router.post('/questionforum/postquestion',checkSignIn,function(req,res,next){
	conn.query(`insert into questions (question,username,title) values ('${refine(req.body.body)}','${refine(req.session.uname)}','${refine(req.body.title)}')`,function(err,result){
		if(err) throw err;
		res.redirect('/questionforum');
	});
});





router.get('/ask', function(req, res, next){
	req.session.anspage = null;
	var askCombine = req.flash('loginConfirmData');
	if(askCombine.length !== 0)
	{
		var askTitle = askCombine[0].title;
		var askBody = askCombine[0].body;
		res.render("ask",{titleAsk:askTitle, bodyAsk:askBody});	
	}
	else
	{
		res.render("ask");
	}
});



router.get('/login',function(req, res, next){
	if(req.session.uname)
	{
		res.redirect('/questionforum');
	}
	else
	{
		res.render('login');
	}
});



router.get('/signup', function(req, res, next){
		res.render('signup');
});





router.post('/loginconfirm', function(req, res, next) {
		conn.query(`select email from useraccounts where email='${req.body.email}'`,function(err,result){
		if(err) throw err;
		if(result.length===0)
		{
			res.render('login',{title:'*The email address that you have entered did not match any account in the Database.'});
		}
	
	else
	{
	   
		conn.query(`select password,username from useraccounts where email='${req.body.email}'`,function(err,result){
			if(err) throw err;
			if(result[0]['password']==='')
			{
				res.render('signup',{title:'*You have not yet registered, please fill below details to get registered'});
			}
			else
			{
				if(req.body.password===result[0]['password'])
				{
					
					req.session.uname = result[0]["username"];
					if(req.session.uname)
					{
						req.session.cookie.maxAge = 60000;// 1800000; //half an hour

					    if(req.session.anspage !== undefined && req.session.anspage > 0)
						{
							req.flash('loginConfirmData',req.flash('checkSignInData'));
							res.redirect("/questionforum/question_info/"+req.session.anspage);
						}
						else if(req.session.anspage === undefined)
						{
							res.redirect("/questionforum");
						}
						else
						{
							req.flash('loginConfirmData',req.flash('checkSignInData'));
							res.redirect('/ask');
						}
					}
					else
					{
						res.redirect('/login');
					}
					
				}
				else
				{
					res.render('login',{title:'*Looks like you have entered wrong password'});
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
			res.render('signup',{title:'*The email address that you have entered did not match any account in the Database.'});
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
						res.render('clicktocontinue');
					});
				}
				else
				{
					res.render('signup',{title:'Username already exists, please choose a different username'});
				}
			});
		}
		else
		{
			res.render('login',{title:'User Already Exists! Login or choose another email id'});
		}
	});
		}

	});
});


router.get('/clicktocontinue', function(req, res, next){
	if(req.session.anspage !== undefined && req.session.anspage > 0)
	{
		res.redirect("/questionforum/question_info/"+req.session.anspage);
	}
	else if(req.session.anspage === undefined)
	{
		res.redirect("/questionforum");
	}
	else
	{
		res.redirect('/ask');
	}
});


router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/');
    });

});


module.exports = router;
