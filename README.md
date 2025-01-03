# Matinee
Matinee is a web application designed to help users discover personalized movie, music, and book recommendations based on their preferences. It addresses the challenge of finding content that aligns with a user's tastes across different media types, such as movies, books, and music.Matinee simplifies this process by offering intelligent recommendations, saving users time and effort.  

## How it works 
The app has three main components: the backend, frontend, and login system.    

### BACKEND
The backend is built using Flask and MongoDB. It stores a database of movies, books, and music, along with the necessary information like genres, keywords, and overviews. The recommendation system uses TF-IDF (Term Frequency-Inverse Document Frequency) to convert textual data into numerical vectors, enabling the app to calculate cosine similarity between items. It can recommend movies based on their similarity to books or music. The backend processes user queries and returns the top 5 recommended items in the selected category through API endpoints. The app uses a RESTful API to handle communication between the frontend and backend, ensuring smooth data exchange for user queries and recommendations.   

### FRONTEND
The frontend, built with React, provides a seamless user interface. It includes an interactive header where users can select a media category (movies, books, music) and input their interests. The header also includes dynamic features like background image rotation. The About section introduces the app and explains its functionality, while the footer provides contact details and links to social media.   

### LOGIN SYSTEM
The app includes a login system that allows users to register, log in, and set their preferences, including mood and genre preferences (e.g., action, comedy, drama). This personalized data is stored in the backend.
