<img width="1080" alt="Screen Shot 2023-07-23 at 2 07 31 PM" src="https://github.com/talhasifkhan/Datafuse/assets/32559143/386e3013-977f-4f34-9f12-e727b1786ec0">

# Datafuse
A web app that searches for articles and presents summaries for the top results. Allows user to search a topic of their choice and receive easily consumable information on that topic.

<a href="https://data-fuse-49830b771641.herokuapp.com/" target="_blank">Try out the app here!</a>
## Introduction
What if I want to read about something but don't want to scour through the entire internet to find the right information? 
<br></br>
<b>Datafuse</b> seeks to solve this problem by making it significantly easier to read about your desired topic from a variety of sources.<br></br>
This application seeks to solve this problem by:
-  asking the user what they want to read about<br>
-  finding the most relevant articles based on the user's query<br>
-  scraping and summarizing the articles<br>

The articles and their summaries are then presented in a user friendly, card layout, which lets you consume these snippets of information easily.<br><br>

Additional search options are also available, such as choosing an amount of results and choosing time frame of results.

## The Goal
<img align="right" width="400" alt="Screen Shot 2023-07-23 at 2 07 31 PM" 
src="https://github.com/talhasifkhan/Datafuse/assets/32559143/2a1023cc-e42a-4152-9516-9dd1d9a3b1f3">
The **goal** is to provide a **breadth** of knowledge, with an option to go in **depth**.

### Why?
The advent of the internet is a blessing in the amount of information that is available, but it can be overwhelming to sort through it all.
Sometimes you don't want to know everything about a topic, you just want the basics. If you decide that you are interested enough to learn more, you can then choose to expand your understanding. 

### How?
Datafuse provides **breadth** by consolidating news information from top ranked sites and providing an excerpt from each article for convenient reading. If the user is interested by the excerpt of the article, they can go in **depth** by clicking the provided link to access the full article. 

<br><br>
## Technologies Used
- Backend: Django, Python
- Frontend: React/Redux, HTML/CSS
- Database/Caching: Redis
- Deployment: Heroku, Docker
- Miscellaneous: OpenAI GPT3.5, Google News Search API, BeautifulSoup 
