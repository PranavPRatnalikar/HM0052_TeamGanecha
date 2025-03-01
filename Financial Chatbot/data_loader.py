import os
import pdfplumber
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS

DATASET_DIR = "dataset/"
FAISS_INDEX_DIR = "embeddings/"

def extract_text_from_pdfs():
    """Extract text from PDFs in the dataset directory."""
    text_data = ""
    for file in os.listdir(DATASET_DIR):
        if file.endswith(".pdf"):
            with pdfplumber.open(os.path.join(DATASET_DIR, file)) as pdf:
                for page in pdf.pages:
                    text_data += page.extract_text() or ""
    return text_data

def create_vector_store(api_key):
    """Convert financial text data into embeddings and store in FAISS."""
    text_data = extract_text_from_pdfs()
    if not text_data:
        print("No valid text extracted.")
        return
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    text_chunks = text_splitter.split_text(text_data)

    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)
    vector_db = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_db.save_local(FAISS_INDEX_DIR)
    print("✅ FAISS vector store created!")

if __name__ == "__main__":
    api_key = input("Enter Google API Key: ")
    create_vector_store(api_key)
