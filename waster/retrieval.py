from langchain.chains import RetrievalQA

from langchain.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain.llms import Ollama
from langchain_community.llms import HuggingFaceHub

#from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("HUGGINGFACEHUB_API_TOKEN")


embeddings=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = FAISS.load_local(r"F:\projects\wastewise\backend\project\app\waster\faiss_indexxx", embeddings,allow_dangerous_deserialization=True)


#now the retriever

retriever = vectorstore.as_retriever()

# Initialize OpenAI LLM
llm = HuggingFaceHub(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",  # 👈 pick your model
    model_kwargs={"temperature": 0, "max_length": 512},
    huggingfacehub_api_token=api_key   # 👈 same style as your OpenAI example
)
#create the qa chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

# Example query to the QA chain
query = "are you located in Nakuru?"
result = qa_chain({"query": query})
print("Answer:", result['result'])