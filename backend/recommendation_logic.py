import pandas as pd

def recommend_based_on_movie(movie_name, movies, music, books, movie_music_sim, movie_book_sim, movie_movie_sim, top_n=5):
    try:
        movie_idx = movies[movies['original_title'].str.lower() == movie_name.lower()].index[0]
    except IndexError:
        return {"error": f"Movie '{movie_name}' not found in the dataset."}, [], []

    music_scores = movie_music_sim[movie_idx]
    book_scores = movie_book_sim[movie_idx]
    movie_scores = movie_movie_sim[movie_idx]

    movie_scores[movie_idx] = -1

    top_music_indices = music_scores.argsort()[-top_n:][::-1]
    top_book_indices = book_scores.argsort()[-top_n:][::-1]
    top_movie_indices = movie_scores.argsort()[-top_n:][::-1]

    recommended_music = music.iloc[top_music_indices].to_dict(orient='records')
    recommended_books = books.iloc[top_book_indices].to_dict(orient='records')
    recommended_movies = movies.iloc[top_movie_indices].to_dict(orient='records')

    return recommended_movies, recommended_music, recommended_books


def recommend_based_on_music(music_name, movies, music, books, movie_music_sim, music_music_sim, music_book_sim, top_n=5):
    try:
        music_idx = music[music['track_name'].str.lower() == music_name.lower()].index[0]
    except IndexError:
        return [], {"error": f"Music track '{music_name}' not found in the dataset."}, []

    movie_scores = movie_music_sim[:, music_idx]
    top_movie_indices = movie_scores.argsort()[-top_n:][::-1]
    recommended_movies = movies.iloc[top_movie_indices].to_dict(orient='records')

    book_scores = music_book_sim[music_idx]
    top_book_indices = book_scores.argsort()[-top_n:][::-1]
    recommended_books = books.iloc[top_book_indices].to_dict(orient='records')

    music_scores = music_music_sim[music_idx]
    music_scores[music_idx] = -1
    top_music_indices = music_scores.argsort()[-top_n:][::-1]
    recommended_music = music.iloc[top_music_indices].to_dict(orient='records')

    return recommended_movies, recommended_music, recommended_books

def recommend_based_on_book(book_name, movies, music, books, movie_book_sim, music_book_sim, book_book_sim, top_n=5):
    try:
        book_idx = books[books['Book-Title'].str.lower() == book_name.lower()].index[0]
    except IndexError:
        return [], [], {"error": f"Book '{book_name}' not found in the dataset."}

    movie_scores = movie_book_sim[:, book_idx]
    top_movie_indices = movie_scores.argsort()[-top_n:][::-1]
    recommended_movies = movies.iloc[top_movie_indices].to_dict(orient='records')

    music_scores = music_book_sim[book_idx]
    top_music_indices = music_scores.argsort()[-top_n:][::-1]
    recommended_music = music.iloc[top_music_indices].to_dict(orient='records')

    book_scores = book_book_sim[book_idx]
    book_scores[book_idx] = -1
    top_book_indices = book_scores.argsort()[-top_n:][::-1]
    recommended_books = books.iloc[top_book_indices].to_dict(orient='records')

    return recommended_movies, recommended_music, recommended_books

# def recommend_based_on_mood(mood_data, movies, music, books, movie_book_sim, music_book_sim, book_book_sim, top_n=5):
#     print(mood_data)
#     selected_mood = mood_data.get('mood')
#     genre_preferences = mood_data.get('preferences', {})

#     # Filter based on mood
#     if selected_mood:
#         movies = movies[movies['combined'].str.contains(selected_mood, case=False)]
#         music = music[music['combined'].str.contains(selected_mood, case=False)]
#         books = books[books['combined'].str.contains(selected_mood, case=False)]

#     # Apply genre preferences
#     def apply_genre_preferences(data, genre_field):
#         scores = pd.Series(0, index=data.index)
#         for genre, weight in genre_preferences.items():
#             scores += data[genre_field].str.contains(genre, case=False).astype(int) * weight

#         # Normalize scores to ensure fair comparison
#         if scores.sum() != 0:
#             scores = scores / scores.sum()

#         # Select top N recommendations based on the updated scores
#         return data.loc[scores.sort_values(ascending=False).index[:top_n]]

#     recommended_movies = apply_genre_preferences(movies, 'genres')
#     recommended_music = apply_genre_preferences(music, 'genre')
#     recommended_books = apply_genre_preferences(books, 'Genre')

#     # Debugging: Print only the names of the recommendations
#     print("Recommended Movies:", recommended_movies['original_title'].tolist())
#     print("Recommended Music:", recommended_music['track_name'].tolist())
#     print("Recommended Books:", recommended_books['Book-Title'].tolist())

#     return recommended_movies.to_dict(orient='records'), recommended_music.to_dict(orient='records'), recommended_books.to_dict(orient='records')
