import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate

FAISS_INDEX_DIR = "embeddings/"

def load_vector_store(api_key):
    """Load FAISS vector store with financial embeddings."""
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=api_key)
    return FAISS.load_local(FAISS_INDEX_DIR, embeddings, allow_dangerous_deserialization=True)

def create_rag_pipeline(api_key):
    """Initialize LLM and retrieval chain."""
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash-exp", temperature=0.3, google_api_key=api_key)
    
    prompt_template = """
    You are a financial expert. Answer queries based on the given RBI regulations, fraud detection guidelines, and stock trends.
    If the answer is unavailable, say 'Not found in provided financial data.' 
    If the question is finance-related, try to fetch a relevant answer from the web and mention the source.


    Context:\n {context}\n
    Question:\n {question}\n
    Answer:
    """
    
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    return load_qa_chain(model, chain_type="stuff", prompt=prompt)

def query_chatbot(question, api_key):
    """Retrieve documents and answer queries using the RAG model."""
    vector_db = load_vector_store(api_key)
    retrieved_docs = vector_db.similarity_search(question)

    rag_chain = create_rag_pipeline(api_key)
    response = rag_chain({"input_documents": retrieved_docs, "question": question}, return_only_outputs=True)
    
    return response["output_text"]
