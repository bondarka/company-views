#Company views
The repository for the 	creation site about company 	structure.

USED BY: 
------------ 


      HTML5/CSS3           Use flexbox for marking,order from change 
                           position;
      LESS                 mixins, media

TASKS: 
------------ 

1. You need to create a registration form with the following fields:
------------------------------------------------------------------------ 

      name - Name
      secondname - Surname
      email - Email
      gender (values: {male, female}) - Paul (drop down list)
      pass - Password 

Checkbox "is familiar with the terms". All fields are required, initial validation on user side. After passing the validation send
form at url: <link>
In case of successful registration redirect to a page companies


2. Create a company page:
------------------------ 

2.1. When the page loads to get the data companies.
http://link


2.2 When you load the page to receive a list of news.
http://link

While there is a data acquisition unit for display loaders.Once the data is received, the loaders to hide and display 
the data in the right form.
Block «Total Companies»: Displays the total number of companies.

Block «List of Companies»: Displays a list of all companies.
If a lot of companies - there should be a vertical scroll bar to view all companies.
Each element of the list (the company) must be clickable. When you click on a list item you want to select it and display
the active unit «Company partners».

Block «Company partners»: Shows all of the company's partners and their percentage shares.
By default, the partners want to sort descending - from the company with a maximum of interest to companies with a minimum of interest.
Must be able to sort of interest and on behalf of ascending and descending.
If you change companies in the list of partners to remain the last selected sorting.
If the company has many partners the horizontal scroll bar should appear to show all partners.

Block «Companies by Location»: Shows the schedule location companies by country in percentage. For this unit you need to do the calculation of interest on the countries from the resulting list of companies and displayed in a graph.
Clicking on the name of the country to hide the graph and show the list of companies that belong to this country.
When you click on the arrow "back" to return schedule
In order to implement the schedule, you can use any library.

Block «News»: block with news slider. 
Shows news title, picture, short description, author and date of publication (comes in unixtimestamp format).
Headline news must be a reference. If the text in the description is too much then you need to cut it and bring no more than
characters and add an ellipsis at the end. Date of publication output in a format like the following example - 10/30/2016.

3. Make responsive layout. The minimum width of 320px screen
-------------------------------------------------------------
