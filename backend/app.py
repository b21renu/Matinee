from flask import Flask, request, jsonify
from pymongo import MongoClient
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from recommendation_logic import recommend_based_on_movie, recommend_based_on_music, recommend_based_on_book
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['RestFulAPI']

# Fetch datasets
movies = pd.DataFrame(list(db.MOVIES.find()))
music = pd.DataFrame(list(db.MUSIC.find()))
books = pd.DataFrame(list(db.BOOKS.find()))

# Data Cleaning
movies['genres'] = movies['genres'].fillna('')
music['genre'] = music['genre'].fillna('')
books['Genre'] = books['Genre'].fillna('')

# Combine relevant text fields
movies['combined'] = movies['genres'] + ' ' + movies['keywords'] + ' ' + movies['overview']
music['combined'] = music['genre'] + ' ' + music['lyrics']
books['combined'] = books['Genre'] + ' ' + books['Book-Title'] + ' ' + books['Book-Author']

# Ensure no NaN values in the combined columns
movies['combined'] = movies['combined'].fillna('')
music['combined'] = music['combined'].fillna('')
books['combined'] = books['combined'].fillna('')

# Combine all text data for fitting the vectorizer
combined_corpus = pd.concat([movies['combined'], music['combined'], books['combined']])

# Vectorization
tfidf = TfidfVectorizer(stop_words='english')
tfidf.fit(combined_corpus)  # Fit on combined corpus to ensure consistent vocabulary

# Transform individual datasets
movie_matrix = tfidf.transform(movies['combined'])
music_matrix = tfidf.transform(music['combined'])
book_matrix = tfidf.transform(books['combined'])

# Compute cosine similarities
movie_music_sim = cosine_similarity(movie_matrix, music_matrix)
movie_book_sim = cosine_similarity(movie_matrix, book_matrix)
movie_movie_sim = cosine_similarity(movie_matrix, movie_matrix)
music_music_sim = cosine_similarity(music_matrix, music_matrix)
music_book_sim = cosine_similarity(music_matrix, book_matrix)
book_book_sim = cosine_similarity(book_matrix, book_matrix)


from bson import ObjectId

def serialize_recommendations(recommendations):
    serialized_recommendations = []
    for recommendation in recommendations:
        if isinstance(recommendation, dict):
            recommendation['_id'] = str(recommendation['_id'])
        serialized_recommendations.append(recommendation)
    return serialized_recommendations


@app.route('/recommend/<type>', methods=['POST'])
def recommend(type):
    data = request.get_json()
    print(f"Received data: {data}")  # Debug print
    query = data.get('query', '')
    if type == 'movies':
        recommendations = recommend_based_on_movie(query, movies, music, books, movie_music_sim, movie_book_sim, movie_movie_sim, top_n=5)
    elif type == 'music':
        recommendations = recommend_based_on_music(query, movies, music, books, movie_music_sim, music_music_sim, music_book_sim, top_n=5)
    elif type == 'books':
        recommendations = recommend_based_on_book(query, movies, music, books, movie_book_sim, music_book_sim, book_book_sim, top_n=5)
    else:
        return jsonify({"error": "Invalid category"}), 400
    
    movies_rec, music_rec, books_rec = recommendations

    # Check for errors in the recommendations
    if isinstance(movies_rec, dict) and 'error' in movies_rec:
        print(f"Movie Recommendation Error: {movies_rec['error']}")
        return jsonify(movies_rec), 400
    if isinstance(music_rec, dict) and 'error' in music_rec:
        print(f"Music Recommendation Error: {music_rec['error']}")
        return jsonify(music_rec), 400
    if isinstance(books_rec, dict) and 'error' in books_rec:
        print(f"Book Recommendation Error: {books_rec['error']}")
        return jsonify(books_rec), 400
    
    movies_rec = serialize_recommendations(movies_rec)
    music_rec = serialize_recommendations(music_rec)
    books_rec = serialize_recommendations(books_rec)

    return jsonify({
        'movies': movies_rec,
        'music': music_rec,
        'books': books_rec
    })

# @app.route('/recommend/mood', methods=['POST'])
# def recommend_mood():
#     data = request.get_json()
#     mood_data = {
#         'mood': data.get('mood'),
#         'preferences': data.get('preferences', {})
#     }
#     preferences = {genre: int(weight) for genre, weight in mood_data['preferences'].items()}
#     recommendations = recommend_based_on_mood(preferences, movies, music, books, movie_book_sim, music_book_sim, book_book_sim, top_n=5)

#     movies_rec, music_rec, books_rec = recommendations

#     return jsonify({
#         'movies': serialize_recommendations(movies_rec),
#         'music': serialize_recommendations(music_rec),
#         'books': serialize_recommendations(books_rec)
#     })

if __name__ == "__main__":
    app.run(debug=True, port=5000)