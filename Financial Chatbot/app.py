import streamlit as st
from chatbot import query_chatbot

st.set_page_config(page_title="💰 Financial Chatbot", layout="wide")

st.title("💰 Financial AI Assistant")
st.markdown("Ask anything about **finance, RBI regulations, fraud detection, stock trends, and banking**.")

api_key = st.sidebar.text_input("🔑 Enter your Google API Key:", type="password")

question = st.text_input("🔍 Ask a financial question:")

if question and api_key:
    with st.spinner("🔄 Processing..."):
        response = query_chatbot(question, api_key)
        st.success("✅ Answer:")
        st.write(response)
