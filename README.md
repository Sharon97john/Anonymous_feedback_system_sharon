# Anonymous Feedback System

In today’s increasingly competitive world, it is essential to have a quality education. The quality of a higher education university can be improved through continuous feedback collection and appropriate changes. Considering the university as a whole, student and staff feedback are critical. An internal feedback system is vital for maintaining the standards and overall growth of the institution. Students and staff’s perspectives must be integrated into a regular and ongoing cycle of reporting, analysis, implementation, and feedback to contribute effectively to internal improvement initiatives. Based on a survey, it was pretty clear that 82.5% students did not have a clear idea of whom to approach with suggestions. The survey results give a primary foundation for the motivation behind this project. This project aims to develop a fully-fledged website for anonymous feedback collection across all departments in the university.

## Getting Started

### Dependencies

The system is developed in Reactjs on the frontend and Django on the backend. The code is not deployed yet, so, to run the code the following must be installed. 

### Installing

#### Reactjs
* Downloading the Node.js installation is the first step. You can download the appropriate Node.js for your OS from from https://nodejs.org/en/download/
* Once Node.js is installed, download or clone the folder onto your machine. Go to frontend folder, open terminal and run the following command to install all packages.
  ```
  npm install
  ```
#### Django
* Install django from this link https://docs.djangoproject.com/en/1.8/howto/windows/#:~:text=Django%20can%20be%20installed%20easily,version%20in%20the%20command%20prompt.
* The following command will install the packages according to the configuration file requirements.txt.
 ```
pip install -r requirements.txt
 ```
* Run the server and run the mastertablescripts.py script file. (Follow below commands)
```
py manage.py runserver
```
* Run the below script file. For adding user as admin, give your working email id so that you can see the email sending feature.
```
py mastertablescripts.py
```
### Executing program
Once all the softwares are installed we can move onto executing the program.
Run the frontend by:
```
npm start
````
Run the backend by:
```
py manage.py runserver
```

