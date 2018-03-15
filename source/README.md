# DIYDictionary
This app was a project I wanted to make for a long time. I combined the need I felt for learning how to develop for smartphones and my need for a dictionary app to make it easier to expand my vocabulary. **You can download the ready apk file from https://diyd.herokuapp.com**.

The purpose of the app is to enable people living in a foreign language environment to make use of the countless new words they meet every day. If the user encounters a new word that he wants to remember, he can type in the word and its meaning, then create or a choose a group where he wants to put the word and save it. On the list tab, he can also choose to display individual groups. The data is stored for offline use locally and is also uploaded to a database for back up and to serve the words to anyone through the DIYDictionary API.

The app is a hybrid application based on the Ionic Framework. Hybrid apps have quite a history, but to sum up they act like browser loading data from a local server, but much faster though. Therefore you can develop web apps using popular JS frameworks that will look like native applications. Of course the platform has its limitations, since it cannot handle super complex large applications fast. However, the Facebook app is also built on a similar platform, which shows the enormous potential in hybrid application.

Learning how to work with the framework took some time, but it also has a little bit of story behind it. Until a couple of months ago, I did not know anything about hybrid apps, when in my graphic design class, my other professor from Mashups mentioned Phonegap as a way to develop native looking apps with HTML, JavaScript and CSS. I immediately got interested in the topic and I looked up what it was, but due to the serious time deficiency I’m suffering from, I did not even try to start a project. But then one day I got a ticket to Shanghai for a weekend to attend a hackathon there. Me and my team set as our goals first of all to spread our CVs, then eat good food, explore the city and also lastly to learn something new. I came up with the idea of creating an app using Phonegap. After nearly 12 hours of work, we had a functioning demo that we presented after which unfortunately we had to come back to Abu Dhabi. Following my great experience in China I knew this is what I wanted to do for my Mashups project combined with my idea of creating a dictionary app for my own needs.

I started my project with some research on the different platforms available and I came to the conclusion that Ionic is currently the most stable and mature of all platforms. I learnt developing for Ionic by googling 3 things: “angular js Lynda”, “ionic framework tutorial”, “ionic framework example work flow”. I found three websites that were particularly useful:

- http://ionicframework.com/docs/
- https://blog.nraboy.com/2015/03/create-todo-list-mobile-app-using-ionic-framework/
- http://www.lynda.com/AngularJS-tutorials/Up-Running-AngularJS/154414-2.html

I also designed a logo, a slogan and a splash page for the application to make it a full package. Since finishing the app, I'm a happy user of my own product.

#API documentation
I also built a server backend using CouchDB that stores and serves the data inputed by the users. This section explains how the data is structured and how the API works.

https://diyd.herokuapp.com is an example website that requests data from the API route.
- http://diyd.herokuapp.com/api/all returns all the data stored in the database
- http://diyd.herokuapp.com/api/{IDcode} returns all the data related to the user with the ID code specified in the URL.

The request returns a JSON object, where 
- the ID property is the ID number of the user. It is stored 3 times which is not efficient, but I couldn’t find an easy way to get rid of them.
- The rev property is needed when updating the database, so you shouldn’t worry about that too much.
- The real content is stored in the content property. There is a list of Groups with all the words in it and a property called “langs”, where I store the names of all the groups.

When requesting all data, you receive a list of objects with the data for each individual user.
