import spacy
import joblib  # Use joblib instead of dill
import string
from sklearn.feature_extraction.text import TfidfVectorizer

# Load Spacy English model
nlp = spacy.load('en_core_web_sm')

# Dictionary to expand POS tags into full words
POS_DICTIONARY = {
    "ADJ": "adjective",
    "ADP": "adposition",
    "ADV": "adverb",
    "AUX": "auxiliary",
    "CONJ": "conjunction",
    "CCONJ": "coordinating conjunction",
    "DET": "determiner",
    "INTJ": "interjection",
    "NOUN": "noun",
    "NUM": "numeral",
    "PART": "particle",
    "PRON": "pronoun",
    "PROPN": "proper noun",
    "PUNCT": "punctuation",
    "SCONJ": "subordinating conjunction",
    "SYM": "symbol",
    "VERB": "verb",
    "X": "other",
    "SPACE": "space"
}

# Load the pre-trained vectorizer using joblib
VECTORIZER_PATH = r"C:/Users/deeps/web development/Pictures/Screenshots/Desktop/alzihmer project/Alzheimer-Detection/backend/vectorizer.joblib"
try:
    vec = joblib.load(VECTORIZER_PATH)
except FileNotFoundError:
    print(f"Error: The vectorizer file at {VECTORIZER_PATH} was not found.")
    # Handle the error or exit
except Exception as e:
    print(f"Error loading vectorizer: {str(e)}")
    # Handle the error or exit


def tagged_dialogue(dialogue):
    """
    Generate a string of words tagged with their POS labels.
    """
    tagged = [(token.text, token.pos_) for token in nlp(dialogue)]
    tagged_temp = [' '.join(j) for j in tagged]
    return ' '.join(tagged_temp)


def pos_complete(tagged_text):
    """
    Replace POS tags in the text with their corresponding full words from the dictionary.
    """
    for short, full in POS_DICTIONARY.items():
        tagged_text = tagged_text.replace(short, full)
    return tagged_text


def pos_text_complete(text):
    """
    Convert raw text into POS-completed text with expanded tags.
    """
    tagged = tagged_dialogue(text)
    return pos_complete(tagged)


def preprocess_text(text):
    """
    Preprocess text by converting it into a vectorized feature representation.
    """
    # Convert text to tagged and expanded POS format
    pos_text = pos_text_complete(text)
    # Transform the processed text using the loaded vectorizer
    new_text_vec = vec.transform([pos_text])
    return new_text_vec
