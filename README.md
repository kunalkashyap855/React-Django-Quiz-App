# React-Django-Quiz-App
A simple quiz taking web application developed using Next.js (React) and Django. The quiz consists of 6 random trivia questions with 4 options to choose from in each question. After answering all the questions, the user can see their score and review their performance on each question.


## Table of Contents
- [The Problem](#the-problem)
- [The Solution](#the-solution)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Technical Choices](#technical-choices)
  - [Screenshots](#screenshots)
- [Installation](#installation)
- [Further Improvements](#further-improvements)

## The Problem
To develop a quiz-taking system as a full-stack application with the following features:-
- The quiz should have one or more questions fetched from an API.
- Questions should be multiple-choice.
- The user should be able to see how they did at the end.

## The Solution
I have created a full-stack web application using Next.js and Django that lets you take a trivia quiz and tells you how you did, once you submit all your answers. After receiving your score, you can also review the answers and see the correct answers for the questions you got wrong.

### Frontend
The frontend, which is the main focus of this application, is created using **Next.js** => A **React** framework offering Server-Side Rendering. The application consists of just one page, which dynamically acts as the welcome page, the quiz-taking page and the results page. I've tried to keep the design of the application minimal, which I believe is appropriate for a quiz app. The UI might come off as simple, which it is, but at the same time it looks elegant too. I have made use of the `NextUI` library for some of the UI elements used in the app.

The flow of the application is quite straightforward:- The user opens the application and there is only one call-to-action, **Start**, along with the app title and the developer details. After clicking on the CTA, the questions are fetched from the database using an API, which are then displayed on the screen. Each question has 4 options to choose from, and the user can answer the questions in any order and can always change their answer selection. When the user selects an option, it turns blue to indicate the user's selection for that question. Once the user has selected an option for each question, they can simply submit their answers and then see their scores. 
> A user will not be able to submit their answers if they haven't answered all the questions, a situation which is handled in the application.

In the review section after the quiz is scored, the user can see the answers that they selected. For a given question, if the user answered correctly, their selected option is shown in `green`, and if they answered incorrectly, their selected option is shown in `red` and the correct answer is shoen in `green`.

In the code, you will see that there is the main `index.tsx` file in the `pages` directory which contains the main code for the application. Each question is a component in itself, which inturn renders 4 `AnswerOption` components for the 4 choices for that question.

Finally, I chose to calulate/grade the quiz in the frontend itself since we have all the information for each question in the frontend and computing the score in the frontend saves us from making an extra(and unnecessary) HTTP request to the backend.

### Backend
The backend is created using **Django** => The python-based web framework. Although Django follows the Model-View-Template architecture, here we don't really have any templates since the frontend is made using Next.js. So the backend consists of two models => `Question` and `AnswerOption`. 

The `Question` model consists of the following fields:-
- **id** - A primary key
- **text** - The actual question
- **options** - A many-to-many field connected to the `AnswerOption` table consisting of all the answer choices for this particular question.
- **answer** - A Foreign Key connected to the `AnswerOption` table corresponding to the choice which is the correct answer for this question.

The `AnswerOption` model consists of the following fields:-
- **id** - A primary key
- **text** - The actual answer

> For the purpose of this application, I didn't feel there was any other field or model required to achieve the objective.

In the app, only one API is utilised, which is fetching all the questions from the backend when the user starts the quiz. But I created 5 basic APIs that might have been useful for a bigger scale application or if this application consisted of additional features. The APIs perform the following functions:-
1. **Get all questions** - An API to retreive all questions from the database.
2. **Get Details of a Question/Create a New Question** - An API to get all details of a particular question based on the ID. Alternatively, we could have a `POST` request with the `id=0` and all the details to create a new question.
3. **Get Details of a AnswerOption/Create a New Answer Option** - An API to get all details of a particular answer option based on the ID. Alternatively, we could have a `POST` request with the `id=0` and all the details to create a new answer option.
4. **Get all answer options for a question** - This API fetches a list of all the answer options that are linked to a particular question, based on the question ID.
5. **Get the correct answer for a question** - This API returns the correct answer object from the databse for a particular question, based on the question ID.
> Each API returns the response as a JSON object.

I understand that the database is a separate entity from the backend, but I'll include it here since I have used the SQLite database which comes with the Django Framework.

### Technical Choices
My primary reason for using a React frontend and Django backend was to use the same technologies on which Udemy works. Besides, I think these two are anyway good choices for this kind of an application.

Coming to Next.js, I think it provides a number of advantages over Create-React-App. First of all, being a framework, Next.js offers a great developer experience, its extremely easy and quick to create a production-ready frontend application, as we don't have to worry about a lot of other stuff. A big advantage is the Server-Side Rendering part of Next.js, which makes the application super fast as all the computation and creation is done on the server and the complete and ready page is sent to the client.

Coming to Django, I think it is also a good choice for this kind of an application, since its also super fast and highly scalable, so if we want scale this app later, we wouldn't find any limitations in our use of Django. Being a framework, Django is extremely opiniated, which I like for one reason, it makes the code extremely structured and there's a certain flow in which the whole backend process works, this is something that is not achieved in other frameworks like Express, although it has its own advantages.

For the sake of this application and this challenge, I have just gone ahead and used the SQLite database which comes with Django, as I've written above. Although I wouldn't use this if I were making this application for real-world use (It can still be used in the real world, but I hope you get what I'm trying to say here). Instead, I believe PostgreSQL would be an ideal choice of database.

I have hosted the backend and frontend on different servers => `pythonanywhere` and `Vercel`, respectively. I believe Vercel is the best option to host small-scale or standalone Next.js applications since Vercel owns Next.js, they have created a very efficient and developer-friendly way to host your Next.js application in less than 5 minutes, another advantage of using Next. Similarly for Django, I believe PythonAnywhere is a very good option for hosting Django applications in quick and secure way. Since both are on different domains, I had to handle the CORS issues in my Django backend.

Again, in an actual real-world application, I would not choose to host this application in this way. An ideal solution for that, in my opinion, will be to integrate the Django and Next.js application by building the frontend and adding it as a template in the Django application, hence completing the MVT architecture. This way our Django application will only serve the frontend also without having to run a separte server for it. We can then take this comple Django application and host it on servers offered by `AWS` in their `EC2` service. This is something that I have done before and is one of the most ideal way to host your application. I have chosen not to this for this application as I don't feel a robust cloud server, like the ones offered by EC2 is required for this challenge.

### Screenshots
![Welcome Screen](https://i.ibb.co/SRRgB7F/Screenshot-2022-02-21-at-5-20-41-PM.png "Welcome Screen - Quiz App")

![Quiz Start](https://i.ibb.co/nwftPJG/Screenshot-2022-02-21-at-5-21-31-PM.png "Quiz Start")

![Selecting Answer](https://i.ibb.co/yPbJ40d/Screenshot-2022-02-21-at-5-22-05-PM.png "Selecting Answer")

![View Score](https://i.ibb.co/t3GMtH8/Screenshot-2022-02-21-at-5-22-44-PM.png "View Score")

![Review](https://i.ibb.co/jh1nQbj/Screenshot-2022-02-21-at-5-23-06-PM.png "Review")

## Installation
> You should have `Node` and `Python` (v3.9) installed locally to run this application

To run the application locally, please follow the steps below:-

#### Frontend
1. Clone the repository and run `npm install` to install all the required libraries for the Next.js part of the application.
2. Then run `npm run dev` to start the application locally.

### Backend
1. First create a virtual environment using `python -m venv path/to/where/you/want/your/venv`.
2. You can activate the Virtual Environment by running `source path/to/where/you/want/your/venv/bin/activate`.
3. Then inside the cloned repository, run `pip install -r requirements.txt` to install Django and other packages required to run the backend.
4. Before running the application, you'll have to run one more command: `python manage.py migrate`.
5. After migrate, you can run the application using `python manage.py runserver`.
> This particular app will not run directly on following the above instructions, since in the `settings.py` file of the Django project, the *Secret Key* field will be empty since I have not added that in the repository. Please raise an issue and I will provide you with the key to run the application as is.

## Further Improvements
I believe this implmentation thoroughly completes the objective of creating a full-stack quiz-taking system with all the requirements, a clean user-interface, and an efficient backend system. That being said, if I had more time, there are a few more things that would have made this application even better. First and the most important improvement is responsive design. I understand that any good web application should be optimised for all screen sizes, but just for this implementation, I gave priority to other things over responsive design. 

Apart from that, I believe there could be small imporvements, and some added features which will make the User-Experience worthwile. Some of these features that I would have liked to add, given more time, would be a button that clears all the selections made by the user, which might be useful in a quiz with a large number of question. Another important feature could be the ability to give different types of questions, like a multiple-choice question with more than one correct option.

## Author

👤 **Kunal Kashyap**

- Instagram: [@thatwebdevguy](https://www.instagram.com/thatwebdevguy)
- Github: [@kunalkashyap855](https://github.com/kunalkashyap855)
