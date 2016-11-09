# Mike Recommends
Alexa Skill for recommending movies, books, tv shows, games and even bands based on one that you love

Watching a good TV show or movie is great but once it ends your left looking for something else to watch, when searching for some new shows to watch online I came across the TasteKid website which recommends shows based on what the community has also liked. I thought it would be cool to implement TasteKid's API in a skill for Alexa.
Mike Recommends allows you to ask for a suggestion based on something you have loved, it can be a TV show, movie, book, game or even a band.

#Installation
- Create a Lambda function with an Alexa Skills Kit event source [(tutorial here)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/deploying-a-sample-skill-to-aws-lambda#Creating%20the%20Lambda%20Function%20for%20the%20Sample)
- Create a new Alexa Skill with the Lambda ARN (Amazon Resource Name) generated from the step prior [(tutorial here)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/registering-and-managing-alexa-skills-in-the-developer-portal)
- Register on TasteKid and get your own API key.
- Take a copy of Mike Recommends from the github repo.
- Edit the index.js file to include your APP ID and TasteKid API key.
![Edit index.js](http://standupguy.co.uk/api-keys.jpg)
- Zip the alexaSkill.js and index.js files and upload as your Lambda function package and save it.
- Use the included SpeechAssets folder to set up your interaction model.
![Edit index.js](http://standupguy.co.uk/interaction-model.png)
- Once everything is saved that is you set up.

#Example Usage
One shot usage -
> **Alexa, ask Mike Recommends for a movie similar to Equilibrium**

> _How about: The Thirteenth Floor, Constantine or The Island. Which one would you like to know more about?_

> **tell me more about The Island**

> _The Island is a 2005 American science fiction-action film directed by Michael Bay, starring Ewan McGregor and Scarlett Johansson. It was released on July 22, 2005 in the United States, and was nominated for three awards, including the Teen Choice Award..._


#You can also use Mike Recommends in the following way:

> **Alexa, open Mike Recommends**

> _Welcome to Mike recommends, you can ask for a book, show, game, band or movie recommendation based on something you like. for example: suggest a movie similar to Equilibrium._

> **Suggest a band kind of like Glass Animals**

> _How about: The Acid, Sylvan Esso or Jungle. Which one would you like to know more about?_

> **None thanks**

> _OK, Enjoy._


There is a number of different ways you can ask Mike Recommends for a suggestion, take a look at the speechAsset files to find out more.
