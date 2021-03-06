# web_project
cse question forum using express generator frame work, node.js, pug

This project is created for education purpose for students to make lessons more engaging, entertaining, or easier
to understand.
In this project initially user will see the questions displayed in the question forum. If he wants to ask a question through this forum he has to login by providing his email address and password to ask his/her question. The question will be visible to everyone. Similarly if the user wants to answer a question in cse question forum, he/she has to login and answer and it will be visible to everyone. This way everyone can clear their doubts without actually meeting in person.

# express generator
Install express generator from this site -> https://expressjs.com/en/starter/generator.html

Or 

follow below steps:

    C:\>npx express-generator
    
    C:\>npm install -g express-generator
    
    C:\>express --view=pug web_project
    
    C:\>cd web_project
    
    C:\web_project>npm install
    
    C:\web_project>set DEBUG=web_project:* np start

### Starting your app in browser:

    C:\>cd web_project
    
    C:\web_project>npm start
  
Then load http://localhost:3000/ in your browser to access the app

# nodemon
nodemon automatically restarts your app whenever you save your files.

Install nodemon:

    C:\>npm install -g nodemon
    
### nodemon usage:
instead of typing:

    C:\web_project>npm start

### just type:

    C:\web_project>nodemon
    
Then load http://localhost:3000/ in your browser to access the app

# Database
MySQL database is used in this project.

You can download the MYSQL database from this link : https://www.mysql.com/downloads

In this project:

    database : sample
  
    user : dev
  
    password : password
    
# MySQL Database configure

### User Accounts table:
    create table useraccounts(email varchar(25) not null, username varchar(20) not null default '', password varchar(20) not null default '', primary key(email));
    
### Questions table:
    create table questions(question_id int(11) not null auto_increment primary key, question varchar(15000) not null, username varchar(20) not null, title varchar(255) not null, qdate datetime not null);
    
### Answers table:
    create table answers(answer_id int(11) not null, answer varchar(15000) not null, username varchar(20) not null, adate datetime not null, foreign key(answer_id) references questions(question_id) on delete cascade on update cascade);

# Various Modules used:
cookie-parser - `npm install cookie-parser` (Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.)

mysql - `npm install mysql`

express-session - `npm install express-session`

body-parser - `npm install body-parser` (Parse incoming request bodies in a middleware before your handlers, available under the req.body property.)

connect-flash - `npm install connect-flash`

The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.

Flash messages are stored in the session. First, setup sessions as usual by enabling cookieParser and session middleware. Then, use flash middleware provided by connect-flash.


# Link to Website:

Hosted/Deployed on Heroku platform

https://cseqstnfrm.herokuapp.com/
